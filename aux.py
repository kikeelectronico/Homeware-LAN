import json

def readJSON():
    with open('homeware.json', 'r') as f:
        data = json.load(f)
        return data

def writeJSON(data):
    with open('homeware.json', 'w') as f:
        json.dump(data, f)
