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

class Data:
	"""Access to the Homeware database and files."""
  

	version = 'v2.0.0'
	homewareFile = 'homeware.json'

	def __init__(self):

		self.verbose = False
		self.deep_logging = os.environ.get("DEEP_LOGGING", False) == "True"

		if not os.path.exists("../files"):
				os.mkdir("../files")

		if not os.path.exists("../logs"):
				os.mkdir("../logs")

		self.redis = redis.Redis(hostname.REDIS_HOST, hostname.REDIS_PORT)
		self.mongo_client = pymongo.MongoClient("mongodb://" + hostname.MONGO_HOST + ":" + str(hostname.MONGO_PORT) + "/")
		try:
			self.mongo_db = self.mongo_client["homeware"]
		except:
			self.log('Warning','The Mongo database must be created')

		# ToDo	
		if not self.redis.get('transfer'):
			self.log('Warning','The database must be created')
			if not os.path.exists("../homeware.json"):
				subprocess.run(["cp", "../configuration_templates/template_homeware.json", "../homeware.json"],  stdout=subprocess.PIPE)
				self.log('Warning','Copying the template homeware file')
			# Load the database using the template
			self.load()
			self.log('Warning','Using a template homeware file')
			# Overwrite the settings given by the user
			self.redis.set("domain", os.environ.get("HOMEWARE_DOMAIN", "localhost"))
			ddns = pickle.loads(self.redis.get("ddns"))
			ddns['hostname'] = os.environ.get("HOMEWARE_DOMAIN", "localhost")
			self.redis.set("ddns", pickle.dumps(ddns))
			self.redis.set("user/username", os.environ.get("HOMEWARE_USER", "admin"))
			self.redis.set("user/password", str(bcrypt.hashpw(os.environ.get("HOMEWARE_PASSWORD", "admin").encode('utf-8'), bcrypt.gensalt())))
			# Set the flag
			self.redis.set("transfer", "true")

		if self.redis.get("alert") == None:
			self.redis.set("alert","clear")

		# Move not real time data to MogoDB
		# Begin
		if not "homeware" in self.mongo_client.list_database_names():
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
		# End

	def getVersion(self):
		return {'version': self.version}

	# ToDo
	def createFile(self,file):
		data = {
			'devices': json.loads(self.redis.get('devices')),
			'status': self.getStatus(),
			'secure': {
				"domain": self.redis.get("domain").decode('UTF-8'),
				"user": self.redis.get("user/username").decode('UTF-8'),
				"pass": self.redis.get("user/password").decode('UTF-8'),
				"token": {
					"front": self.redis.get("token/front").decode('UTF-8'),
					"google": {
						"access_token": {
							"timestamp": self.redis.get("token/google/access_token/timestamp").decode('UTF-8'),
							"value": self.redis.get("token/google/access_token/value").decode('UTF-8'),
						},
						"authorization_code": {
							"timestamp": self.redis.get("token/google/authorization_code/timestamp").decode('UTF-8'),
							"value": self.redis.get("token/google/authorization_code/value").decode('UTF-8'),
						},
						"client_id": self.redis.get("token/google/client_id").decode('UTF-8'),
						"client_secret": self.redis.get("token/google/client_secret").decode('UTF-8'),
						"refresh_token": {
							"timestamp": self.redis.get("token/google/refresh_token/timestamp").decode('UTF-8'),
							"value": self.redis.get("token/google/refresh_token/value").decode('UTF-8'),
						}
					},
					"apikey": self.redis.get("token/apikey").decode('UTF-8')
				},
				"ddns": pickle.loads(self.redis.get("ddns")),
				"mqtt": {
					"user": self.redis.get("mqtt/username").decode('UTF-8'),
					"password": self.redis.get("mqtt/password").decode('UTF-8'),
				},
				"sync_google": pickle.loads(self.redis.get("sync_google")),
				"sync_devices": pickle.loads(self.redis.get("sync_devices")),
				"log": pickle.loads(self.redis.get("log")),
			}
		}
		file = open('../' + self.homewareFile, 'w')
		file.write(json.dumps(data))
		file.close()

	# ToDo
	def getBackup(self):
		data = {
			'devices': json.loads(self.redis.get('devices')),
			'status': self.getStatus(),
			'secure': {
				"domain": self.redis.get("domain").decode('UTF-8'),
				"user": self.redis.get("user/username").decode('UTF-8'),
				"pass": self.redis.get("user/password").decode('UTF-8'),
				"token": {
					"front": self.redis.get("token/front").decode('UTF-8'),
					"google": {
						"access_token": {
							"timestamp": self.redis.get("token/google/access_token/timestamp").decode('UTF-8'),
							"value": self.redis.get("token/google/access_token/value").decode('UTF-8'),
						},
						"authorization_code": {
							"timestamp": self.redis.get("token/google/authorization_code/timestamp").decode('UTF-8'),
							"value": self.redis.get("token/google/authorization_code/value").decode('UTF-8'),
						},
						"client_id": self.redis.get("token/google/client_id").decode('UTF-8'),
						"client_secret": self.redis.get("token/google/client_secret").decode('UTF-8'),
						"refresh_token": {
							"timestamp": self.redis.get("token/google/refresh_token/timestamp").decode('UTF-8'),
							"value": self.redis.get("token/google/refresh_token/value").decode('UTF-8'),
						}
					},
					"apikey": self.redis.get("token/apikey").decode('UTF-8')
				},
				"ddns": pickle.loads(self.redis.get("ddns")),
				"mqtt": {
					"user": self.redis.get("mqtt/username").decode('UTF-8'),
					"password": self.redis.get("mqtt/password").decode('UTF-8'),
				},
				"sync_google": pickle.loads(self.redis.get("sync_google")),
				"sync_devices": pickle.loads(self.redis.get("sync_devices")),
				"log": pickle.loads(self.redis.get("log")),
			}
		}
		return data

	# ToDo
	def load(self):
		file = open('../' + self.homewareFile, 'r')
		data = json.load(file)
		file.close()
		# Save the jsons
		self.redis.set('devices',json.dumps(data['devices']))
		# Load the status in the database
		status = data['status']
		devices = status.keys()
		for device in devices:
			params = status[device].keys()
			for param in params:
				self.redis.set("status/" + device + "/" + param, pickle.dumps(status[device][param]))
		# Load tokens
		token = data['secure']['token']
		self.redis.set("token/front", token['front'])
		self.redis.set("token/apikey", token['apikey'])
		self.redis.set("token/google/client_id", token['google']['client_id'])
		self.redis.set("token/google/client_secret", token['google']['client_secret'])
		self.redis.set("token/google/access_token/value", token['google']['access_token']['value'])
		self.redis.set("token/google/access_token/timestamp", token['google']['access_token']['timestamp'])
		self.redis.set("token/google/refresh_token/value", token['google']['refresh_token']['value'])
		self.redis.set("token/google/refresh_token/timestamp", token['google']['refresh_token']['timestamp'])
		self.redis.set("token/google/authorization_code/value", token['google']['authorization_code']['value'])
		self.redis.set("token/google/authorization_code/timestamp", token['google']['authorization_code']['timestamp'])
		# Load MQTT credentials
		mqtt = data['secure']['mqtt']
		self.redis.set("mqtt/username", mqtt['user'])
		self.redis.set("mqtt/password", mqtt['password'])
		# Load Admin user credentials
		secure = data['secure']
		self.redis.set("user/username", secure['user'])
		self.redis.set("user/password", secure['pass'])
		# Load generla config
		self.redis.set("domain", secure['domain'])
		self.redis.set("ddns", pickle.dumps(secure['ddns']))
		try:
			self.redis.set("log", pickle.dumps(secure['log']))
		except:
			log = {
				"days": 30
			}
			self.redis.set("log", pickle.dumps(log))
		
		self.redis.set("sync_google", pickle.dumps(secure['sync_google']))
		self.redis.set("sync_devices", pickle.dumps(secure['sync_devices']))

		# Temp flags
		self.redis.set("fast_status", "true")
		self.redis.set("fast_token", "true")
		self.redis.set("fast_mqtt_b", "true")
		self.redis.set("fast_user", "true")


