import json
import paho.mqtt.client as mqtt
from data import Data
import hostname

#Init the data managment object
data_conector = Data()
client = mqtt.mqtt.Client(
	mqtt.CallbackAPIVersion.VERSION2,
	client_id="homewareMQTT",
	protocol=mqtt.MQTTv5
)

#Constants
TOPICS = ["device/control", "homeware/alive"]

########################### MQTT reader ###########################

def connectMQTT():
	mqttData = data_conector.getMQTT()
	client.username_pw_set(mqttData['user'], mqttData['password'])
	client.connect(hostname.MQTT_HOST, hostname.MQTT_PORT, 60)
	data_conector.log('Log', 'MQTT reconnected')

def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))
	# Suscribe to topics
	for topic in TOPICS:
		client.subscribe(topic)

def on_message(client, userdata, msg):
	if msg.topic in TOPICS:
		if msg.topic == "device/control":
			payload = json.loads(msg.payload)
			control(client, payload)
		elif msg.topic == "homeware/alive":
			data_conector.updateAlive('mqtt')
	else:
		data_conector.log('Warning', 'Received a message from a extrange MQTT topic')

def on_disconnect(client, userdata, rc):
	if rc != 0:
		data_conector.log('Warning', 'MQTT disconnected. Trying to reconnect...')
		try:
			connectMQTT()
		except Exception as e:
			data_conector.log('Warning', 'MQTT reconnection failed: ' + str(e))

def control(client, payload):
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
		client.publish("device/"+id, json.dumps(status))
		for param in status.keys():
			client.publish("device/"+id+'/'+param, str(status[param]))

if __name__ == "__main__":
	data_conector.log('Log', 'Starting HomewareMQTT core')

	client.on_connect = on_connect
	client.on_message = on_message
	client.on_disconnect = on_disconnect

	connectMQTT()

	client.loop_forever()
