import json
import random
from cryptography.fernet import Fernet
import redis
from redisworks import Root


class Data:

    version = 'v0.6'
    homewareData = {}
    homewareFile = 'homeware.json'
    secureData = {}
    secureFile = 'secure.json'


    def __init__(self):
        self.redis = redis.Redis("localhost")
        self.ddbb = Root()

        self.ddbb.transfer = False

        if not self.ddbb.transfer == True:
            print('Must create the database')
            with open(self.homewareFile, 'r') as f:
                self.ddbb.homewareData = json.load(f)
            with open(self.secureFile, 'r') as f:
                self.ddbb.secureData = json.load(f)
            self.ddbb.transfer = True

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
            'devices': self.ddbb.homewareData['devices'],
            'status': self.ddbb.homewareData['status']
        }
        return data

# DEVICES

    def getDevices(self):
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.homewareData, f)
        return self.ddbb.homewareData['devices']

    def updateDevice(self, incommingData):
        deviceID = incommingData['devices']['id']
        temp_devices = [];
        for device in self.ddbb.homewareData['devices']:
            if device['id'] == deviceID:
                temp_devices.append(incommingData['devices'])
            else:
                temp_devices.append(device)
        self.ddbb.homewareData['devices'] = temp_devices
        # self.save()

    def createDevice(self, incommingData):
        deviceID = incommingData['devices']['id']
        self.ddbb.homewareData['devices'].append(incommingData['devices'])
        self.ddbb.homewareData['status'][deviceID] = {}
        self.ddbb.homewareData['status'][deviceID] = incommingData['status']
        # self.save()

    def deleteDevice(self, value):
        temp_devices = [];
        for device in self.ddbb.homewareData['devices']:
            if device['id'] != value:
                temp_devices.append(device)
        self.ddbb.homewareData['devices'] = temp_devices
        # Delete status
        status = self.ddbb.homewareData['status']
        del status[value]
        self.ddbb.homewareData['status'] = status
        # self.save()

# RULES

    def getRules(self):
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.homewareData, f)
        return self.ddbb.homewareData['rules']

    def updateRule(self, incommingData):
        self.ddbb.homewareData['rules'][int(incommingData['id'])] = incommingData['rule']
        # self.save()

    def createRule(self, incommingData):
        self.ddbb.homewareData['rules'].append(incommingData['rule'])
        # self.save()

    def deleteRule(self, value):
        temp_rules = self.ddbb.homewareData['rules']
        del temp_rules[int(value)]
        self.ddbb.homewareData['rules'] = temp_rules
        # self.save()

# STATUS

    def getStatus(self):
        # with open(self.homewareFile, 'w') as f:
        #     json.dump(self.homewareData, f)
        return self.ddbb.homewareData['status']

    def updateParamStatus(self, device, param, value):
        self.ddbb.homewareData['status'][device][param] = value
        # self.save()

# SECURE

    def getSecure(self):
        data = {
            "google": {
                "client_id": self.ddbb.secureData['token']["google"]["client_id"],
                "client_secret": self.ddbb.secureData['token']["google"]["client_secret"],
            },
            "ddns": self.ddbb.secureData['ddns'],
            "apikey": self.ddbb.secureData['token']['apikey']
        }
        return data

    def updateSecure(self, incommingData):
        self.ddbb.secureData['token']["google"]["client_id"] = incommingData['google']['client_id']
        self.ddbb.secureData['token']["google"]["client_secret"] = incommingData['google']['client_secret']
        self.ddbb.secureData['ddns']['username'] = incommingData['ddns']['username']
        self.ddbb.secureData['ddns']['password'] = incommingData['ddns']['password']
        self.ddbb.secureData['ddns']['provider'] = incommingData['ddns']['provider']
        self.ddbb.secureData['ddns']['hostname'] = incommingData['ddns']['hostname']
        self.ddbb.secureData['ddns']['enabled'] = incommingData['ddns']['enabled']
        self.save()

    def getToken(self,agent):
        return self.ddbb.secureData['token'][agent]

    def updateToken(self,agent,type,value,timestamp):
        self.ddbb.secureData['token'][agent][type]['value'] = value
        self.ddbb.secureData['token'][agent][type]['timestamp'] = timestamp
        self.save()

    def setUser(self, incommingData):
        if self.ddbb.secureData['user'] == '':
            data = {}
            key = Fernet.generate_key()
            self.ddbb.secureData['key'] = str(key)
            cipher_suite = Fernet(key)
            ciphered_text = cipher_suite.encrypt(str.encode(incommingData['pass']))   #required to be bytes
            self.ddbb.secureData['user'] = incommingData['user']
            self.ddbb.secureData['pass'] = str(ciphered_text)
            self.save()
            return 'Saved correctly!'
        else:
            return 'Your user has beed set in the past'

    def setDomain(self, value):
        self.ddbb.secureData['domain'] = value
        self.ddbb.secureData['ddns']['hostname'] = value
        self.save()

    def getDDNS(self):
        return self.ddbb.secureData['ddns']

    def updateDDNS(self, ip, status, code, enabled, last):
        self.ddbb.secureData['ddns']['ip'] = ip
        self.ddbb.secureData['ddns']['status'] = status
        self.ddbb.secureData['ddns']['code'] = code
        self.ddbb.secureData['ddns']['enabled'] = enabled
        self.ddbb.secureData['ddns']['last'] = last
        self.save()

    def generateAPIKey(self):
        chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        token = ''
        i = 0
        while i < 40:
            token += random.choice(chars)
            i += 1
        self.ddbb.secureData['token']['apikey'] = token
        self.save()
        return token

# LOGIN

    def login(self, headers):
        user = headers['user']
        password = headers['pass']


        cipher_suite = Fernet(str.encode(self.ddbb.secureData['key'][2:len(self.ddbb.secureData['key'])]))
        plain_text = cipher_suite.decrypt(str.encode(self.ddbb.secureData['pass'][2:len(self.ddbb.secureData['pass'])]))
        responseData = {}
        if user == self.ddbb.secureData['user'] and plain_text == str.encode(password):
            #Generate the token
            chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            token = ''
            i = 0
            while i < 40:
                token += random.choice(chars)
                i += 1
            #Saved the new token
            self.ddbb.secureData['token']['front'] = token
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

        self.save()
        return responseData

    def validateUserToken(self, headers):
        user = headers['user']
        token = headers['token']
        responseData = {}
        if user == self.ddbb.secureData['user'] and token == self.ddbb.secureData['token']['front']:
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

        cipher_suite = Fernet(str.encode(self.ddbb.secureData['key'][2:len(self.ddbb.secureData['key'])]))
        plain_text = cipher_suite.decrypt(str.encode(self.ddbb.secureData['pass'][2:len(self.ddbb.secureData['pass'])]))
        responseData = {}
        if user == self.ddbb.secureData['user'] and plain_text == str.encode(password):
            return responseURL
        else:
            return "fail"