# DEVICES

	def getGlobal(self):
		data = {
			'devices': self.getDevices(),
			'status': self.getStatus(),
		}
		return data

	def getDevices(self):
		return list(self.mongo_db["devices"].find())

	def updateDevice(self, incommingData):
		deviceID = incommingData['device']['id']
		filter = {"_id": deviceID}
		if self.mongo_db["devices"].count_documents(filter) == 1:
			operation = self.mongo_db["devices"].replace_one(filter, incommingData["device"])
			if operation.modified_count == 1:
				# Update the received params
				status = incommingData['status']
				params = status.keys()
				for param in params:
					self.redis.set("status/" + deviceID + "/" + param, pickle.dumps(status[param]))
				# Delete the not received params
				db_params_keys = self.redis.keys("status/" + deviceID + "/*")
				for db_param_key in db_params_keys:
					if db_param_key.decode("utf-8").split("/")[2] not in list(params):
						self.redis.delete(db_param_key)
				# Inform Google Home Graph
				if os.path.exists("../files/google.json") and pickle.loads(self.redis.get("sync_google")):
					homegraph.requestSync(self.redis.get("domain").decode('UTF-8'))
				return True
		return False

	def createDevice(self, incommingData):
		deviceID = incommingData['device']['id']
		filter = {"_id": deviceID}
		if self.mongo_db["devices"].count_documents(filter) == 0:
			device = incommingData["device"]
			device["_id"] = deviceID
			self.mongo_db["devices"].insert_one(incommingData['device'])

			status = incommingData['status']
			params = status.keys()
			for param in params:
				self.redis.set("status/" + deviceID + "/" + param, pickle.dumps(status[param]))
			# Inform Google Home Graph
			if os.path.exists("../files/google.json") and pickle.loads(self.redis.get("sync_google")):
				homegraph.requestSync(self.redis.get("domain").decode('UTF-8'))

	def deleteDevice(self, deviceID):
		filter = {"_id": deviceID}
		if self.mongo_db["devices"].count_documents(filter) == 1:
			operation = self.mongo_db["devices"].delete_one(filter)
			if operation.deleted_count == 1:
				# Delete status
				params = self.redis.keys('status/' + deviceID + '/*')
				for param in params:
					self.redis.delete(param)
				# Inform Google Home Graph
				if os.path.exists("../files/google.json") and pickle.loads(self.redis.get("sync_google")):
					homegraph.requestSync(self.redis.get("domain").decode('UTF-8'))
			return True
		return False

