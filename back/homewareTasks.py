import time
from datetime import datetime
import json
import hostname
import paho.mqtt.publish as publish
import requests
import os

from data import Data
from homeGraph import HomeGraph

#Init the data managment object
data_conector = Data()
homegraph = HomeGraph()
already_run = False
last_status = {}

def ddnsUpdater():
	ddns = data_conector.getDDNS()
	ipServer = 'http://ip1.dynupdate.no-ip.com/'
	if ddns['enabled']:
		ipRequest = requests.get(url=ipServer)
		newIP = ipRequest.text
		ip_bytes = newIP.split(".")
		if len(ip_bytes) == 4 \
			and int(ip_bytes[0]) > 0 and int(ip_bytes[0]) < 255 \
			and int(ip_bytes[1]) > 0 and int(ip_bytes[1]) < 255 \
			and int(ip_bytes[2]) > 0 and int(ip_bytes[2]) < 255 \
			and int(ip_bytes[3]) > 0 and int(ip_bytes[3]) < 255:
			if not newIP == ddns['ip']:

				if ddns['provider'] == 'noip':
					noipServer = 'https://dynupdate.no-ip.com/nic/update'
					params = {
						'hostname': ddns['hostname'],
						'myip': newIP
					}
					user = ddns['username'] + ':' + ddns['password']
					userEncoded = str(b64encode(bytes(user, 'utf-8')))
					headers = {
						'User-Agent': 'Homeware Homeware/v{} hola@rinconingenieril.es'.format(data_conector.getVersion()['version']),
						'Authorization': 'Basic ' + userEncoded[2:len(userEncoded)-1]
					}
					noipRequest = requests.get(url= noipServer, params=params, headers=headers)
					#Analyze the response
					code = noipRequest.text.split(' ')[0]
					data_conector.log('Log', 'IP update request sended to no-ip. Response: ' + noipRequest.text)
					status = {
						'good': 'Running',
						'nochg': 'Running, but the last request shouldn\'t have been done.',
						'nohost': 'Host name does not exists',
						'badauth': 'Invalid username and/or password',
						'badagent': 'Bad agent. Please open an issue on the Homeware-LAN github and do not enable the DDNS funtionality.',
						'!donator': 'Not donator. Please open an issue on the Homeware-LAN github and do not enable the DDNS funtionality.',
						'abuse': 'User blocked due to abuse',
						'911': 'Something goes wrong. Do not enabled until 30 minutes has pass.'
					}
					now = datetime.now()
					last = str(now.strftime("%m/%d/%Y, %H:%M:%S"))
					if not 'good' in code and not 'nochg' in code:
						code = noipRequest.text.split('\r')[0]
						data_conector.updateDDNSstatus(newIP, status[code], code, False, last)
					else:
						data_conector.updateDDNSstatus(newIP, status[code], code, True, last)
				elif ddns['provider'] == 'duckdns':
					duckdnsServer = 'https://www.duckdns.org/update'
					params = {
						'domains': ddns['hostname'].split('.')[0],
						'ip': newIP,
						'token': ddns['password']
					}
					duckDnsRequest = requests.get(url= duckdnsServer, params=params)
					#Analyze the response
					code = duckDnsRequest.text
					data_conector.log('Log', 'IP update request sended to Duck DNS. Response: ' + code)
					now = datetime.now()
					last = str(now.strftime("%m/%d/%Y, %H:%M:%S"))
					if "OK" in code:
						data_conector.updateDDNSstatus(newIP, code, code, True, last)
					else:
						data_conector.updateDDNSstatus(newIP, code, code, False, last)

def syncDevicesStatus():
	if data_conector.getSyncDevices():
		devices = data_conector.getStatus()
		for device in devices.keys():
			mqttData = data_conector.getMQTT()
			publish.single("device/" + device, json.dumps(devices[device]), hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})

			for param in devices[device].keys():
				mqttData = data_conector.getMQTT()
				publish.single("device/" + device + '/'+param, str(devices[device][param]), hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})

def clearLogFile():
	# Delete at 00:00
	now = datetime.now()
	hour = now.hour
	minute = now.minute
	if hour == 0 and minute == 0 and not already_run:
		data_conector.log('Log', 'Cleaning the log')
		data_conector.deleteLog()
		already_run = True
	elif hour == 0 and minute == 1:
		already_run = False

def homewareCoreHearbeat():
	mqttData = data_conector.getMQTT()
	publish.single("homeware/alive", "all", hostname=hostname.MQTT_HOST, auth={'username': mqttData['user'], 'password': mqttData['password']})

def syncGoogleState():
	if pickle.loads(data_conector.getSyncGoogle()):
		if os.path.exists("../files/google.json"):
			status = data_conector.getStatus()
			if not status == last_status:
				try:
					homegraph.reportState(data_conector.getSettings("domain"),status)
				except:
					self.log("Warning", "Unable to communicate with homegraph")
				global last_status
				last_status = status

if __name__ == "__main__":
	data_conector.log('Log', 'Starting HomewareTask core')
	while(True):
		ddnsUpdater()
		syncDevicesStatus()
		clearLogFile()
		homewareCoreHearbeat()
		syncDevicesStatus()
		data_conector.updateAlive('tasks')
		time.sleep(1)
