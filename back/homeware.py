import os
from flask import Flask, request, render_template, redirect, send_file, url_for, Response
from flask_cors import CORS
import requests
from base64 import b64encode
import json
import time
from datetime import datetime
import random
import paho.mqtt.publish as publish
import subprocess

from data import Data
from commands import Commands

# Constants
UPLOAD_FOLDER = '../'
ALLOWED_EXTENSIONS = {'json'}
FOUR_O_ONE = {
	'error': 'Bad authentication',
	'code': 401,
	'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api-docs.html'
}
FOUR_O_FOUR = {
	'error': 'Not found',
	'code': 404,
	'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api-docs.html'
}
FOUR_O_O = {
	'error': 'Operation not supported',
	'code': 400,
	'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api-docs.html'
}
TWO_O_O = {
	'status': 'Success',
	'code': 200
}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#Global variables
responseURL = ''

#Init the data managment object
data_conector = Data()

#Init command executor
commands = Commands(data_conector)

#app
def runapp():
	app.run(host='0.0.0.0', port=5001, debug=True)

########################### API ###########################
@app.route('/test')
@app.route('/test/')
def test():
	return 'Load'

#API

def checkAccessLevel(headers):

	accessLevel = 0
	try:
		authorization = headers['authorization'].split(' ')[1]
		savedToken = data_conector.getToken('front')
		savedAPIKey = data_conector.getToken('apikey')
		if authorization == savedAPIKey:
			accessLevel = 10
		elif authorization == savedToken:
			accessLevel = 100
	except:
		accessLevel = 0

	return accessLevel

