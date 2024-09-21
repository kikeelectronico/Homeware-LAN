import json
import os
import random
import bcrypt
import redis
import pymongo
import time
from datetime import datetime, timedelta
import dateutil.parser
import subprocess
import paho.mqtt.publish as publish
import os.path
import pickle

from homeGraph import HomeGraph
import hostname
homegraph = HomeGraph()

HOMEWARE_DOMAIN = os.environ.get("HOMEWARE_DOMAIN", "localhost")
HOMEWARE_USER = os.environ.get("HOMEWARE_USER", "admin")
HOMEWARE_PASSWORD = os.environ.get("HOMEWARE_PASSWORD", "admin")

class Data:
	"""Access to Homeware's databases and files."""

	version = 'v2.0.0'

	def __init__(self):		
		self.verbose = False
		self.deep_logging = os.environ.get("DEEP_LOGGING", False) == "True"

		if not os.path.exists("../files"):
				os.mkdir("../files")

		self.redis = redis.Redis(hostname.REDIS_HOST, hostname.REDIS_PORT)
		self.mongo_client = pymongo.MongoClient("mongodb://" + hostname.MONGO_HOST + ":" + str(hostname.MONGO_PORT) + "/")
		self.mongo_db = self.mongo_client["homeware"]

	def setup(self):
		self.redis.set("homeware_version", self.version)
		if not self.redis.get('transfer'):
			print("The database must be created")
			self.log('Warning','The database must be created')
			# Set alert flags
			self.redis.set("alert","clear")
			# Load the database using the template
			file = open("../configuration_templates/template_homeware.json", 'r')
			data = json.load(file)
			file.close()
			self.restoreBackup(data)
			self.log('Warning','Using a template homeware file')
			# Create db reference
			self.mongo_db = self.mongo_client["homeware"]
			# Override settings
			filter = {"_id": "settings"}
			print("HOMEWARE_DOMAIN", HOMEWARE_DOMAIN)
			operation = {"$set": {
				"domain": HOMEWARE_DOMAIN,
				"ddns.hostname": HOMEWARE_DOMAIN
			}}
			result = self.mongo_db["settings"].update_one(filter, operation)
			print("result", result.modified_count)
			# Override user
			print("HOMEWARE_USER", HOMEWARE_USER)
			print("HOMEWARE_PASSWORD", HOMEWARE_PASSWORD)
			filter = {"_id": "admin"}
			operation = {"$set": {
				"username": HOMEWARE_USER,
				"password": str(bcrypt.hashpw(HOMEWARE_PASSWORD.encode('utf-8'), bcrypt.gensalt()))
			}}
			result = self.mongo_db["users"].update_one(filter, operation)
			print("result", result.modified_count)
			# Set the flag
			self.redis.set("transfer", "true")

	def migrateToMongodb(self):
		# Move not real time data to MogoDB
		if not "homeware" in self.mongo_client.list_database_names():
			print("moving data")
			# Create db reference
			self.mongo_db = self.mongo_client["homeware"]
			# Create devices collection
			mongo_devices_col = self.mongo_db["devices"]
			devices = json.loads(self.redis.get('devices'))
			for device in devices:
				device["_id"] = device["id"]
				mongo_devices_col.insert_one(device)
			# Create user collection
			mongo_users_col = self.mongo_db["users"]
			user_data = {
				"_id": self.redis.get("user/username").decode('UTF-8'),
				"username": self.redis.get("user/username").decode('UTF-8'),
				"password": self.redis.get("user/password").decode('UTF-8'),
				"token": self.redis.get("token/front").decode('UTF-8'),
			}
			mongo_users_col.insert_one(user_data)
			# Create oauth2 collection
			mongo_oauth_col = self.mongo_db["oauth"]
			google_data = {
				"_id": "google",
				"agent": "Google",
				"access_token": {
					"timestamp": self.redis.get("token/google/access_token/timestamp").decode('UTF-8'),
					"value": self.redis.get("token/google/access_token/value").decode('UTF-8'),
				},
				"authorization_code": {
					"timestamp": self.redis.get("token/google/authorization_code/timestamp").decode('UTF-8'),
					"value": self.redis.get("token/google/authorization_code/value").decode('UTF-8'),
				},
				"refresh_token": {
					"timestamp": self.redis.get("token/google/refresh_token/timestamp").decode('UTF-8'),
					"value": self.redis.get("token/google/refresh_token/value").decode('UTF-8'),
				}
			}
			mongo_oauth_col.insert_one(google_data)
			# Create apikey collection
			mongo_apikeys_col = self.mongo_db["apikeys"]
			legacy_data = {
				"_id": "legacy",
				"agent": "legacy",
				"apikey": self.redis.get("token/apikey").decode('UTF-8')
			}
			mongo_apikeys_col.insert_one(legacy_data)
			# Create settings collection
			mongo_settings_col = self.mongo_db["settings"]
			settings_data = {
				"_id": "settings",
				"domain": self.redis.get("domain").decode('UTF-8'),
				"ddns": pickle.loads(self.redis.get("ddns")),
				"mqtt": {
					"user": self.redis.get("mqtt/username").decode('UTF-8'),
					"password": self.redis.get("mqtt/password").decode('UTF-8'),
				},
				"sync_google": pickle.loads(self.redis.get("sync_google")),
				"sync_devices": pickle.loads(self.redis.get("sync_devices")),
				"log": pickle.loads(self.redis.get("log")),
				"client_id": self.redis.get("token/google/client_id").decode('UTF-8'),
				"client_secret": self.redis.get("token/google/client_secret").decode('UTF-8'),
			}
			mongo_settings_col.insert_one(settings_data)

