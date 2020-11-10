import unittest
import json
from homeware import app

class test_homeware(unittest.TestCase):

    def setUp(self):
        self.tester = app.test_client(self)
        self.user = {
            'user': 'enrique',
            'pass': 'enrique'
            }
        self.tester.post("/api/user/set/",data=self.user)
        creds = json.loads(self.tester.post("/api/user/login/",headers=self.user).data)
        print(creds)
        self.token = {
            "authorization": "baerer " + creds['token']
        }

    def test_test(self):
        response = self.tester.get("/test/",content_type="html/text")
        self.assertEqual(response.data, b"Load")

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
        response = self.tester.post("/api/devices/update/",json={"device":device},headers=self.token)
        self.assertEqual(json.loads(response.data)['code'], 200)
        response = self.tester.get("/api/devices/get/light012/",headers=self.token)
        self.assertEqual(json.loads(response.data)['name']['name'], "Hello")
        # Try to update a device that doesn't exists
        device['id'] = 'not'
        response = self.tester.post("/api/devices/update/",json={"device":device},headers=self.token)
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

if __name__ == "__main__":
    unittest.main()
