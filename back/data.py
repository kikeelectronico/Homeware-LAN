import json
import os
import random
import bcrypt
import redis
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
  

	version = 'v1.7'
	homewareFile = 'homeware.json'
	apikey = ''
	userToken = ''
	userName = ''
	domain = ''
	sync_google = False
	sync_devices = False


	def __init__(self):
		print("test here")
		self.redis = redis.Redis(hostname.REDIS_HOST, hostname.REDIS_PORT)
		self.verbose = False

		# if not self.redis.get('transfer'):
		# 	self.log('Warning','The database must be created')
		# 	try:
		# 		self.load()
		# 		self.log('Warning','Using a provided homeware file')
		# 	except:
		# 		subprocess.run(["cp", "../configuration_templates/template_homeware.json", "../homeware.json"],  stdout=subprocess.PIPE)
		# 		self.load()
		# 		self.log('Warning','Copying the template homeware file')
		# 		self.log('Warning','Using a template homeware file')
		# 	finally:
		# 		secure = json.loads(self.redis.get('secure'))
		# 		secure['domain'] = os.environ.get("HOMEWARE_DOMAIN", "localhost")
		# 		secure['ddns']['hostname'] = os.environ.get("HOMEWARE_DOMAIN", "localhost")
		# 		secure['user'] = os.environ.get("HOMEWARE_USER", "admin")
		# 		secure['pass'] = str(bcrypt.hashpw(os.environ.get("HOMEWARE_PASSWORD", "admin").encode('utf-8'), bcrypt.gensalt()))
		# 		self.redis.set('secure',json.dumps(secure))
		# 		self.redis.set("fast_status", "true")

		# 	self.redis.set("transfer", "true");

		# if self.redis.get("tasks") == None:
		# 	self.redis.set("tasks","[]")

		# if self.redis.get("alert") == None:
		# 	self.redis.set("alert","clear")

		# secure = json.loads(self.redis.get('secure'))
		# try:
		# 	self.sync_google = secure['sync_google']
		# except:
		# 	secure['sync_google'] = False
		# 	self.sync_google = False
		# 	self.redis.set('secure',json.dumps(secure))
		# try:
		# 	self.sync_devices = secure['sync_devices']
		# except:
		# 	secure['sync_devices'] = False
		# 	self.sync_devices = False
		# 	self.redis.set('secure',json.dumps(secure))
		# try:
		# 	self.sync_devices = secure['log']
		# except:
		# 	secure['log'] = {}
		# 	secure['log']['days'] = 30
		# 	self.redis.set('secure',json.dumps(secure))

		# if not os.path.exists("../files"):
		# 		os.mkdir("../files")

		# if not os.path.exists("../logs"):
		# 		os.mkdir("../logs")

		# if self.redis.get("fast_status") == None:
		# 	status = json.loads(self.redis.get('status'))
		# 	devices = status.keys()
		# 	for device in devices:
		# 		params = status[device].keys()
		# 		for param in params:
		# 			self.redis.set("status/" + device + "/" + param, pickle.dumps(status[device][param]))
		# 	self.redis.set("fast_status", "true")

		# # Load some data into memory
		# self.userName = secure['user']
		# self.userToken = secure['token']['front']
		# self.apikey = secure['token']['apikey']
		# self.domain = secure['domain']


	def getVersion(self):
		return {'version': self.version}

	def getGlobal(self):
		data = {
			'devices': json.loads(self.redis.get('devices')),
			'status':self.getStatus(),
			'tasks': json.loads(self.redis.get('tasks'))
		}
		return data

	def createFile(self,file):
		data = {
			'devices': json.loads(self.redis.get('devices')),
			'status': self.getStatus(),
			'tasks': json.loads(self.redis.get('tasks')),
			'secure': json.loads(self.redis.get('secure'))
		}
		file = open('../' + self.homewareFile, 'w')
		file.write(json.dumps(data))
		file.close()

	def load(self):
		with open('../' + self.homewareFile, 'r') as f:
			data = json.load(f)
			self.redis.set('devices',json.dumps(data['devices']))
			self.redis.set('tasks',json.dumps(data['tasks']))
			self.redis.set('secure',json.dumps(data['secure']))

			status = data['status']
			devices = status.keys()
			for device in devices:
				params = status[device].keys()
				for param in params:
					self.redis.set("status/" + device + "/" + param, pickle.dumps(status[device][param]))