# BACKUP

	def getBackup(self):
		user = self.mongo_db["users"].find()[0]
		oauth = self.mongo_db["oauth"].find()[0]
		data = {
			'devices': self.getDevices(),
			'status': self.getStatus(),
			'secure': {
				"domain": self.getSettings()["domain"],
				"user": user["username"],
				"pass": user["password"],
				"token": {
					"front": user["token"],
					"google": {
						"access_token": oauth["access_token"],
						"authorization_code": oauth["authorization_code"],
						"client_id": self.getSettings()["client_id"],
						"client_secret": self.getSettings()["client_secret"],
						"refresh_token": oauth["refresh_token"]
					},
					"apikey": self.mongo_db["apikeys"].find()[0]["apikey"]
				},
				"ddns": self.getSettings()["ddns"],
				"mqtt": self.getSettings()["mqtt"],
				"sync_google": self.getSettings()["sync_google"],
				"sync_devices": self.getSettings()["sync_devices"],
				"log": self.getSettings()["log"],
			}
		}
		return data

	def restoreBackup(self, data):
		# Load the devices
		for device in data['devices']:
			device["_id"] = device["id"]
			filter = {"_id": device["id"]}
			operation = {"$set": device}
			self.mongo_db["devices"].update_one(filter, operation, upsert = True)
		# Load the status
		status = data['status']
		devices = status.keys()
		for device in devices:
			params = status[device].keys()
			for param in params:
				self.redis.set("status/" + device + "/" + param, pickle.dumps(status[device][param]))
		# Load the settings
		settings = {
			"_id": "settings",
			"domain": data['secure']['domain'],
			"ddns": data['secure']['ddns'],
			"mqtt": data['secure']['mqtt'],
			"sync_google": data['secure']['sync_google'],
			"sync_devices": data['secure']['sync_devices'],
			"log": data['secure']['log'],
			"client_id": data['secure']["token"]['google']["client_id"],
			"client_secret": data['secure']["token"]['google']["client_secret"],
		}
		filter = {"_id": "settings"}
		operation = {"$set": settings}
		self.mongo_db["settings"].update_one(filter, operation, upsert = True)
		# Load the apikey
		apikey = {
			"_id": "legacy",
			"agent": "legacy",
			"apikey": data['secure']['token']['apikey'],
		}
		filter = {"_id": "legacy"}
		operation = {"$set": apikey}
		self.mongo_db["apikeys"].update_one(filter, operation, upsert = True)
		# Load the user
		user = {
			"_id": "admin",
			"username": data['secure']['user'],
			"password": data['secure']['pass'],
			"token": data['secure']['token']['front'],
		}
		filter = {"_id": "admin"}
		operation = {"$set": user}
		self.mongo_db["users"].update_one(filter, operation, upsert = True)
		# Load the oauth tokens
		oauth = {
			"_id": "google",
			"agent": "google",
			"access_token": data['secure']['token']['google']["access_token"],
			"authorization_code": data['secure']['token']['google']["authorization_code"],
			"refresh_token": data['secure']['token']['google']["refresh_token"],
		}
		filter = {"_id": "google"}
		operation = {"$set": oauth}
		self.mongo_db["oauth"].update_one(filter, operation, upsert = True)
		# Set empty alive
		self.redis.set("alive", json.dumps({}))