@app.route("/api/devices/<operation>", methods=['GET', 'POST'])
@app.route("/api/devices/<operation>/", methods=['GET', 'POST'])
@app.route("/api/devices/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/devices/<operation>/<value>/", methods=['GET', 'POST'])
def apiDevices(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 10:
		if operation == 'update':
			incommingData = request.get_json()
			if data_conector.updateDevice(incommingData):
				responseData = TWO_O_O
			else:
				responseData = FOUR_O_FOUR
		elif operation == 'create':
			incommingData = request.get_json()
			data_conector.createDevice(incommingData)
			responseData = TWO_O_O
		elif operation == 'delete':
			if data_conector.deleteDevice(value):
				responseData = TWO_O_O
			else:
				responseData = FOUR_O_FOUR
		elif operation == 'get':
			if not value == '':
				found = False
				for device in data_conector.getDevices():
					if device['id'] == value:
						responseData = device
						found = True
						break
				if not found:
					responseData = FOUR_O_FOUR
			else:
				responseData = data_conector.getDevices()
		else:
			responseData = FOUR_O_ONE
	else:
		data_conector.log('Alert', 'Request to api/devices with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/status/<operation>", methods=['GET', 'POST'])
@app.route("/api/status/<operation>/", methods=['GET', 'POST'])
@app.route("/api/status/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/status/<operation>/<value>/", methods=['GET', 'POST'])
def apiStatus(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 10:
		if operation == 'update':
			incommingData = request.get_json()
			if data_conector.updateParamStatus(incommingData['id'],incommingData['param'],incommingData['value']):
				responseData = TWO_O_O
			else:
				responseData = FOUR_O_FOUR
		elif operation == 'get':
			status = data_conector.getStatus()
			if not value == '':
				if value in status:
					responseData = status[value]
				else:
					responseData = FOUR_O_FOUR
			else:
				responseData = status
		else:
			responseData = FOUR_O_O
	else:
		data_conector.log('Alert', 'Request to API > status endpoint with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/tasks/<operation>", methods=['GET', 'POST'])
@app.route("/api/tasks/<operation>/", methods=['GET', 'POST'])
@app.route("/api/tasks/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/tasks/<operation>/<value>/", methods=['GET', 'POST'])
def apiTasks(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 10:
		if operation == 'update':
			incommingData = request.get_json()
			if data_conector.updateTask(incommingData):
				responseData = TWO_O_O
			else:
				responseData = FOUR_O_FOUR
		elif operation == 'create':
			incommingData = request.get_json()
			data_conector.createTask(incommingData['task'])
			responseData = TWO_O_O
		elif operation == 'delete':
			if data_conector.deleteTask(int(value)):
				responseData = TWO_O_O
			else:
				responseData = FOUR_O_FOUR
		elif operation == 'get':
			tasks = data_conector.getTasks()
			try:
				if not value == '':
					if 0 <= int(value) < len(tasks):
						responseData = tasks[int(value)]
					else:
						responseData = FOUR_O_FOUR
				else:
					responseData = tasks
			except:
				responseData = {
					'error': 'Invalid task ID, it must be a integer',
					'code': 400,
					'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api/'
				}
	else:
		data_conector.log('Alert', 'Request to API > task endpoint with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/global/<operation>", methods=['GET', 'POST'])
@app.route("/api/global/<operation>/", methods=['GET', 'POST'])
@app.route("/api/global/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/global/<operation>/<value>/", methods=['GET', 'POST'])
def apiGlobal(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 10:
		if operation == 'version':
			responseData = data_conector.getVersion()
		elif operation == 'get':
			responseData = data_conector.getGlobal()
		else:
			responseData = FOUR_O_O
	else:
		data_conector.log('Alert', 'Request to API > global endpoint with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/user/<operation>", methods=['GET', 'POST'])
@app.route("/api/user/<operation>/", methods=['GET', 'POST'])
@app.route("/api/user/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/user/<operation>/<value>/", methods=['GET', 'POST'])
def apiUser(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 10:
		if operation == 'password':
			return data_conector.updatePassword(request.get_json())
	elif accessLevel >= 0:
		if operation == 'set':
			return data_conector.setUser(request.get_json())
		elif operation == 'login':
			responseData = data_conector.login(request.headers)
		elif operation == 'validateToken':
			responseData = data_conector.validateUserToken(request.headers)
		elif operation == 'googleSync':
			return data_conector.googleSync(request.headers, responseURL)
		else:
			responseData = FOUR_O_O
	else:
		data_conector.log('Alert', 'Request to API > user endpoint with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/access/<operation>", methods=['GET', 'POST'])
@app.route("/api/access/<operation>/", methods=['GET', 'POST'])
@app.route("/api/access/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/access/<operation>/<value>/", methods=['GET', 'POST'])
def apiAccess(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 100:
		if operation == 'create':
			data_conector.log('Warning', 'An API Key has been regenerated')
			responseData = data_conector.generateAPIKey()
		elif operation == 'get':
			responseData = data_conector.getAPIKey()
	else:
		data_conector.log('Alert', 'Request to API > access endpoint.')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/settings/<operation>", methods=['GET', 'POST'])
@app.route("/api/settings/<operation>/", methods=['GET', 'POST'])
@app.route("/api/settings/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/settings/<operation>/<value>/", methods=['GET', 'POST'])
def apiSettings(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 100:
		if operation == 'update':
			incommingData = request.get_json()
			data_conector.updateSettings(incommingData)
			responseData = data_conector.getSettings()
		elif operation == 'get':
			responseData = data_conector.getSettings()
		else:
			data_conector.log('Alert', 'Request to API > settings endpoint with bad authentication')
			responseData = FOUR_O_O
	elif accessLevel >= 0:
		if not data_conector.getAssistantDone():
			if operation == 'domain':
				if value == '':
					responseData = {
						'error': 'A domain must be given',
						'code': 400,
						'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api/'
					}
				else:
					return data_conector.setDomain(value)
			elif operation == 'setAssistantDone':
				data_conector.setAssistantDone()
				responseData = TWO_O_O
		else:
			data_conector.log('Alert', 'Request to API > assistant endpoint. The assistant was configured in the past')
			responseData = {
				'error': 'The assistant was configured in the past',
				'code': 401,
				'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api/'
			}
	else:
		data_conector.log('Alert', 'Request to API > assistant endpoint. The assistant was configured in the past')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/system/<operation>", methods=['GET', 'POST'])
@app.route("/api/system/<operation>/", methods=['GET', 'POST'])
@app.route("/api/system/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/system/<operation>/<value>/", methods=['GET', 'POST'])
def apiSystem(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 100:
		if operation == 'upgrade':
			subprocess.run(["sudo", "sh", "../bash/update.sh"],  stdout=subprocess.PIPE)
			responseData = TWO_O_O
		elif operation == 'status':

			# Try to get username and password
			try:
				mqttData = data_conector.getMQTT()
				if not mqttData['user'] == "":
					client.username_pw_set(mqttData['user'], mqttData['password'])
					publish.single("homeware/alive", "all", hostname="localhost", auth={'username':mqttData['user'], 'password': mqttData['password']})
				else:
					publish.single("homeware/alive", "all", hostname="localhost")
			except:
				publish.single("homeware/alive", "all", hostname="localhost")

			responseData = {
				'api': {
					'enable': True,
					'status': 'Running',
					'title': 'Homeware API'
				},
				'mqtt': {
					'enable': True,
					'status': 'Stopped',
					'title': 'Homeware MQTT'
				},
				'tasks': {
					'enable': True,
					'status': 'Stopped',
					'title': 'Homeware Task'
				},
				'redis': data_conector.redisStatus()
			}

			try:
				ts = int(time.time())
				alive = data_conector.getAlive()
				if (ts - int(alive['mqtt'])) < 10:
					responseData['mqtt']['status'] = "Running"
				if (ts - int(alive['tasks'])) < 10:
					responseData['tasks']['status'] = "Running"
			except:
				print("homewareMQTT stopped")
		elif operation == 'restart':
			subprocess.run(["sudo", "sh", "../bash/restart.sh"],  stdout=subprocess.PIPE)
			responseData = TWO_O_O
		elif operation == 'reboot':
			subprocess.run(["sudo", "reboot"],  stdout=subprocess.PIPE)
			responseData = TWO_O_O
		elif operation == 'shutdown':
			subprocess.run(["sudo", "poweroff"],  stdout=subprocess.PIPE)
			responseData = TWO_O_O
		else:
			responseData = FOUR_O_O
	else:
		data_conector.log('Alert', 'Request to API > system endpoint with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response

@app.route("/api/log/<operation>", methods=['GET', 'POST'])
@app.route("/api/log/<operation>/", methods=['GET', 'POST'])
@app.route("/api/log/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/log/<operation>/<value>/", methods=['GET', 'POST'])
def apiLog(operation = "", value = ''):

	accessLevel = checkAccessLevel(request.headers)

	if accessLevel >= 100:
		if operation == 'get':
			responseData = data_conector.getLog()
		elif operation == 'alert':
			responseData = data_conector.isThereAnAlert()
		else:
			responseData = FOUR_O_O
	else:
		data_conector.log('Alert', 'Request to API > log endpoint with bad authentication')
		responseData = FOUR_O_ONE

	response = app.response_class(
		response=json.dumps(responseData),
		status=200,
		mimetype='application/json'
	)
	return response


def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#Files operation
@app.route("/files/<operation>/<file>/<token>/", methods=['GET','POST'])
def files(operation = '', file = '', token = ''):
	#Get the access_token
	frontToken = data_conector.getToken('front')
	if token == frontToken:
		if operation == 'buckup':
			# Create file
			data_conector.createFile('homeware')
			# Download file
			now = datetime.now()
			date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
			result = send_file('../' + file + '.json',
			   mimetype = "application/json", # use appropriate type based on file
			   attachment_filename = file + '_' + str(date_time) + '.json',
			   as_attachment = True,
			   conditional = False)
			data_conector.log('Warning', 'A backup file has been downloaded')
			return result
		elif operation == 'restore':
			if request.method == 'POST':
				if 'file' not in request.files:
					return redirect('/backup/?status=No file selected')
				file = request.files['file']
				if file.filename == '':
					return redirect('/backup/?status=Incorrect file name')
				if file and allowed_file(file.filename):
					filename = file.filename
					file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
					subprocess.run(["mv", '../' + file.filename, "../homeware.json"],  stdout=subprocess.PIPE)
					data_conector.load()
					data_conector.log('Warning', 'A backup file has been restored')
					return redirect('/backup/?status=Success')
		elif operation == 'download':
			if file == "log":
				# Download file
				now = datetime.now()
				date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
				result = send_file('../' + 'homeware.log',
				   mimetype = "text/plain", # use appropriate type based on file
				   attachment_filename = 'homeware_' + str(date_time) + '.log',
				   as_attachment = True,
				   conditional = False)
				data_conector.log('Warning', 'The log file has been downloaded')
				return result
		elif operation == 'upload':
			if file == "google":
				if request.method == 'POST':
					if 'file' not in request.files:
						return redirect('/settings/?status=No file selected')
					file = request.files['file']
					if file.filename == '':
						return redirect('/settings/?status=Incorrect file name')
					if file and allowed_file(file.filename):
						filename = file.filename
						file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
						subprocess.run(["mv", '../' + file.filename, "../google.json"],  stdout=subprocess.PIPE)
						data_conector.log('Info', 'A google auth file has been uploaded')
						data_conector.updateLinked(True)
						return redirect('/settings/?status=Success')
		else:
			return 'Operation unknown'
	else:
		data_conector.log('Alert', 'Unauthorized access try to the backup and restore endpoint')
		return 'Bad token'

def tokenGenerator(agent, type):
	#Generate the token
	chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	token = ''
	i = 0
	while i < 40:
		token += random.choice(chars)
		i += 1

	#Verify special agents
	if '+http://www.google.com/bot.html' in agent:
		agent = 'google';
	elif agent == 'OpenAuth':
		agent = 'google';

	#Save the token
	ts = int(time.time()*1000)
	#data = readToken()
	legalTypes = ['access_token', 'authorization_code', 'refresh_token']

	if type in legalTypes:
		data_conector.updateToken(agent,type,token,ts)
		return token
	else:
		data_conector.log('Warning', 'Try to create an incorrect type of token')
		return 'Something goes wrong'

#Auth endpoint
@app.route("/auth")
@app.route("/auth/")
def auth():
	token = data_conector.getToken('google')               #Tokens from the DDBB
	clientId = request.args.get('client_id')    #ClientId from the client
	responseURI = request.args.get('redirect_uri')
	state = request.args.get('state')
	if clientId == token['client_id']:
		data_conector.log('Warning', 'A new Google account has been linked from auth endpoint')
		#Create a new authorization_code
		code = tokenGenerator('google', 'authorization_code')
		#Compose the response URL
		global responseURL
		responseURL = responseURI + '?code=' + str(code) + '&state=' +  state
		return redirect("/login/google/", code=302)
		# return '<a href="' + responseURL + '">enlace</a>'
	else:
		data_conector.log('Alert', 'Unauthorized try to link a Google Account. Verify the client id and client secret')
		return 'Algo ha ido mal en la autorización'

#Token's endpoint
@app.route('/token', methods = ['GET', 'POST'])
@app.route('/token/', methods = ['GET', 'POST'])
def token():

	agent = request.headers['User-Agent']
	#Verify special agents
	if '+http://www.google.com/bot.html' in agent:
		agent = 'google';
	elif agent == 'OpenAuth':
		agent = 'google';

	grantType = request.form.get('grant_type')
	client_id = request.form.get('client_id')
	client_secret = request.form.get('client_secret')
	code = ''
	if grantType == 'authorization_code':
		code = request.form.get('code')
	else:
		code = request.form.get('refresh_token')


	#Get the tokens and ids from DDBB
	token = data_conector.getToken(agent)
	obj = {}
	#Verify the code
	if code == token[grantType]['value']:
		#Tokens lifetime
		secondsInDay = 86400;
		#Create a new token
		access_token = tokenGenerator(agent, 'access_token')
		#Compose the response JSON
		obj['token_type'] = 'bearer'
		obj['expires_in'] = secondsInDay
		if grantType == 'authorization_code':
			#Create a new token
			refresh_token = tokenGenerator(agent, 'refresh_token')
			obj['access_token'] = access_token
			obj['refresh_token'] = refresh_token
		elif grantType == 'refresh_token':
			obj['access_token'] = access_token
			obj['refresh_token'] = code

		#Response back
		response = app.response_class(
			response=json.dumps(obj),
			status=200,
			mimetype='application/json'
		)
		data_conector.log('Warning', 'New token has been created for ' + agent)
		return response
	else:
		#Response back
		obj['error'] = 'invalid_grant'
		response = app.response_class(
			response=json.dumps(obj),
			status=200,
			mimetype='application/json'
		)
		data_conector.log('Alert', 'Unauthorized token request. The new token hasn\'t been sent.')
		return response

#Google's endpoint
@app.route("/smarthome", methods=['POST'])
@app.route("/smarthome/", methods=['POST'])
def smarthome():
	#Get all data
	body = request.json
	#Get the agent
	agent = request.headers['User-Agent']
	#Verify special agents
	if '+http://www.google.com/bot.html' in agent:
		agent = 'google';
	elif agent == 'OpenAuth':
		agent = 'google';
	#Get the access_token
	tokenClient = request.headers['authorization'].split(' ')[1]
	token = data_conector.getToken(agent)
	if tokenClient == token['access_token']['value']:
		#Anlalyze the inputs
		inputs = body['inputs']
		requestId = body['requestId']
		for input in inputs:
			if input['intent'] == 'action.devices.SYNC':
				obj = {
					'requestId': requestId,
					'payload': {
						'agentUserId': data_conector.getDDNS()['hostname'],
						'devices': data_conector.getDevices()
					}
				}
				response = app.response_class(
					response=json.dumps(obj),
					status=200,
					mimetype='application/json'
				)
				data_conector.log('Log', 'Sync request by ' + agent + ' with ' + obj['payload']['agentUserId'] + ' as agent user id')
				data_conector.updateLinked(True)
				return response
			elif input['intent'] == 'action.devices.QUERY':
				obj = {
					'requestId': requestId,
					'payload': {
						'devices': data_conector.getStatus()
					}
				}
				response = app.response_class(
					response=json.dumps(obj),
					status=200,
					mimetype='application/json'
				)
				data_conector.log('Log', 'Query request by ' + agent)
				return response
			elif input['intent'] == 'action.devices.EXECUTE':
				#Response
				obj = {
					'requestId': requestId,
					'payload': {
						'commands': []
					}
				}
				#Analize commands for all devices
				for command in input['payload']['commands']:
					devices = command['devices']
					executions = command['execution']
					ids =  []
					for device in devices:
						deviceId = device['id']
						ids.append(deviceId)
						params = executions[0]['params']
						command = executions[0]['command'].split('.')[3]
						# evaluate the command
						commands.setParams(deviceId, params)
						eval('commands.'+command+'()')

					command_response = {
						'ids': ids,
						'states': data_conector.getStatus(),
						'status': 'SUCCESS',
					}
					obj['payload']['commands'].append(command_response)

				response = app.response_class(
					response=json.dumps(obj),
					status=200,
					mimetype='application/json'
				)
				# data_conector.log('Log', 'Execute request by ' + agent)
				return response
			elif input['intent'] == 'action.devices.DISCONNECT':
				data_conector.log('Log', 'Disconnect request by ' + agent)
				data_conector.updateLinked(False)
				return 'Ok'

			else:
				data_conector.log('Log', 'Unknown request by ' + agent)
	else:
		data_conector.log('Alert', 'Unauthorized request from ' + agent + '. Maybe the token has expired.')
		return "A"

#Clock endpoint
@app.route("/api/clock")
@app.route("/api/clock/")
def clock():
	ts = time.localtime(time.time())
	h = ts.tm_hour
	m = ts.tm_min
	return str(h) + ":" + str(m)

@app.errorhandler(404)
def page_not_found(error):
	return "404 error"

@app.errorhandler(500)
def page_not_found(error):
	return "500 error"

if __name__ == "__main__":
	runapp()