# DEVICES

	def getDevices(self):
		return json.loads(self.redis.get('devices'))

	def updateDevice(self, incommingData):
		deviceID = incommingData['device']['id']
		temp_devices = []
		found = False
		for device in json.loads(self.redis.get('devices')):
			if device['id'] == deviceID:
				temp_devices.append(incommingData['device'])
				found = True
				status = incommingData['status']
				params = status.keys()
				for param in params:
					self.redis.set("status/" + deviceID + "/" + param, pickle.dumps(status[param]))
			else:
				temp_devices.append(device)
		self.redis.set('devices',json.dumps(temp_devices))
		# Inform Google Home Graph
		if os.path.exists("../files/google.json") and self.sync_google:
			homegraph.requestSync(self.domain)

		return found

	def createDevice(self, incommingData):
		deviceID = incommingData['device']['id']

		devices = json.loads(self.redis.get('devices'))
		devices.append(incommingData['device'])
		self.redis.set('devices',json.dumps(devices))

		status = incommingData['status']
		params = status.keys()
		for param in params:
			self.redis.set("status/" + deviceID + "/" + param, pickle.dumps(status[param]))

		# Inform Google Home Graph
		if os.path.exists("../files/google.json") and self.sync_google:
			homegraph.requestSync(self.domain)

	def deleteDevice(self, value):
		temp_devices = []
		found = False
		for device in json.loads(self.redis.get('devices')):
			if device['id'] != value:
				temp_devices.append(device)
			else:
				found = True
		self.redis.set('devices',json.dumps(temp_devices))
		# Delete status
		if found:
			params = self.redis.keys('status/' + value + '/*')
			for param in params:
				self.redis.delete(param)

		# Inform Google Home Graph
		if os.path.exists("../files/google.json") and self.sync_google:
			homegraph.requestSync(self.domain)

		return found

# STATUS

	def getStatus(self):
		devices_keys = self.redis.keys("status/*")
		status = {}
		for param_key_string in devices_keys:
			param_key = param_key_string.decode().split("/")
			if not param_key[1] in status.keys():
				status[param_key[1]] = {}
			status[param_key[1]][param_key[2]] = pickle.loads(self.redis.get(param_key_string))
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
			# Try to get username and password
			try:
				mqttData = self.getMQTT()
				if not mqttData['user'] == "":
					publish.multiple(msgs, hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})
				else:
					publish.multiple(msgs, hostname=hostname.MQTT_HOST)

			except:
				publish.multiple(msgs, hostname=hostname.MQTT_HOST)

			# Inform Google HomeGraph
			if os.path.exists("../files/google.json") and self.sync_google:
				states = {}
				states[device] = {}
				states[device][param] = value
				homegraph.reportState(self.domain,states)

			return True
		else:
			return False


# TASKS

	def getTasks(self):
		return json.loads(self.redis.get('tasks'))

	def getTask(self, i):
		return json.loads(self.redis.get('tasks'))[i]

	def updateTask(self, incommingData):
		tasks = json.loads(self.redis.get('tasks'))
		if int(incommingData['id']) < len(tasks):
			tasks[int(incommingData['id'])] = incommingData['task']
			self.redis.set('tasks',json.dumps(tasks))
			return True
		else:
			return False

	def createTask(self, task):
		tasks = json.loads(self.redis.get('tasks'))
		tasks.append(task)
		self.redis.set('tasks',json.dumps(tasks))

	def deleteTask(self, i):
		tasks = json.loads(self.redis.get('tasks'))
		if i < len(tasks):
			del tasks[int(i)]
			self.redis.set('tasks', json.dumps(tasks))
			return True
		else:
			return False