# VERSION

	def getVersion(self):
		return {'version': self.version}

# DEVICES

	def getGlobal(self):
		data = {
			'devices': self.getDevices(),
			'status': self.getStatus(),
		}
		return data

	def getDevices(self, device_id=None):
		if device_id is None:
			return list(self.mongo_db["devices"].find())
		else:
			return self.mongo_db["devices"].find_one({"_id": device_id})

	def updateDevice(self, device, status):
		device_id = device['id']
		filter = {"_id": device_id}
		if self.mongo_db["devices"].count_documents(filter) == 1:
			operation = self.mongo_db["devices"].replace_one(filter, device)
			if operation.modified_count == 1:
				# Update the received params
				params = status.keys()
				for param in params:
					self.redis.set("status/" + device_id + "/" + param, pickle.dumps(status[param]))
				# Delete the not received params
				db_params_keys = self.redis.keys("status/" + device_id + "/*")
				for db_param_key in db_params_keys:
					if db_param_key.decode("utf-8").split("/")[2] not in list(params):
						self.redis.delete(db_param_key)
				# Inform Google Home Graph
				if os.path.exists("../files/google.json") and self.getSyncGoogle():
					homegraph.requestSync(self.redis.get("domain").decode('UTF-8'))
				return True
		return False

	def createDevice(self, device, status):
		device_id = device['id']
		filter = {"_id": device_id}
		if self.mongo_db["devices"].count_documents(filter) == 0:
			device["_id"] = device_id
			operation = self.mongo_db["devices"].insert_one(device)
			if operation.inserted_id == device_id:
				params = status.keys()
				for param in params:
					self.redis.set("status/" + device_id + "/" + param, pickle.dumps(status[param]))
				# Inform Google Home Graph
				if os.path.exists("../files/google.json") and self.getSyncGoogle():
					homegraph.requestSync(self.redis.get("domain").decode('UTF-8'))
				return True
		return False 

	def deleteDevice(self, device_id):
		filter = {"_id": device_id}
		if self.mongo_db["devices"].count_documents(filter) == 1:
			operation = self.mongo_db["devices"].delete_one(filter)
			if operation.deleted_count == 1:
				# Delete status
				params = self.redis.keys('status/' + device_id + '/*')
				for param in params:
					self.redis.delete(param)
				# Inform Google Home Graph
				if os.path.exists("../files/google.json") and self.getSyncGoogle():
					homegraph.requestSync(self.redis.get("domain").decode('UTF-8'))
			return True
		return False

