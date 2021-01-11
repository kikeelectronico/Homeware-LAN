import unittest
import json
from homeware import app

class test_homeware(unittest.TestCase):

	def setUp(self):
		self.tester = app.test_client(self)
		self.user = {
			"user": "userTest",
			"pass": "passTest",
			"token": ""
			}
		response = self.tester.post("/api/user/set/",data=self.user)
		creds = json.loads(self.tester.post("/api/user/login/",headers=self.user).data)
		self.user["token"] = creds['token']
		self.token = {
			"authorization": "baerer " + creds['token']
		}

	def test_test(self):
		response = self.tester.get("/test/",content_type="html/text")
		self.assertEqual(response.data, b"Load")

# DEVICES

	def test_devices_create(self):
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
			"id": "light010",
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
		response = self.tester.post("/api/devices/create/",json={"device":device,"status":status},headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 200)

	def test_devices_get(self):
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
			"id": "light011",
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
		self.tester.post("/api/devices/create/",json={"device":device,"status":status},headers=self.token)
		response = self.tester.get("/api/devices/get/light011/",headers=self.token)
		self.assertEqual(json.loads(response.data)['name']['name'], "Test Lamp")

	def test_devices_update(self):
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
			"id": "light012",
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
		# Create a device, update it and check it
		self.tester.post("/api/devices/create/",json={"device":device,"status":status},headers=self.token)
		device['name']['name'] = 'Hello'
		response = self.tester.post("/api/devices/update/",json={"device":device,"status":status},headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 200)
		response = self.tester.get("/api/devices/get/light012/",headers=self.token)
		self.assertEqual(json.loads(response.data)['name']['name'], "Hello")
		# Try to update a device that doesn't exists
		device['id'] = 'not'
		response = self.tester.post("/api/devices/update/",json={"device":device,"status":status},headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 404)

	def test_devices_delete(self):
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
			"id": "light013",
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
		# Create a device and delete
		self.tester.post("/api/devices/create/",json={"device":device,"status":status},headers=self.token)
		response = self.tester.post("/api/devices/delete/light013/",headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 200)
		# Try to delete a device that doesn't exists
		response = self.tester.post("/api/devices/delete/not/",headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 404)

	def test_devices_401(self):
		response = self.tester.post("/api/devices/delete/not/")
		self.assertEqual(json.loads(response.data)['code'], 401)

# STATUS

	def test_status_update(self):
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
			"id": "light014",
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
		# Create a device
		response = self.tester.post("/api/devices/create/",json={"device":device,"status":status},headers=self.token)
		self.assertEqual(json.loads(response.data)["code"], 200)
		# Update and check the params
		response = self.tester.get("/api/status/get/",headers=self.token)
		self.assertFalse(json.loads(response.data)["light014"]["on"])
		response = self.tester.get("/api/status/update/",json={"id": "light014","param":"on","value":True},headers=self.token)
		self.assertEqual(json.loads(response.data)["code"], 200)
		response = self.tester.get("/api/status/get/",headers=self.token)
		self.assertTrue(json.loads(response.data)["light014"]["on"])


# TASKS

	def test_tasks_create(self):
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
		response = self.tester.post("/api/tasks/create/",json={"task": task},headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 200)

	def test_tasks_get(self):
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
		id = len(json.loads(self.tester.get("/api/tasks/get/",headers=self.token).data))
		self.tester.post("/api/tasks/create/",json={"task": task},headers=self.token)
		response = self.tester.get("/api/tasks/get/" + str(id) + "/",headers=self.token)
		self.assertEqual(json.loads(response.data)["title"], "Light")

	def test_tasks_update(self):
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
		# Create a task, update it and check it
		id = len(json.loads(self.tester.get("/api/tasks/get/",headers=self.token).data))
		self.tester.post("/api/tasks/create/",json={"task": task},headers=self.token)
		task['title'] = 'Hello'
		response = self.tester.post("/api/tasks/update/",json={"task": task, "id": id},headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 200)
		response = self.tester.get("/api/tasks/get/" + str(id) + "/",headers=self.token)
		self.assertEqual(json.loads(response.data)['title'], "Hello")
		# Try to update a task that doesn't exists
		task['title'] = 'not'
		response = self.tester.post("/api/tasks/update/",json={"task": task, "id": 100},headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 404)

	def test_tasks_delete(self):
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
		# Create a device and delete
		id = len(json.loads(self.tester.get("/api/tasks/get/",headers=self.token).data))
		self.tester.post("/api/tasks/create/",json={"task": task},headers=self.token)
		response = self.tester.post("/api/tasks/delete/1/",headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 200)
		# Try to delete a device that doesn't exists
		response = self.tester.post("/api/tasks/delete/100/",headers=self.token)
		self.assertEqual(json.loads(response.data)['code'], 404)

	def test_tasks_401(self):
		response = self.tester.post("/api/tasks/delete/1/")
		self.assertEqual(json.loads(response.data)['code'], 401)

# GLOBAL

	def test_global_version(self):
		response = self.tester.get("/api/global/version/",content_type="html/text")
		self.assertEqual(response.status_code, 200)

	def test_global_get(self):
		response = self.tester.get("/api/global/get/",headers=self.token)
		data = json.loads(response.data)
		self.assertIn("devices",data.keys())
		self.assertIn("status",data.keys())
		self.assertIn("tasks",data.keys())


# USER

	def test_user_validateToken(self):
		response = self.tester.post("/api/user/validateToken/",headers=self.user)
		self.assertEqual(json.loads(response.data)['status'], "in")

# ACCESS

	def test_access(self):
		response = self.tester.get("/api/access/create/",headers=self.token)
		apikey = json.loads(response.data)["apikey"]
		response = self.tester.get("/api/access/get/",headers=self.token)
		self.assertEqual(apikey, json.loads(response.data)["apikey"])

# SETTINGS


# SYSTEM

	def test_system_status(self):
		response = self.tester.get("/api/system/status/",headers=self.token)
		data = json.loads(response.data)
		self.assertEqual(data["api"]["status"],"Running")
		self.assertEqual(data["mqtt"]["status"],"Stopped")
		self.assertEqual(data["tasks"]["status"],"Stopped")
		self.assertEqual(data["redis"]["status"],"Running")

	def test_system_401(self):
		response = self.tester.get("/api/system/status/")
		self.assertEqual(json.loads(response.data)['code'], 401)
# LOG

	def test_log_get(self):
		response = self.tester.get("/api/log/get/",headers=self.token)
		self.assertEqual(type(json.loads(response.data)), list)

if __name__ == "__main__":
	unittest.main()
