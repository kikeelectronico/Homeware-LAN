import json
import random
from cryptography.fernet import Fernet


class Data:

    version = 'v0.5.2'
    homewareData = {}
    homewareFile = 'homeware.json'
    secureData = {}
    secureFile = 'secure.json'


    def __init__(self):
        try:
            with open(self.homewareFile, 'r') as f:
                self.homewareData = json.load(f)
            #Create the secure file if doesn't exists: v0.3 to v0.4
            try:
                with open(self.secureFile, 'r') as f:
                    self.secureData = json.load(f)
            except:
                with open('config.json', 'r') as f:
                    self.secureData = json.load(f)
                with open('token.json', 'r') as f:
                    self.secureData['token']['google'] = json.load(f)['google']
                with open(self.secureFile, 'w') as f:
                    json.dump(self.secureData, f)
            #Create DDNS content v0.3 to v0.4
            try:
                ddns = self.secureData['ddns']
            except:
                self.secureData['ddns'] = {
                    'enabled': False,
                    'status': 'Disabled',
                    'code': 'unknown',
                    'last': 'unknown',
                    'ip': 'unknown',
                    'provider': 'ddns',
                    'hostname': self.secureData['domain'],
                    'username': '',
                    'password': ''
                }
                self.save()
            #Create apikey content v0.3 to v0.4
            try:
                ddns = self.secureData['token']['apikey']
            except:
                self.secureData['token']['apikey'] = ''
                self.save()
        except:
            print('Hi')

    def getVersion(self):
        return {'version': self.version}

# FILES

    def firstRun(self):
        try:
            with open(self.homewareFile, 'r') as f:
                self.homewareData = json.load(f)
            with open(self.secureFile, 'r') as f:
                self.secureData = json.load(f)
            return False
        except:
            return True

    def save(self):
        with open(self.homewareFile, 'w') as f:
            json.dump(self.homewareData, f)
        with open(self.secureFile, 'w') as f:
            json.dump(self.secureData, f)

    def refresh(self):
        with open(self.homewareFile, 'r') as f:
            self.homewareData = json.load(f)
        with open(self.secureFile, 'r') as f:
            self.secureData = json.load(f)

# DEVICES

    def getDevices(self):
        with open(self.homewareFile, 'w') as f:
            json.dump(self.homewareData, f)
        return self.homewareData['devices']

    def updateDevice(self, incommingData):
        deviceID = incommingData['devices']['id']
        temp_devices = [];
        for device in self.homewareData['devices']:
            if device['id'] == deviceID:
                temp_devices.append(incommingData['devices'])
            else:
                temp_devices.append(device)
        self.homewareData['devices'] = temp_devices
        self.save()

    def createDevice(self, incommingData):
        deviceID = incommingData['devices']['id']
        self.homewareData['devices'].append(incommingData['devices'])
        self.homewareData['status'][deviceID] = {}
        self.homewareData['status'][deviceID] = incommingData['status']
        self.save()

    def deleteDevice(self, value):
        temp_devices = [];
        for device in self.homewareData['devices']:
            if device['id'] != value:
                temp_devices.append(device)
        self.homewareData['devices'] = temp_devices
        # Delete status
        status = self.homewareData['status']
        del status[value]
        self.homewareData['status'] = status
        self.save()

# RULES

    def getRules(self):
        with open(self.homewareFile, 'w') as f:
            json.dump(self.homewareData, f)
        return self.homewareData['rules']

    def updateRule(self, incommingData):
        self.homewareData['rules'][int(incommingData['id'])] = incommingData['rule']
        self.save()

    def createRule(self, incommingData):
        self.homewareData['rules'].append(incommingData['rule'])
        self.save()

    def deleteRule(self, value):
        temp_rules = self.homewareData['rules']
        del temp_rules[int(value)]
        self.homewareData['rules'] = temp_rules
        self.save()

# STATUS

    def getStatus(self):
        with open(self.homewareFile, 'w') as f:
            json.dump(self.homewareData, f)
        return self.homewareData['status']

    def updateParamStatus(self, device, param, value):
        self.homewareData['status'][device][param] = value
        self.save()

# SECURE

    def getSecure(self):
        data = {
            "google": {
                "client_id": self.secureData['token']["google"]["client_id"],
                "client_secret": self.secureData['token']["google"]["client_secret"],
            },
            "ddns": self.secureData['ddns'],
            "apikey": self.secureData['token']['apikey']
        }
        return data

    def updateSecure(self, incommingData):
        self.secureData['token']["google"]["client_id"] = incommingData['google']['client_id']
        self.secureData['token']["google"]["client_secret"] = incommingData['google']['client_secret']
        self.secureData['ddns']['username'] = incommingData['ddns']['username']
        self.secureData['ddns']['password'] = incommingData['ddns']['password']
        self.secureData['ddns']['provider'] = incommingData['ddns']['provider']
        self.secureData['ddns']['hostname'] = incommingData['ddns']['hostname']
        self.secureData['ddns']['enabled'] = incommingData['ddns']['enabled']
        self.save()

    def getToken(self,agent):
        return self.secureData['token'][agent]

    def updateToken(self,agent,type,value,timestamp):
        self.secureData['token'][agent][type]['value'] = value
        self.secureData['token'][agent][type]['timestamp'] = timestamp
        self.save()

    def setUser(self, incommingData):
        if self.secureData['user'] == '':
            data = {}
            key = Fernet.generate_key()
            self.secureData['key'] = str(key)
            cipher_suite = Fernet(key)
            ciphered_text = cipher_suite.encrypt(str.encode(incommingData['pass']))   #required to be bytes
            self.secureData['user'] = incommingData['user']
            self.secureData['pass'] = str(ciphered_text)
            self.save()
            return 'Saved correctly!'
        else:
            return 'Your user has beed set in the past'

    def setDomain(self, value):
        self.secureData['domain'] = value
        self.secureData['ddns']['hostname'] = value
        self.save()

    def getDDNS(self):
        return self.secureData['ddns']

    def updateDDNS(self, ip, status, code, enabled, last):
        self.secureData['ddns']['ip'] = ip
        self.secureData['ddns']['status'] = status
        self.secureData['ddns']['code'] = code
        self.secureData['ddns']['enabled'] = enabled
        self.secureData['ddns']['last'] = last
        self.save()

    def generateAPIKey(self):
        chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        token = ''
        i = 0
        while i < 40:
            token += random.choice(chars)
            i += 1
        self.secureData['token']['apikey'] = token
        self.save()
        return token

# LOGIN

    def login(self, headers):
        user = headers['user']
        password = headers['pass']


        cipher_suite = Fernet(str.encode(self.secureData['key'][2:len(self.secureData['key'])]))
        plain_text = cipher_suite.decrypt(str.encode(self.secureData['pass'][2:len(self.secureData['pass'])]))
        responseData = {}
        if user == self.secureData['user'] and plain_text == str.encode(password):
            #Generate the token
            chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            token = ''
            i = 0
            while i < 40:
                token += random.choice(chars)
                i += 1
            #Saved the new token
            self.secureData['token']['front'] = token
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
        if user == self.secureData['user'] and token == self.secureData['token']['front']:
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

        cipher_suite = Fernet(str.encode(self.secureData['key'][2:len(self.secureData['key'])]))
        plain_text = cipher_suite.decrypt(str.encode(self.secureData['pass'][2:len(self.secureData['pass'])]))
        responseData = {}
        if user == self.secureData['user'] and plain_text == str.encode(password):
            return responseURL
        else:
            return "fail"
