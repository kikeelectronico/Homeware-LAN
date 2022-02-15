import unittest
from data import Data
import paho.mqtt.publish as publish

class Test_data(unittest.TestCase):
	def setUp(self):
		self.data = Data()

# GLOBAL

	def test_version(self):
		self.assertEqual('v', self.data.getVersion()['version'][0])

	def test_redisStatus(self):
		response = {
			'enable': True,
			'status': 'Running',
			'title': 'Redis database'
		}
		self.assertEqual(response, self.data.redisStatus())

# DEVICES

	def test_createAdevice(self):
		device = {
			"attributes": {
			  "commandOnlyOnOff": True,
			  "queryOnlyOnOff": True,
			  "commandOnlyBrightness": True
			},
			"deviceInfo": {
			  "hwVersion": "1.0",
			  "swVersion": "1.0",
			  "manufacturer": "Homeware",
			  "model": "Homeware Lamp 2.0"
			},
			"id": "light001",
			"name": {
			  "defaultNames": [
				"Lamp"
			  ],
			  "nicknames": [
				"Lamp"
			  ],
			  "name": "Test Lamp"
			},
			"traits": [
			  "action.devices.traits.OnOff",
			  "action.devices.traits.Brightness"
			],
			"type": "action.devices.types.LIGHT"
		}
		status = {
			"online": True,
			"on": False,
			"brightness": 80
		}
		# Crate a new device and check if it is saved in the ddbb
		self.data.createDevice({"device":device,"status":status})
		self.assertEqual(device,self.data.getDevices()[1])
		self.assertEqual(status,self.data.getStatus()[device['id']])

	def test_updateDevice(self):
		device = {
			"attributes": {
			  "commandOnlyOnOff": True,
			  "queryOnlyOnOff": True,
			  "commandOnlyBrightness": True
			},
			"deviceInfo": {
			  "hwVersion": "1.0",
			  "swVersion": "1.0",
			  "manufacturer": "Homeware",
			  "model": "Homeware Lamp 2.0"
			},
			"id": "light002",
			"name": {
			  "defaultNames": [
				"Lamp"
			  ],
			  "nicknames": [
				"Lamp"
			  ],
			  "name": "Test Lamp"
			},
			"traits": [
			  "action.devices.traits.OnOff",
			  "action.devices.traits.Brightness"
			],
			"type": "action.devices.types.LIGHT"
		}
		status = {
			"online": True,
			"on": False,
			"brightness": 80
		}
		# Crate a new device
		self.data.createDevice({"device":device,"status":status})
		# Update the device info
		device['name']['name'] = 'Diodi'
		self.assertTrue(self.data.updateDevice({"device": device,"status":status}))
		devices = self.data.getDevices()
		name = ''
		for device in devices:
			if device['id'] == 'light002':
				name = device['name']['name']
		self.assertEqual('Diodi',name)

	def test_updateStatus(self):
		device = {
			"attributes": {
			  "commandOnlyOnOff": True,
			  "queryOnlyOnOff": True,
			  "commandOnlyBrightness": True
			},
			"deviceInfo": {
			  "hwVersion": "1.0",
			  "swVersion": "1.0",
			  "manufacturer": "Homeware",
			  "model": "Homeware Lamp 2.0"
			},
			"id": "light003",
			"name": {
			  "defaultNames": [
				"Lamp"
			  ],
			  "nicknames": [
				"Lamp"
			  ],
			  "name": "Test Lamp"
			},
			"traits": [
			  "action.devices.traits.OnOff",
			  "action.devices.traits.Brightness"
			],
			"type": "action.devices.types.LIGHT"
		}
		status = {
			"online": True,
			"on": False,
			"brightness": 80
		}
		# Crate a new device
		self.data.createDevice({"device":device,"status":status})
		# Update the device status
		self.assertFalse(self.data.getStatus()['light003']['on'])
		#self.assertTrue(self.data.updateParamStatus('light003',"on",True))
		#self.assertTrue(self.data.getStatus()['light003']['on'])

	def test_deleteDevice(self):
		device = {
			"attributes": {
			  "commandOnlyOnOff": True,
			  "queryOnlyOnOff": True,
			  "commandOnlyBrightness": True
			},
			"deviceInfo": {
			  "hwVersion": "1.0",
			  "swVersion": "1.0",
			  "manufacturer": "Homeware",
			  "model": "Homeware Lamp 2.0"
			},
			"id": "light004",
			"name": {
			  "defaultNames": [
				"Lamp"
			  ],
			  "nicknames": [
				"Lamp"
			  ],
			  "name": "Test Lamp"
			},
			"traits": [
			  "action.devices.traits.OnOff",
			  "action.devices.traits.Brightness"
			],
			"type": "action.devices.types.LIGHT"
		}
		status = {
			"online": True,
			"on": False,
			"brightness": 80
		}
		# Crate a new device
		self.data.createDevice({"device":device,"status":status})
		# Delete a device that doesn't exists
		self.assertFalse(self.data.deleteDevice('charger'))
		# Delete the device
		self.assertTrue(self.data.deleteDevice('light004'))

