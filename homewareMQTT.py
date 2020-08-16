import requests
import json
import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
from data import Data

#Init the data managment object
hData = Data()

#Constants
TOPICS = ["device/control", "homeware/alive"]

########################### MQTT reader ###########################

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    # Suscribe to topics
    for topic in TOPICS:
        client.subscribe(topic)

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

    if msg.topic in TOPICS:
        if msg.topic == "device/control":
            payload = json.loads(msg.payload)
            control(payload)
        elif msg.topic == "homeware/alive":
            hData.updateAlive('mqtt')
    else:
        hData.log('Warning', 'Received a message from a extrange MQTT topic')

# MQTT reader
def mqttReader():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    # Try to get username and password
    try:
        mqttData = hData.getMQTT()
        if not mqttData['user'] == "":
            client.username_pw_set(mqttData['user'], mqttData['password'])
    except:
        print('MQTT credentials free')

    client.connect("localhost", 1883, 60)
    client.loop_forever()

def control(payload):
    id = payload['id']
    param = payload['param']
    value = payload['value']
    intent = payload['intent']

    # Analyze the message
    if intent == 'execute':
        hData.updateParamStatus(id,param,value)
        # publish.single("device/"+id, hData.getStatus()[id], hostname="localhost")
    elif intent == 'rules':
        hData.updateParamStatus(id,param,value)
    elif intent == 'request':
        publish.single("device/"+id, json.dumps(hData.getStatus()[id]), hostname="localhost")



if __name__ == "__main__":
    hData.log('Log', 'Starting HomewareMQTT core')
    mqttReader()