# USER

	def updatePassword(self, incommingData):
		secure = json.loads(self.redis.get('secure'))
		password = incommingData['pass']
		if bcrypt.checkpw(password.encode('utf-8'),secure['pass'][2:-1].encode('utf-8')):
			secure['pass'] = str(bcrypt.hashpw(incommingData['new_pass'].encode('utf-8'), bcrypt.gensalt()))
			self.redis.set('secure',json.dumps(secure))
			return "Updated"
		else:
			return "Fail, the password hasn't been changed"


	def login(self, headers):
		user = headers['user']
		password = headers['pass']
		secure = json.loads(self.redis.get('secure'))
		auth = False
		if 'key' in secure.keys():
			key = secure['key']
			cipher_suite = Fernet(str.encode(secure['key'][2:len(secure['key'])]))
			plain_text = cipher_suite.decrypt(str.encode(secure['pass'][2:len(secure['pass'])]))
			if user == secure['user'] and plain_text == str.encode(password):
				hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
				secure['pass'] = str(hashed)
				del secure['key']
				auth = True
		else:
			if bcrypt.checkpw(password.encode('utf-8'),secure['pass'][2:-1].encode('utf-8')):
				auth = True

		responseData = {}
		if auth:
			#Generate the token
			chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			token = ''
			i = 0
			while i < 40:
				token += random.choice(chars)
				i += 1
			#Saved the new token
			secure['token']['front'] = token
			self.redis.set('secure',json.dumps(secure))
			#Prepare the response
			responseData = {
				'status': 'in',
				'user': user,
				'token': token
			}
			self.log('Log',user + ' has login')

			self.userName = user
			self.userToken = token
		else:
			#Prepare the response
			responseData = {
				'status': 'fail'
			}
			self.log('Alert','Login failed, user: ' + user)

		return responseData

	def validateUserToken(self, headers):
		user = headers['user']
		token = headers['token']

		# secure = json.loads(self.redis.get('secure'))

		responseData = {}
		if user == self.userName and token == self.userToken:
			responseData = {
				'status': 'in'
			}
		else:
			responseData = {
				'status': 'fail'
			}

		return responseData

	def googleSync(self, headers, responseURL):
		user = headers['user']
		password = headers['pass']

		secure = json.loads(self.redis.get('secure'))

		if bcrypt.checkpw(password.encode('utf-8'),secure['pass'][2:-1].encode('utf-8')):
			return responseURL
		else:
			return "fail"

# ACCESS

	def getAPIKey(self):
		secure = json.loads(self.redis.get('secure'))
		data = {
			"apikey": secure['token']['apikey']
		}

		return data

	def generateAPIKey(self):
		chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		token = ''
		i = 0
		while i < 40:
			token += random.choice(chars)
			i += 1
		secure = json.loads(self.redis.get('secure'))
		secure['token']['apikey'] = token
		self.redis.set('secure',json.dumps(secure))
		self.apikey = token
		data = {
			"apikey": token
		}

		return data

	def getToken(self,agent):
		if agent == 'front':
			return self.userToken
		elif agent == 'apikey':
			return self.apikey
		else:
			return json.loads(self.redis.get('secure'))['token'][agent]

	def updateToken(self,agent,type,value,timestamp):
		secure = json.loads(self.redis.get('secure'))

		secure['token'][agent][type]['value'] = value
		secure['token'][agent][type]['timestamp'] = timestamp

		self.redis.set('secure',json.dumps(secure))