# TASKS

	def test_createTask(self):
		task = {
		  "title": "Light",
		  "description": "Light control description",
		  "triggers": {
			"trigger": {
			  "type": "or",
			  "parent": "triggers",
			  "operation": [
				1594745594679
			  ]
			},
			"1594745594679": {
			  "type": "and",
			  "parent": "trigger",
			  "operation": [
				"1594745648295",
				"1594746507144"
			  ]
			},
			"1594745648295": {
			  "type": "d2b",
			  "parent": "1594745594679",
			  "operation": "light:on:=:false"
			},
			"1594746507144": {
			  "type": "d2b",
			  "parent": "1594745594679",
			  "operation": "light:alive:=:true"
			}
		  },
		  "target": [
			{
			  "device": "light",
			  "param": "on",
			  "value": True
			}
		  ]
		}
		# Crate a new task and check if it is saved in the ddbb
		self.data.createTask(task)
		tasks = self.data.getTasks()
		for i,t in enumerate(tasks):
			if t['title'] == 'Light':
				self.assertEqual(task,t)
				self.assertEqual(task,self.data.getTask(i))

	def test_updateTask(self):
		task = {
		  "title": "Light1",
		  "description": "Light control description",
		  "triggers": {
			"trigger": {
			  "type": "or",
			  "parent": "triggers",
			  "operation": [
				1594745594679
			  ]
			},
			"1594745594679": {
			  "type": "and",
			  "parent": "trigger",
			  "operation": [
				"1594745648295",
				"1594746507144"
			  ]
			},
			"1594745648295": {
			  "type": "d2b",
			  "parent": "1594745594679",
			  "operation": "light:on:=:false"
			},
			"1594746507144": {
			  "type": "d2b",
			  "parent": "1594745594679",
			  "operation": "light:alive:=:true"
			}
		  },
		  "target": [
			{
			  "device": "light",
			  "param": "on",
			  "value": True
			}
		  ]
		}
		# Crate a new task
		self.data.createTask(task)
		# Update the task info
		task['title'] = 'Diodi'
		tasks = self.data.getTasks()
		self.assertTrue(self.data.updateTask({'task': task, 'id': len(tasks)-1}))
		tasks = self.data.getTasks()
		for i,t in enumerate(tasks):
			if t['title'] == 'Light1':
				self.assertEqual('Diodi',t['title'])

	def test_deleteTask(self):
		task =   {
		  "title": "Light2",
		  "description": "Light control description",
		  "triggers": {
			"trigger": {
			  "type": "or",
			  "parent": "triggers",
			  "operation": [
				1594745594679
			  ]
			},
			"1594745594679": {
			  "type": "and",
			  "parent": "trigger",
			  "operation": [
				"1594745648295",
				"1594746507144"
			  ]
			},
			"1594745648295": {
			  "type": "d2b",
			  "parent": "1594745594679",
			  "operation": "light:on:=:false"
			},
			"1594746507144": {
			  "type": "d2b",
			  "parent": "1594745594679",
			  "operation": "light:alive:=:true"
			}
		  },
		  "target": [
			{
			  "device": "light",
			  "param": "on",
			  "value": True
			}
		  ]
		}
		# Crate a new task
		self.data.createTask(task)
		# Delete a device that doesn't exists
		self.assertFalse(self.data.deleteTask(10))
		# Delete the device
		tasks = self.data.getTasks()
		for i,t in enumerate(tasks):
			if t['title'] == 'Light2':
				self.assertTrue(self.data.deleteTask(i))


# USER

	# def updatePassword(self):
	# 	passwords = {
	# 		'new_pass': 'newPass',
	# 		'pass': 'passTest'
	# 		}
	# 	self.assertEqual('Updated',self.data.updatePassword(passwords))
	# 	user = {
	# 		'user': 'userTest',
	# 		'pass': 'newPass'
	# 		}
	# 	login_data = self.data.login(user)
	# 	self.assertEqual('in',login_data['status'])
	# 	self.assertEqual(user['user'],login_data['user'])
	# 	response = {
	# 		'status': 'in'
	# 	}
	# 	self.assertEqual(response,self.data.validateUserToken(login_data))

# ACCESS

	def test_getAPIKey(self):
		api_key = self.data.generateAPIKey()
		self.assertEqual(api_key, self.data.getAPIKey())

#  SETTINGS

	# def test_settings(self):
	# 	settings = {
	# 		"google": {
	# 			"client_id": "hello_world",
	# 			"client_secret": "bye_world"
	# 		},
	# 		"ddns": {
	# 			"username": "hola@rinconingenieril.es",
	# 			"password": "aPassword?",
	# 			"provider": "ddns",
	# 			"hostname": "localhost",
	# 			"enabled": True
	# 		},
	# 		"mqtt": {
	# 			"user": "mqttUser",
	# 			"password": "mqttPassword"
	# 		}
	# 	}
	# 	self.data.updateSettings(settings)
	# 	settings['ddns']['status'] = 'Unknown'
	# 	settings['ddns']['code'] = 'Unknown'
	# 	settings['ddns']['last'] = 'Unknown'
	# 	settings['ddns']['ip'] = 'Unknown'
	# 	self.assertEqual(settings,self.data.getSettings())

# LOG

	# def test_log(self):
	# 	register = ["WarningDeEso","A message with "]
	# 	self.data.log('d','f')
	# 	self.data.log(register[0],register[1])
	# 	self.assertIn(register[0], self.data.getLog()[-1]['severity'])
	# 	self.assertIn(register[1], self.data.getLog()[-1]['message'])



if __name__ == '__main__':
	unittest.main()
