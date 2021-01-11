import json
import random
from cryptography.fernet import Fernet
import bcrypt
import redis
import time
from datetime import datetime
import subprocess
import paho.mqtt.publish as publish
import os.path

from homeGraph import HomeGraph
homegraph = HomeGraph()

class Data:


	version = 'v1.2.0'
	homewareFile = 'homeware.json'
	apikey = ''
	userToken = ''
	userName = ''
	domain = ''
	linked = False


	def __init__(self):
		self.redis = redis.Redis("localhost")
		self.verbose = False

		if not self.redis.get('transfer'):
			self.log('Warning','The database must be created')
			try:
				self.load()
				self.log('Warning','Using a provided homeware file')
			except:
				subprocess.run(["cp", "../configuration_templates/template_homeware.json", "../homeware.json"],  stdout=subprocess.PIPE)
				self.load()
				self.log('Warning','Using a template homeware file')

			self.redis.set("transfer", "true");

		if self.redis.get("tasks") == None:
			self.redis.set("tasks","[]")

		if self.redis.get("alert") == None:
			self.redis.set("alert","clear")

		secure = json.loads(self.redis.get('secure'))
		try:
			self.linked = secure['linked']
		except:
			secure['linked'] = False
			self.linked = False
			self.redis.set('secure',json.dumps(secure))

		# Load some data into memory
		self.userName = secure['user']
		self.userToken = secure['token']['front']
		self.apikey = secure['token']['apikey']
		self.domain = secure['domain']


	def getVersion(self):
		return {'version': self.version}

	def getGlobal(self):
		data = {
			'devices': json.loads(self.redis.get('devices')),
			'status': json.loads(self.redis.get('status')),
			'tasks': json.loads(self.redis.get('tasks'))
		}
		return data

	def createFile(self,file):
		data = {
			'devices': json.loads(self.redis.get('devices')),
			'status': json.loads(self.redis.get('status')),
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
			self.redis.set('status',json.dumps(data['status']))
			self.redis.set('tasks',json.dumps(data['tasks']))
			self.redis.set('secure',json.dumps(data['secure']))

# DEVICES

	def getDevices(self):
		return json.loads(self.redis.get('devices'))

	def updateDevice(self, incommingData):
		deviceID = incommingData['device']['id']
		temp_devices = [];
		found = False
		for device in json.loads(self.redis.get('devices')):
			if device['id'] == deviceID:
				temp_devices.append(incommingData['device'])
				found = True
				status = json.loads(self.redis.get('status'))
				status[deviceID] = incommingData['status']
				self.redis.set('status',json.dumps(status))
			else:
				temp_devices.append(device)
		self.redis.set('devices',json.dumps(temp_devices))
		# Inform Google Home Graph
		if os.path.exists("../google.json") and self.linked:
			homegraph.requestSync(self.domain)

		return found

	def createDevice(self, incommingData):
		deviceID = incommingData['device']['id']

		devices = json.loads(self.redis.get('devices'))
		devices.append(incommingData['device'])
		self.redis.set('devices',json.dumps(devices))

		status = json.loads(self.redis.get('status'))
		status[deviceID] = incommingData['status']
		self.redis.set('status',json.dumps(status))

		# Inform Google Home Graph
		if os.path.exists("../google.json") and self.linked:
			homegraph.requestSync(self.domain)

	def deleteDevice(self, value):
		temp_devices = [];
		found = False
		for device in json.loads(self.redis.get('devices')):
			if device['id'] != value:
				temp_devices.append(device)
			else:
				found = True
		self.redis.set('devices',json.dumps(temp_devices))
		# Delete status
		if found:
			status = json.loads(self.redis.get('status'))
			del status[value]
			self.redis.set('status',json.dumps(status))

		# Inform Google Home Graph
		if os.path.exists("../google.json") and self.linked:
			homegraph.requestSync(self.domain)

		return found

# STATUS

	def getStatus(self):
		return json.loads(self.redis.get('status'))

	def updateParamStatus(self, device, param, value):
		status = json.loads(self.redis.get('status'))
		if device in status.keys():
			status[device][param] = value
			self.redis.set('status',json.dumps(status))
			# Try to get username and password
			msgs = [
				{'topic': "device/" + device + '/' + param, 'payload': str(value)},
				{'topic': "device/" + device, 'payload': json.dumps(status[device])}
			]
			try:
				mqttData = self.getMQTT()
				if not mqttData['user'] == "":
					client.username_pw_set(mqttData['user'], mqttData['password'])
					publish.multiple(msgs, hostname="localhost", auth={'username':mqttData['user'], 'password': mqttData['password']})
				else:
					publish.multiple(msgs, hostname="localhost")

			except:
				publish.multiple(msgs, hostname="localhost")

			# Inform Google Home Graph
			if os.path.exists("../google.json") and self.linked:
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

	def setUser(self, incommingData):
		if json.loads(self.redis.get('secure'))['user'] == '':
			data = {}
			secure = json.loads(self.redis.get('secure'))
			secure['user'] = incommingData['user']
			secure['pass'] = str(bcrypt.hashpw(incommingData['pass'].encode('utf-8'), bcrypt.gensalt()))
			self.redis.set('secure',json.dumps(secure))
			return 'Saved correctly!'
		else:
			return 'Your user has been set in the past'

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
			"ddns": secure['ddns']
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

		self.redis.set('secure',json.dumps(secure))

	def getAssistantDone(self):
		try:
			if not self.redis.get('assistantDone') == None:
				return True
			else:
				return False
		except:
			return False

	def setAssistantDone(self):
		self.redis.set('assistantDone',"True")

	def setDomain(self, value):
		try:
			secure = json.loads(self.redis.get('secure'))

			secure['domain'] = value
			secure['ddns']['hostname'] = value

			self.redis.set('secure',json.dumps(secure))
			return 'Saved correctly!'
		except:
			return 'Something goes wrong'

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

	def updateLinked(self,status):
		secure = json.loads(self.redis.get('secure'))
		secure['linked'] = status
		self.linked = status
		self.redis.set('secure',json.dumps(secure))

# LOG

	def log(self, severity, message):
		log_file = open('../' + "homeware.log", "a")
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
		log_file = open('../' + "homeware.log","r")
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