# SETTINGS

	def getSettings(self):

		secure = json.loads(self.redis.get('secure'))
		data = {
			"google": {
				"client_id": secure['token']["google"]["client_id"],
				"client_secret": secure['token']["google"]["client_secret"],
			},
			"ddns": secure['ddns'],
			"sync_google": secure['sync_google'],
			"sync_devices": secure['sync_devices'],
			"log": secure['log']
		}
		try:
			data['mqtt'] = secure['mqtt']
		except:
			data['mqtt'] = {"user":"","password":""}


		return data

	def updateSettings(self, incommingData):
		secure = json.loads(self.redis.get('secure'))

		secure['token']["google"]["client_id"] = incommingData['google']['client_id']
		secure['token']["google"]["client_secret"] = incommingData['google']['client_secret']
		secure['ddns']['username'] = incommingData['ddns']['username']
		secure['ddns']['password'] = incommingData['ddns']['password']
		secure['ddns']['provider'] = incommingData['ddns']['provider']
		secure['ddns']['hostname'] = incommingData['ddns']['hostname']
		secure['ddns']['enabled'] = incommingData['ddns']['enabled']
		secure['mqtt'] = {}
		secure['mqtt']['user'] = incommingData['mqtt']['user']
		secure['mqtt']['password'] = incommingData['mqtt']['password']
		secure['sync_google'] = incommingData['sync_google']
		secure['sync_devices'] = incommingData['sync_devices']
		secure['log'] = incommingData['log']

		self.redis.set('secure',json.dumps(secure))

		self.sync_google = incommingData['sync_google']
		self.sync_devices = incommingData['sync_devices']

	def setSyncDevices(self, value):
		secure = json.loads(self.redis.get('secure'))
		if type(value) == bool:
			secure['sync_devices'] = value
		self.redis.set('secure',json.dumps(secure))

	def getSyncDevices(self):
		secure = json.loads(self.redis.get('secure'))
		return secure['sync_devices']

# SYSTEM

	def getMQTT(self):
		return json.loads(self.redis.get('secure'))['mqtt']

	def getDDNS(self):
		return json.loads(self.redis.get('secure'))['ddns']

	def updateDDNS(self, ip, status, code, enabled, last):
		secure = json.loads(self.redis.get('secure'))
		secure['ddns']['ip'] = ip
		secure['ddns']['status'] = status
		secure['ddns']['code'] = code
		secure['ddns']['enabled'] = enabled
		secure['ddns']['last'] = last
		self.redis.set('secure',json.dumps(secure))

	def redisStatus(self):
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

	def updateSyncGoogle(self,status):
		secure = json.loads(self.redis.get('secure'))
		secure['sync_google'] = status
		self.sync_google = status
		self.redis.set('secure',json.dumps(secure))

# LOG

	def log(self, severity, message):
		log_file = open('../logs/' + "homeware.log", "a")
		now = datetime.now()
		date_time = now.strftime("%d/%m/%Y, %H:%M:%S")
		log_register = severity + ' - ' + date_time  + ' - ' + message + '\n';
		log_file.write(log_register)
		log_file.close()
		if (severity == "Alert"):
			self.redis.set('alert','set')

		if (self.verbose):
			print(log_register)

	def setVerbose(self, verbose):
		self.verbose = verbose

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

	def deleteLog(self):
		log = []
		# Get the days to delete
		secure = json.loads(self.redis.get('secure'))
		days = int(secure['log']['days'])
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
					log.append(register)
				
			except:
				now = datetime.now()
				date_time = now.strftime("%d/%m/%Y, %H:%M:%S")
				log_register = 'Log - ' + date_time  + ' - Unable to process a registry from the log file\n';
				log.append(log_register)

		# Write the new file in disk
		log_file = open("../logs/homeware.log","w")
		for register in log:
			log_file.write(register)
		log_file.close()


	def isThereAnAlert(self):
		return {"alert": str(self.redis.get('alert'))[2:-1]}

# ALIVE

	def updateAlive(self, core):
		ts = int(time.time())
		alive = {}
		try:
			alive = json.loads(self.redis.get('alive'))
		except:
			alive = {}
		alive[core] = ts
		self.redis.set('alive', json.dumps(alive))

	def getAlive(self):
		return json.loads(self.redis.get('alive'))
