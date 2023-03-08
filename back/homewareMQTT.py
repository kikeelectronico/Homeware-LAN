import requests
import json
import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
from data import Data
import hostname

#Init the data managment object
data_conector = Data()

#Constants
TOPICS = ["device/control", "homeware/alive"]

########################### MQTT reader ###########################

def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))
	# Suscribe to topics
	for topic in TOPICS:
		client.subscribe(topic)

def on_message(client, userdata, msg):
	if msg.topic in TOPICS:
		if msg.topic == "device/control":
			payload = json.loads(msg.payload)
			control(payload)
		elif msg.topic == "homeware/alive":
			data_conector.updateAlive('mqtt')
	else:
		data_conector.log('Warning', 'Received a message from a extrange MQTT topic')

# MQTT reader
def mqttReader():
	client = mqtt.Client()
	client.on_connect = on_connect
	client.on_message = on_message

	mqttData = data_conector.getMQTT()
	client.username_pw_set(mqttData['user'], mqttData['password'])

	client.connect(hostname.MQTT_HOST, hostname.MQTT_PORT, 60)
	client.loop_forever()

def control(payload):
	id = payload['id']
	param = payload['param']
	value = payload['value']
	intent = payload['intent']

	# Analyze the message
	if intent == 'execute':
		data_conector.updateParamStatus(id,param,value)
	elif intent == 'rules':
		data_conector.updateParamStatus(id,param,value)
	elif intent == 'request':
		status = data_conector.getStatus()[id]
		mqttData = data_conector.getMQTT()
		publish.single("device/"+id, json.dumps(status), hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})
		for param in status.keys():
			mqttData = data_conector.getMQTT()
			publish.single("device/"+id+'/'+param, str(status[param]), hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})

if __name__ == "__main__":
	data_conector.log('Log', 'Starting HomewareMQTT core')
	mqttReader()
