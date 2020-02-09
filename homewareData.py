import json

def readJSON():
    with open('homeware.json', 'r') as f:
        data = json.load(f)
        return data

def writeJSON(data):
    with open('homeware.json', 'w') as f:
        json.dump(data, f)

def readConfig():
    with open('config.json', 'r') as f:
        data = json.load(f)
        return data

def writeConfig(data):
    with open('config.json', 'w') as f:
        json.dump(data, f)

def readToken():
    with open('token.json', 'r') as f:
        data = json.load(f)
        return data

def writeToken(data):
    with open('token.json', 'w') as f:
        json.dump(data, f)