# STATUS

	def getStatus(self, device_id=None):
		if device_id is None:
			devices_keys = self.redis.keys("status/*")
			status = {}
			for param_key_string in devices_keys:
				param_key = param_key_string.decode().split("/")
				if not param_key[1] in status.keys():
					status[param_key[1]] = {}
				status[param_key[1]][param_key[2]] = pickle.loads(self.redis.get(param_key_string))
			return status
		else:
			device_keys = self.redis.keys("status/" + str(device_id) + "/*")
			if len(device_keys) == 0:
				return None
			status = {}
			for param_key_string in device_keys:
				param_key = param_key_string.decode().split("/")
				status[param_key[2]] = pickle.loads(self.redis.get(param_key_string))
			return status

	def updateParamStatus(self, device_id, param, value):
		if len(self.redis.keys('status/' + device_id + '/' + param)) == 1:
			self.redis.set('status/' + device_id + '/' + param,pickle.dumps(value))
			# Create the status json
			params_keys = self.redis.keys('status/' + device_id + '/*')
			status = {}
			for param_key_string in params_keys:
				param_key = param_key_string.decode().split("/")
				status[param_key[2]] = pickle.loads(self.redis.get(param_key_string))
			# Compose the messages
			msgs = [
				{'topic': "device/" + device_id + '/' + param, 'payload': str(value)},
				{'topic': "device/" + device_id, 'payload': json.dumps(status)}
			]
			# Send the messagees
			mqttData = self.getMQTT()
			publish.multiple(msgs, hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})
			
			return True
		else:
			return False

# USER

	def updatePassword(self, password, new_password):
		user_data = self.mongo_db["users"].find()[0]
		ddbb_password_hash = user_data["password"]
		if bcrypt.checkpw(password.encode('utf-8'),ddbb_password_hash[2:-1].encode('utf-8')):
			new_hash = str(bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()))
			# Update password hash
			filter = {"username": user_data["username"]}
			operation = {"$set": {"password": new_hash}}
			result = self.mongo_db["users"].update_one(filter, operation)
			return result.modified_count == 1
		else:
			return False

	def login(self, username, password):
		user_data = self.mongo_db["users"].find()[0]
		ddbb_password_hash = user_data["password"]
		ddbb_username = user_data["username"]
		if username == ddbb_username and bcrypt.checkpw(password.encode('utf-8'),ddbb_password_hash[2:-1].encode('utf-8')):
			# Generate the token
			chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			token = ''
			i = 0
			while i < 40:
				token += random.choice(chars)
				i += 1
			# Saved the new token
			filter = {"username": ddbb_username}
			operation = {"$set": {"token": token}}
			result = self.mongo_db["users"].update_one(filter, operation)
			self.log('Log',username + ' has login')
			return token if result.modified_count == 1 else None	
		else:
			self.log('Alert','Login failed, user: ' + username)
			return None

	def validateUserToken(self, token):
		user_data = self.mongo_db["users"].find()[0]
		ddbb_token = user_data["token"]
		return token == ddbb_token

	def googleSync(self, username, password):
		user_data = self.mongo_db["users"].find()[0]
		ddbb_password_hash = user_data["password"]
		ddbb_username = user_data["username"]
		auth = False
		if username == ddbb_username and bcrypt.checkpw(password.encode('utf-8'),ddbb_password_hash[2:-1].encode('utf-8')):
			url = self.redis.get("responseURL")
			return url.decode('UTF-8') if not url is None else None
		else:
			return None

# APIKEY

	def getAPIKey(self):
		apikey = self.mongo_db["apikeys"].find()[0]["apikey"]
		data = {
			"apikey": apikey
		}

		return data

	def createAPIKey(self):
		# Generate the token
		chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		token = ''
		i = 0
		while i < 40:
			token += random.choice(chars)
			i += 1
		# Save the new token
		filter = {"_id": "legacy"}
		operation = {"$set": {"apikey": token}}
		self.mongo_db["apikeys"].update_one(filter, operation)
		# Prepare the response
		data = {
			"apikey": token
		}
		return data

	def validateAPIKey(self, apikey):
		filter = {"apikey": apikey}
		return self.mongo_db["apikeys"].count_documents(filter) == 1

# OAUTH

	def updateOauthToken(self, agent, type, token, timestamp):
		filter = {"_id": "google"}
		data = {}
		data[type] = {
			"value": token,
			"timestamp": timestamp
		}
		operation = {"$set": data}
		result = self.mongo_db["oauth"].update_one(filter, operation)

		return result.modified_count == 1

	def validateOauthToken(self, type, token):
		filter = {"_id": "google"}
		oauth = self.mongo_db["oauth"].find_one(filter)
		return token == oauth[type]["value"]

	def validateOauthCredentials(self, type, value):
		if not type in ["client_id", "client_secret"]: return False
		return self.mongo_db["settings"].find()[0][type] == value

	def setResponseURL(self, url):
		return self.redis.set("responseURL", url) == True

