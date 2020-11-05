import unittest
from data import Data

class TestData(unittest.TestCase):
    def setUp(self):
        self.data = Data()

# GLOBAL

    def test_version(self):
        self.assertEqual({'version': 'v1.0.1'}, self.data.getVersion())

    def test_global(self):
        response = {
            'enable': True,
            'status': 'Running',
            'title': 'Redis database'
        }
        self.assertEqual(response, self.data.redisStatus())

# DEVICES
# STATUS
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


    # def test_login(self):
    #     user = {
    #         'user': 'userTest',
    #         'pass': 'passTest'
    #         }
    #     self.data.setUser(user)
    #     self.assertEqual('in',self.data.login(user)['status'])
    #     self.assertEqual(user['user'],self.data.login(user)['user'])

    # def test_validateToken(self):
    #     user = {
    #         'user': 'userTest',
    #         'pass': 'passTest'
    #         }
    #     print(self.data.userName)
    #     user = self.data.setUser(user)
    #     user = self.data.login(user)
    #     print(user)
    #     response = {
    #         'status': 'in'
    #     }
    #     self.assertEqual(response,self.data.validateUserToken(user))

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