# STATUS

	def getStatus(self, id=None):
		if id is None:
			devices_keys = self.redis.keys("status/*")
			status = {}
			for param_key_string in devices_keys:
				param_key = param_key_string.decode().split("/")
				if not param_key[1] in status.keys():
					status[param_key[1]] = {}
				status[param_key[1]][param_key[2]] = pickle.loads(self.redis.get(param_key_string))
			return status
		else:
			device_keys = self.redis.keys("status/" + str(id) + "/*")
			if len(device_keys) == 0:
				return None
			status = {}
			for param_key_string in device_keys:
				param_key = param_key_string.decode().split("/")
				status[param_key[2]] = pickle.loads(self.redis.get(param_key_string))
			return status

	def updateParamStatus(self, device, param, value):
		if len(self.redis.keys('status/' + device + '/' + param)) == 1:
			self.redis.set('status/' + device + '/' + param,pickle.dumps(value))
			# Create the status json
			params_keys = self.redis.keys('status/' + device + '/*')
			status = {}
			for param_key_string in params_keys:
				param_key = param_key_string.decode().split("/")
				status[param_key[2]] = pickle.loads(self.redis.get(param_key_string))
			# Compose the messages
			msgs = [
				{'topic': "device/" + device + '/' + param, 'payload': str(value)},
				{'topic': "device/" + device, 'payload': json.dumps(status)}
			]
			# Send the messagees
			mqttData = self.getMQTT()
			publish.multiple(msgs, hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})

			# Inform Google HomeGraph
			if os.path.exists("../files/google.json") and pickle.loads(self.redis.get("sync_google")):
				states = {}
				states[device] = {}
				states[device][param] = value
				try:
					homegraph.reportState(self.redis.get("domain").decode('UTF-8'),states)
				except:
					self.log("Warning", "Unable to communicate with homegraph")

			return True
		else:
			return False

# USER

	def updatePassword(self, incommingData):
		password = incommingData['pass']
		user_data = self.mongo_db["users"].find()[0]
		ddbb_password_hash = user_data["password"]
		if bcrypt.checkpw(password.encode('utf-8'),ddbb_password_hash[2:-1].encode('utf-8')):
			new_hash = str(bcrypt.hashpw(incommingData['new_pass'].encode('utf-8'), bcrypt.gensalt()))
			# Update password hash
			filter = {"username": user_data["username"]}
			operation = {"$set": {"password": new_hash}}
			self.mongo_db["users"].update_one(filter, operation)
			return { "message": "Updated" }
		else:
			return { "message": "Fail, the password hasn't been changed" }

	def login(self, headers):
		username = headers['user']
		password = headers['pass']
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
			self.mongo_db["users"].update_one(filter, operation)
			# Prepare the response
			responseData = {
				'status': 'in',
				'user': username,
				'token': token
			}
			self.log('Log',username + ' has login')
			return responseData	
		else:
			# Prepare the response
			responseData = {
				'status': 'fail'
			}
			self.log('Alert','Login failed, user: ' + username)
			return responseData

	def validateUserToken(self, headers):
		username = headers['user']
		token = headers['token']
		user_data = self.mongo_db["users"].find()[0]
		ddbb_token = user_data["token"]
		ddbb_username = user_data["username"]
		responseData = {}
		if username == ddbb_username and token == ddbb_token:
			responseData = {
				'status': 'in'
			}
		else:
			responseData = {
				'status': 'fail'
			}

		return responseData

	def googleSync(self, headers, responseURL):
		username = headers['user']
		password = headers['pass']
		user_data = self.mongo_db["users"].find()[0]
		ddbb_password_hash = user_data["password"]
		ddbb_username = user_data["username"]
		auth = False
		if username == ddbb_username and bcrypt.checkpw(password.encode('utf-8'),ddbb_password_hash[2:-1].encode('utf-8')):
			return responseURL
		else:
			return "fail"


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

