import json
import random
from cryptography.fernet import Fernet
import redis


class Data:

    version = 'v0.6'
    homewareData = {}
    homewareFile = 'homeware.json'
    secureData = {}
    secureFile = 'secure.json'


    def __init__(self):
        self.redis = redis.Redis("localhost")

        if not self.redis.get('transfer'):
            print('Must create the database')
            with open(self.homewareFile, 'r') as f:
                data = json.load(f)
                self.redis.set('devices',json.dumps(data['devices']))
                self.redis.set('status',json.dumps(data['status']))
                self.redis.set('rules',json.dumps(data['rules']))
            with open(self.secureFile, 'r') as f:
                data = json.load(f)
                self.redis.set('secure',json.dumps(data))
            self.redis.set('transfer', "true");

        else:
            print('DDBB up and running')


    def getVersion(self):
        return {'version': self.version}

    def redisStatus(self):
        status = {}
        try:
            response = self.redis.client_list()
            status =  {
                'enable': True,
                'status': 'Running'
            }
        except redis.ConnectionError:
            status = {
                'enable': True,
                'status': 'Stoped'
            }
        return status

    def firstRun(self):
        return False

    def getGlobal(self):
        data = {
            'devices': json.loads(self.redis.get('devices')),
            'status': json.loads(self.redis.get('status')),
            'rules': json.loads(self.redis.get('rules'))
        }
        return data

    def setData(self):

        self.redis.set('nombre',json.dumps({"nombre":"javi"}))
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.ddbb.homewareData, f)
        # with open(self.secureFile, 'w') as f:
        #     json.dump(self.ddbb.secureData, f)

# DEVICES

    def getDevices(self):
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.homewareData, f)
        return json.loads(self.redis.get('devices'))

    def updateDevice(self, incommingData):
        deviceID = incommingData['devices']['id']
        temp_devices = [];
        for device in json.loads(self.redis.get('devices')):
            if device['id'] == deviceID:
                temp_devices.append(incommingData['devices'])
            else:
                temp_devices.append(device)
        # self.ddbb.homewareData['devices'] = temp_devices
        self.redis.set('devices',json.dumps(temp_devices))
        # self.save()

    def createDevice(self, incommingData):
        deviceID = incommingData['devices']['id']

        devices = json.loads(self.redis.get('devices'))
        devices.append(incommingData['devices'])
        self.redis.set('devices',json.dumps(devices))

        status = json.loads(self.redis.get('status'))
        status[deviceID] = {}
        status[deviceID] = incommingData['status']
        self.redis.set('status',json.dumps(status))
        # self.save()

    def deleteDevice(self, value):
        temp_devices = [];
        for device in json.loads(self.redis.get('devices')):
            if device['id'] != value:
                temp_devices.append(device)
        self.redis.set('devices',json.dumps(temp_devices))
        # Delete status
        status = json.loads(self.redis.get('status'))
        del status[value]
        self.redis.set('status',json.dumps(status))
        # self.save()

# RULES

    def getRules(self):
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.homewareData, f)
        return json.loads(self.redis.get('rules'))

    def updateRule(self, incommingData):
        rules = json.loads(self.redis.get('rules'))
        rules[int(incommingData['id'])] = incommingData['rule']
        self.redis.set('rules',json.dumps(rules))
        # self.save()

    def createRule(self, incommingData):
        rules = json.loads(self.redis.get('rules'))
        rules.append(incommingData['rule'])
        self.redis.set('rules',json.dumps(rules))
        # self.save()

    def deleteRule(self, value):
        temp_rules = json.loads(self.redis.get('rules'))
        del temp_rules[int(value)]
        self.redis.set('rules',json.dumps(temp_rules))
        # self.save()

# STATUS

    def getStatus(self):
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.homewareData, f)
        return json.loads(self.redis.get('status'))

    def updateParamStatus(self, device, param, value):
        # self.ddbb.homewareData['status'][device][param] = value

        status = json.loads(self.redis.get('status'))
        status[device][param] = value
        self.redis.set('status',json.dumps(status))
        # self.save()

# SECURE

    def getSecure(self):

        secure = json.loads(self.redis.get('secure'))
        data = {
            "google": {
                "client_id": secure['token']["google"]["client_id"],
                "client_secret": secure['token']["google"]["client_secret"],
            },
            "ddns": secure['ddns'],
            "apikey": secure['token']['apikey']
        }
        return data

    def updateSecure(self, incommingData):
        secure = json.loads(self.redis.get('secure'))

        secure['token']["google"]["client_id"] = incommingData['google']['client_id']
        secure['token']["google"]["client_secret"] = incommingData['google']['client_secret']
        secure['ddns']['username'] = incommingData['ddns']['username']
        secure['ddns']['password'] = incommingData['ddns']['password']
        secure['ddns']['provider'] = incommingData['ddns']['provider']
        secure['ddns']['hostname'] = incommingData['ddns']['hostname']
        secure['ddns']['enabled'] = incommingData['ddns']['enabled']

        self.redis.set('secure',json.dumps(secure))
        # self.save()

    def getToken(self,agent):
        return json.loads(self.redis.get('secure'))['token'][agent]

    def updateToken(self,agent,type,value,timestamp):
        secure = json.loads(self.redis.get('secure'))

        secure['token'][agent][type]['value'] = value
        secure['token'][agent][type]['timestamp'] = timestamp

        self.redis.set('secure',json.dumps(secure))
        # self.save()

    def setUser(self, incommingData):
        if json.loads(self.redis.get('secure'))['user'] == '':
            data = {}
            key = Fernet.generate_key()
            secure = json.loads(self.redis.get('secure'))
            secure['key'] = str(key)
            cipher_suite = Fernet(key)
            ciphered_text = cipher_suite.encrypt(str.encode(incommingData['pass']))   #required to be bytes
            secure['user'] = incommingData['user']
            secure['pass'] = str(ciphered_text)
            self.redis.set('secure',json.dumps(secure))
            return 'Saved correctly!'
        else:
            return 'Your user has beed set in the past'

    def setDomain(self, value):
        secure = json.loads(self.redis.get('secure'))

        secure['domain'] = value
        secure['ddns']['hostname'] = value

        self.redis.set('secure',json.dumps(secure))


        # self.save()

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
        # self.save()

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
        # self.save()
        return token

# LOGIN

    def login(self, headers):
        user = headers['user']
        password = headers['pass']

        secure = json.loads(self.redis.get('secure'))

        cipher_suite = Fernet(str.encode(secure['key'][2:len(secure['key'])]))
        plain_text = cipher_suite.decrypt(str.encode(secure['pass'][2:len(secure['pass'])]))
        responseData = {}
        if user == secure['user'] and plain_text == str.encode(password):
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
        else:
            #Prepare the response
            responseData = {
                'status': 'fail'
            }

        # self.save()
        return responseData

    def validateUserToken(self, headers):
        user = headers['user']
        token = headers['token']

        secure = json.loads(self.redis.get('secure'))

        responseData = {}
        if user == secure['user'] and token == secure['token']['front']:
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

        cipher_suite = Fernet(str.encode(secure['key'][2:len(secure['key'])]))
        plain_text = cipher_suite.decrypt(str.encode(secure['pass'][2:len(secure['pass'])]))
        responseData = {}
        if user == secure['user'] and plain_text == str.encode(password):
            return responseURL
        else:
            return "fail"