# SETTINGS

	def getSettings(self):
		return self.mongo_db["settings"].find()[0]

	def updateSettings(self, settings):
		filter = {"_id": "settings"}
		operation = {"$set": settings}
		self.mongo_db["settings"].update_one(filter, operation)

	def getDDNS(self):
		return self.mongo_db["settings"].find()[0]["ddns"]

	def updateDDNSstatus(self, ip, status, code, enabled, last):
		ddns = self.mongo_db["settings"].find()[0]["ddns"]
		ddns['ip'] = ip
		ddns['status'] = status
		ddns['code'] = code
		ddns['enabled'] = enabled
		ddns['last'] = last
		filter = {"_id": "settings"}
		operation = {"$set": {"ddns": ddns}}
		self.mongo_db["settings"].update_one(filter, operation)

	def getMQTT(self):
		return self.mongo_db["settings"].find()[0]["mqtt"]

	def updateSyncGoogle(self, status):
		filter = {"_id": "settings"}
		operation = {"$set": {"sync_google": status}}
		self.mongo_db["settings"].update_one(filter, operation)

	def getSyncDevices(self):
		return self.mongo_db["settings"].find()[0]["sync_devices"]
	
	def getSyncGoogle(self):
		return self.mongo_db["settings"].find()[0]["sync_google"]

	def createServiceAccountKeyFile(self, serviceaccountkey):
		with open("../files/google.json", "w") as file:
			file.write(json.dumps(serviceaccountkey))
		self.log('Info', 'A google auth file has been uploaded')

# SYSTEM

	def getRedisStatus(self):
		status = {}
		try:
			response = self.redis.client_list()
			status =  {
				'enable': True,
				'status': 'Running',
				'title': 'Redis database'
			}
		except redis.ConnectionError:
			status = {
				'enable': True,
				'status': 'Stopped',
				'title': 'Redis database'
			}
		return status

	def getMongoStatus(self):
		status = {}
		try:
			response = self.mongo_client.server_info()
			status =  {
				'enable': True,
				'status': 'Running',
				'title': 'Mongo database'
			}
		except pymongo.errors.ServerSelectionTimeoutErro:
			status = {
				'enable': True,
				'status': 'Stopped',
				'title': 'Mongo database'
			}
		return status

# LOG

	def getLog(self):
		log = list(self.mongo_db["log"].find())
		self.redis.set('alert','clear')
		return log

	def log(self, severity, message):
		agent = "unknown"
		timestamp = time.time()
		register = {
			"_id": str(timestamp) + "_" + agent,
			"agent": agent,
			"severity": severity,
			"message": message,
			"timestamp": timestamp
		}
		self.mongo_db["log"].insert_one(register)

		if (severity == "Alert"):
			self.redis.set('alert','set')

		if (self.verbose):
			print(log_register)

	def deleteLog(self):
		# Get the days to delete
		log = self.mongo_db["settings"].find()[0]["log"]
		days = int(log['days'])

		if not days == 0:
			reference_timestamp = time.time() - (days * 24 * 60 * 60)
			filter = {"timestamp": {"$lt": reference_timestamp}}
			self.mongo_db["log"].delete_many(filter)

	def setVerbose(self, verbose):
		self.verbose = verbose

	def isThereAnAlert(self):
		return {"alert": self.redis.get('alert').decode('UTF-8')}

# ALIVE

	def getAlive(self):
		return json.loads(self.redis.get('alive'))

	def updateAlive(self, core):
		ts = int(time.time())
		alive = {}
		try:
			alive = json.loads(self.redis.get('alive'))
		except:
			alive = {}
		alive[core] = ts
		self.redis.set('alive', json.dumps(alive))