## ToDo
## - Validate apikey

# RETURN A TOKEN

	def getToken(self,agent="",type="",subtype=""):
		if agent == 'front':
			user_data = self.mongo_db["users"].find()[0]
			return user_data["token"]
		elif agent == 'apikey':
			return self.mongo_db["apikeys"].find()[0]["apikey"]
		elif type == 'client_id':
			return self.mongo_db["oauth"].find()[0]["client_id"]
		elif type == 'client_secret':
			return self.mongo_db["oauth"].find()[0]["client_secret"]
		else:
			return self.mongo_db["oauth"].find()[0][type][subtype]
			# return self.redis.get("token/" + agent + "/" + type + "/" + subtype).decode('UTF-8')

	def updateToken(self,agent,type,value,timestamp):
		filter = {"_id": "google"}
		data = {}
		data[type] = {
			"value": value,
			"timestamp": timestamp
		}
		operation = {"$set": data}
		self.mongo_db["oauth"].update_one(filter, operation)
		# self.redis.set("token/" + agent + "/" + type + "/value",value)
		# self.redis.set("token/" + agent + "/" + type + "/timestamp",timestamp)

# OAUTH

## ToDo
## - Validate authorization code
## - Validate refresh token
## - Validate access token
## - Update oauth token by agent and type

# SETTINGS

	def getSettings(self):
		return self.mongo_db["settings"].find()[0]

	def updateSettings(self, incommingData):
		filter = {"_id": "settings"}
		operation = {"$set": incommingData}
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

	def updateSyncGoogle(self,status):
		filter = {"_id": "settings"}
		operation = {"$set": {"sync_google": status}}
		self.mongo_db["settings"].update_one(filter, operation)

	def getSyncDevices(self):
		return self.mongo_db["settings"].find()[0]["sync_devices"]

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

# LOG

	def getLog(self):
		log = []
		log_file = open('../logs/' + "homeware.log","r")
		registers = log_file.readlines()
		for register in registers:
			try:
				content = register.split(' - ')
				log.append({
					"severity": content[0],
					"time": content[1],
					"message": content[2]
				})
			except:
				log.append({
					"severity": 'Log',
					"time": '',
					"message": content
				})
		log_file.close()
		self.redis.set('alert','clear')

		return log

	def log(self, severity, message):
		log_file = open('../logs/' + "homeware.log", "a")
		date_time = str(datetime.today())
		log_register = severity + ' - ' + date_time  + ' - ' + message + '\n';
		log_file.write(log_register)
		log_file.close()
		if (severity == "Alert"):
			self.redis.set('alert','set')

		if (self.verbose):
			print(log_register)

	def deleteLog(self):
		new_log = []
		# Get the days to delete
		log = self.mongo_db["settings"].find()[0]["log"]
		days = int(log['days'])

		if not days == 0:
			# Load the log file
			log_file = open("../logs/homeware.log","r")
			registers = log_file.readlines()
			log_file.close()
			# Process the registers
			n_days_ago = datetime.today() - timedelta(days)
			for register in registers:
				try:
					timestamp = register.split(' - ')[1]
					timestamp_date = dateutil.parser.parse(timestamp)
					if timestamp_date > n_days_ago:
						new_log.append(register)
					
				except:
					date_time = str(datetime.today())
					log_register = 'Log - ' + date_time  + ' - Unable to process a registry from the log file\n';
					new_log.append(log_register)

			# Write the new file in disk
			log_file = open("../logs/homeware.log","w")
			for register in new_log:
				log_file.write(register)
			log_file.close()

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