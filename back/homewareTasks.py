from ipaddress import ip_address
import time
from datetime import datetime
import json
import hostname
import paho.mqtt.publish as publish
import requests
from base64 import b64encode
from data import Data

#Init the data managment object
data_conector = Data()

def verifyTasks():
	tasks = data_conector.getTasks()
	status = data_conector.getStatus()

	for taskData in tasks:
		triggers = taskData['triggers']
		try:
			execution_value = operationExecutor('trigger', triggers, status)
			if execution_value:
				for target in taskData['target']:
					value = target['value']
					if target['value'] == 'true': value = True
					elif target['value'] == 'false': value = False
					elif target['param'] == 'color': value = {"spectrumRGB": value, "spectrumRgb": value}
					data_conector.updateParamStatus(target['device'], target['param'], value)


		except Exception as e:
			data_conector.log('Alert', 'Catch an error in execution of ' + taskData['title'] + 'task' + str(e))

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
						data_conector.updateDDNS(newIP, status[code], code, False, last)
					else:
						data_conector.updateDDNS(newIP, status[code], code, True, last)
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
						data_conector.updateDDNS(newIP, code, code, True, last)
					else:
						data_conector.updateDDNS(newIP, code, code, False, last)

def operationExecutor(id, triggers, status):
	operation = triggers[str(id)]
	if operation['type'] == "d2b":
		return d2bExecutor(operation['operation'], status)
	elif operation['type'] == "d2d":
		return d2dExecutor(operation['operation'], status)
	elif operation['type'] == "d2i":
		return d2iExecutor(operation['operation'], status)
	elif operation['type'] == "d2l":
		return d2lExecutor(operation['operation'], status)
	elif operation['type'] == "time":
		return timeExecutor(operation['operation'])
	elif operation['type'] == "or":
		return orExecutor(operation['operation'], triggers, status)
	elif operation['type'] == "and":
		return andExecutor(operation['operation'], triggers, status)

def orExecutor(ids, triggers, status):
	execution_values = []
	for id in ids:
		execution_values.append(operationExecutor(id, triggers, status))
	return any(execution_values)

def andExecutor(ids, triggers, status):
	execution_values = []
	for id in ids:
		execution_values.append(operationExecutor(id, triggers, status))
	return all(execution_values)

def d2bExecutor(operation, status):
	op = operation.split(':')
	device = op[0]
	param = op[1]
	sign = op[2]
	value = op[3] == "true"
	if sign == '=' and status[device][param] == value:
		return True
	else:
		return False

def d2iExecutor(operation, status):
	op = operation.split(':')
	device = op[0]
	param = op[1]
	sign = op[2]
	value = 0
	try:
		value = int(op[3])
	except:
		data_conector.log('Alert', device + param + value + 'is not an int')

	if sign == '=' and status[device][param] == value:
		return True
	elif sign == '<' and status[device][param] < value:
		return True
	elif sign == '>' and status[device][param] > value:
		return True
	elif sign == '<=' and status[device][param] <= value:
		return True
	elif sign == '>=' and status[device][param] >= value:
		return True
	else:
		return False

def d2lExecutor(operation, status):
	op = operation.split(':')
	device = op[0]
	param = op[1]
	sign = op[2]
	value = ""

	try:
		value = str(op[3])
	except:
		data_conector.log('Alert', device + param + value + 'is not an string')

	if sign == '=' and status[device][param] == value:
		return True
	elif sign == '<' and status[device][param] < value:
		return True
	elif sign == '>' and status[device][param] > value:
		return True
	elif sign == '<=' and status[device][param] <= value:
		return True
	elif sign == '>=' and status[device][param] >= value:
		return True
	else:
		return False

def d2dExecutor(operation, status):
	op = operation.split(':')
	device_a = op[0]
	param_a = op[1]
	sign = op[2]
	device_b = op[3]
	param_b = op[4]

	if sign == '=' and status[device_a][param_a] == status[device_b][param_b]:
		return True
	elif sign == '<' and status[device_a][param_a] < status[device_b][param_b]:
		return True
	elif sign == '>' and status[device_a][param_a] > status[device_b][param_b]:
		return True
	elif sign == '<=' and status[device_a][param_a] <= status[device_b][param_b]:
		return True
	elif sign == '>=' and status[device_a][param_a] >= status[device_b][param_b]:
		return True
	else:
		return False

def timeExecutor(operation):
	op = operation.split(':')
	h_op = int(op[0])
	m_op = int(op[1])
	w_op = op[2]
	ts = time.localtime(time.time())
	h = ts.tm_hour
	m = ts.tm_min
	pw = ts.tm_wday
	week = [1,2,3,4,5,6,0]
	w = str(week[pw])

	if h == h_op and m == m_op and w in w_op:
		return True
	else:
		return False

def syncDevicesStatus():
	if data_conector.getSyncDevices():
		devices = data_conector.getStatus()
		for device in devices.keys():
			try:
				mqttData = data_conector.getMQTT()
				if not mqttData['user'] == "":
					publish.single("device/" + device, json.dumps(devices[device]), hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})
				else:
					publish.single("device/" + device, json.dumps(devices[device]), hostname=hostname.MQTT_HOST)

			except:
				data_conector.log('Warning','Param update not sent through MQTT')
			for param in devices[device].keys():
				try:
					mqttData = data_conector.getMQTT()
					if not mqttData['user'] == "":
						publish.single("device/" + device + '/'+param, str(devices[device][param]), hostname=hostname.MQTT_HOST, auth={'username':mqttData['user'], 'password': mqttData['password']})
					else:
						publish.single("device/" + device + '/'+param, str(devices[device][param]), hostname=hostname.MQTT_HOST)

				except:
					data_conector.log('Warning','Param update not sent through MQTT')

def clearLogFile():
	# Delete at 00:00
	now = datetime.now()
	hour = now.hour
	minute = now.minute
	if hour == 0 and minute == 0:
		data_conector.deleteLog()

if __name__ == "__main__":
	data_conector.log('Log', 'Starting HomewareTask core')
	while(True):
		ddnsUpdater()
		verifyTasks()
		syncDevicesStatus()
		clearLogFile()
		data_conector.updateAlive('tasks')
		time.sleep(1)
