import requests
import json
import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt

########################### MQTT reader ###########################

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("device/control")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    #Get the data
    payload = json.loads(msg.payload)
    id = payload['id']
    param = payload['param']
    value = payload['value']
    intent = payload['intent']


    if intent == 'execute':
        headers = {'content-type': 'application/json'}
        with open('secure.json', 'r') as f:
            headers['Authorization'] = 'baerer ' + json.load(f)['token']['front']
        data = {
            'id': payload['id'],
            'param': payload['param'],
            'value': payload['value'],
        }
        requests.post(url='http://127.0.0.1:5001/api/status/update/', data=json.dumps(data), headers=headers)

        with open('homeware.json', 'r') as f:
            publish.single("device/"+id, json.dumps(json.load(f)['status'][id]), hostname="localhost")
    elif intent == 'rules':
        print('In rules')
        headers = {'content-type': 'application/json'}
        with open('secure.json', 'r') as f:
            headers['Authorization'] = 'baerer ' + json.load(f)['token']['front']
        data = {
            'id': payload['id'],
            'param': payload['param'],
            'value': payload['value'],
        }
        requests.post(url='http://127.0.0.1:5001/api/status/update/', data=json.dumps(data), headers=headers)
        requests.get(url='http://127.0.0.1:5001/cron/')
        print('Out rules')
    elif intent == 'request':
        with open('homeware.json', 'r') as f:
            publish.single("device/"+id, json.dumps(json.load(f)['status'][id]), hostname="localhost")

# MQTT reader
def mqttReader():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect("192.168.1.5", 1883, 60)
    client.loop_forever()

if __name__ == "__main__":
    print("Starting HomewareMQTT core")
    mqttReader()
