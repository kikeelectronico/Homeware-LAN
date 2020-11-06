import unittest
from data import Data

class TestData(unittest.TestCase):
    def setUp(self):
        self.data = Data()

# GLOBAL

    def test_version(self):
        self.assertEqual({'version': 'v1.0.1'}, self.data.getVersion())

    def test_redisStatus(self):
        response = {
            'enable': True,
            'status': 'Running',
            'title': 'Redis database'
        }
        self.assertEqual(response, self.data.redisStatus())

# DEVICES

    def test_devices(self):
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
        # Verify that only exists a device
        self.assertEqual(1,len(self.data.getDevices()))
        print(self.data.getDevices())
        # Crate a new device and check if it is saved in the ddbb
        self.data.createDevice({"device":device,"status":status})
        print(self.data.getDevices())
        self.assertEqual(device,self.data.getDevices()[1])
        self.assertEqual(status,self.data.getStatus()[device['id']])
        # Update the device info
        device['name']['name'] = 'Diodi'
        self.assertTrue(self.data.updateDevice({"device": device}))
        get_devices = self.data.getDevices()
        self.assertEqual('Diodi',get_devices[len(get_devices)-1]['name']['name'])
        # Update the device status
        # A mosquito server is needed for this
        # self.assertFalse(self.data.getStatus()[device['id']]['on'])
        # self.data.updateParamStatus(device['id'],"on",True)
        # self.assertTrue(self.data.getStatus()[device['id']]['on'])
        # Delete a device that doesn't exists
        self.assertFalse(self.data.deleteDevice('charger'))
        # Delete the device
        self.assertTrue(self.data.deleteDevice('light'))

# TASKS

# USER

    def test_setUser(self):
        user = {
            'user': 'userTest',
            'pass': 'passTest'
            }
        self.assertEqual('Saved correctly!',self.data.setUser(user))
        self.assertEqual('Your user has been set in the past',self.data.setUser(user))
        login_data = self.data.login(user)
        self.assertEqual('in',login_data['status'])
        self.assertEqual(user['user'],login_data['user'])
        response = {
            'status': 'in'
        }
        self.assertEqual(response,self.data.validateUserToken(login_data))

# ACCESS

    def test_getAPIKey(self):
        api_key = self.data.generateAPIKey()
        self.assertEqual(api_key, self.data.getAPIKey())

#  SETTINGS

    def test_settings(self):
        settings = {
            "google": {
                "client_id": "hello_world",
                "client_secret": "bye_world"
            },
            "ddns": {
                "username": "hola@rinconingenieril.es",
                "password": "aPassword?",
                "provider": "ddns",
                "hostname": "localhost",
                "enabled": True
            },
            "mqtt": {
                "user": "mqttUser",
                "password": "mqttPassword"
            }
        }
        self.data.updateSettings(settings)
        settings['ddns']['status'] = 'Unknown'
        settings['ddns']['code'] = 'Unknown'
        settings['ddns']['last'] = 'Unknown'
        settings['ddns']['ip'] = 'Unknown'
        self.assertEqual(settings,self.data.getSettings())

    def test_assistant(self):
        self.assertFalse(self.data.getAssistantDone())
        self.data.setAssistantDone()
        self.assertTrue(self.data.getAssistantDone())


# LOG

    def test_log(self):
        register = ["WarningDeEso","A message with ó"]
        self.data.log('d','f')
        self.data.log(register[0],register[1])
        self.assertIn(register[0], self.data.getLog()[-1]['severity'])
        self.assertIn(register[1], self.data.getLog()[-1]['message'])



if __name__ == '__main__':
    unittest.main()
