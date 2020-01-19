from flask import Flask, request, render_template, redirect
import json
import time
import random
import subprocess
from multiprocessing import Process
from cryptography.fernet import Fernet
import paho.mqtt.publish as publish
from aux import readJSON, writeJSON, readConfig, writeConfig, readToken, writeToken

app = Flask(__name__)

#Global variables
deviceAliveTimeout = 20000

#app
def runapp():
    app.run(host='0.0.0.0', port=5001, debug=True)


########################### APP ###########################

@app.route('/login')
@app.route('/login/')
def login():
    return render_template('panel/login.html')

@app.route('/')
def index():
    try:
        readConfig()
        return render_template('panel/index.html')
    except:
        return redirect("/assistant/", code=302)

@app.route('/devices')
@app.route('/devices/')
@app.route('/devices/<process>/')
@app.route('/devices/<process>/')
@app.route('/devices/<process>/<id>')
@app.route('/devices/<process>/<id>/')
def devices(process = "", id = ""):

    config = readConfig()
    domain = config['domain']

    if process == 'edit':
        if id != '':
            data = readJSON()
            devices = data['devices']
            #Find the device
            device = {}
            for d in devices:
                if id == d['id']:
                    device = d
                    break
            deviceString=json.dumps(device)
            smartConnectionDataString=json.dumps(data['smartConnection'][id])
            return render_template('panel/edit_device.html', deviceString=deviceString, smartConnectionDataString=smartConnectionDataString, deviceID=id)
        else:
            return render_template('panel/edit_device.html', deviceID=id)
    else:
        return render_template('panel/devices.html', domain=domain)

@app.route('/rules')
@app.route('/rules/')
@app.route('/rules/<process>/')
@app.route('/rules/<process>/')
@app.route('/rules/<process>/<int:id>')
@app.route('/rules/<process>/<int:id>/')
def rules(process = "", id = -1):

    config = readConfig()
    domain = config['domain']

    if process == 'edit':
        if id != -1:
            data = readJSON()

            return render_template('panel/edit_rules.html', ruleID=id)
        else:
            return render_template('panel/edit_rules.html', ruleID=id)
    else:
        return render_template('panel/rules.html', domain=domain)

@app.route('/settings')
@app.route('/settings/')
def settings():

    config = readConfig()
    domain = config['domain']

    return render_template('panel/settings.html', domain=domain)

@app.route('/assistant')
@app.route('/assistant/')
@app.route('/assistant/<step>')
@app.route('/assistant/<step>/')
def assistant(step = 'welcome'):

    steps = {
        'welcome': 'user',
        'user': 'domain',
        'domain': 'confignginx',
        'confignginx': 'change2domain',
        'change2domain': 'changed2domain',
        'changed2domain': 'ssl',
        'ssl': 'initialize',
        'initialize': ''
    }

    if step == 'initialize':
        #Try to open the json as a security method
        try:
            with open('homeware.json', 'r') as f:
                data = json.load(f)
                return data
            print('Nothing to do here')
        except:
            #Copy the DDBB template
            subprocess.run(["cp", "configuration_templates/template_homeware.json", "homeware.json"],  stdout=subprocess.PIPE)
            subprocess.run(["cp", "configuration_templates/template_token.json", "token.json"],  stdout=subprocess.PIPE)


    return render_template('assistant/step_' + step + '.html', step=step, next=steps[step])

########################### API ###########################
@app.route('/test')
@app.route('/test/')
def test():
    publish.single("test", "payload", hostname="localhost")
    return 'Load'

#Asistant operations
@app.route('/assistant/operation/<segment>')
@app.route('/assistant/operation/<segment>/')
@app.route('/assistant/operation/<segment>/<value>')
@app.route('/assistant/operation/<segment>/<value>/')
def operation(segment, value=""):
    if segment == 'user':
        try:
            readConfig()
            return 'Your user has beed set in the past'
        except:
            data = {}
            key = Fernet.generate_key()
            data['key'] = str(key)
            cipher_suite = Fernet(key)
            ciphered_text = cipher_suite.encrypt(str.encode(value.split(':')[1]))   #required to be bytes
            data['user'] = value.split(':')[0]
            data['pass'] = str(ciphered_text)
            writeConfig(data)
            return 'Saved correctly!'
    elif segment == 'domain':
        config = readConfig()
        config['domain'] = value
        writeConfig(config)

    return 'Load'

#Front end operations
@app.route("/front/<operation>/")
@app.route("/front/<operation>/<segment>")
@app.route("/front/<operation>/<segment>/")
@app.route("/front/<operation>/<segment>/<value>")
@app.route("/front/<operation>/<segment>/<value>/")
def front(operation, segment = "", value = ''):
    #Log in doesn't require token
    if operation == 'login':
        if segment == 'user':
            config = readConfig()
            user = request.headers['user']
            password = request.headers['pass']

            cipher_suite = Fernet(str.encode(config['key'][2:len(config['key'])]))
            plain_text = cipher_suite.decrypt(str.encode(config['pass'][2:len(config['pass'])]))
            responseData = {}
            if user == config['user'] and plain_text == str.encode(password):
                #Generate the token
                chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                token = ''
                i = 0
                while i < 40:
                    token += random.choice(chars)
                    i += 1
                #Saved the new token
                config = readConfig();
                config['token'] = {
                    'front': token
                }
                writeConfig(config)
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

        elif segment == 'token':
            config = readConfig()
            user = request.headers['user']
            token = request.headers['token']

            if user == config['user'] and token == config['token']['front']:
                responseData = {
                    'status': 'in'
                }
            else:
                responseData = {
                    'status': 'fail'
                }
        response = app.response_class(
            response=json.dumps(responseData),
            status=200,
            mimetype='application/json'
        )
        return response

    #Operations not related with login
    else:
        #Verify the user token
        token = request.headers['authorization'].split(' ')[1]
        savedToken = readConfig()['token']['front'];
        if token == savedToken:
            #Read data
            if operation == 'read':
                data = readJSON()
                #Get the requested data
                if segment != '':
                    for p in segment.split('>'):
                        data = data[p]
                response = app.response_class(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
                return response
            #Save simple data
            #Write data
            elif operation == 'write':
                data = readJSON()
                segments = segment.split('>')
                #Esto es una ñapa, pero ahora mismo no se cómo solucionarlo
                if len(segments) == 1:
                    data[segment] = json.loads(value)
                elif len(segments) == 2:
                    data[segments[0]][segments[1]] = json.loads(value)
                elif len(segments) == 3:
                    data[segments[0]][segments[1]][segments[2]] = json.loads(value)


                response = app.response_class(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
                writeJSON(data)
                return response
            #Special operations
            elif operation == 'device':
                data = readJSON()
                token = readToken()

                if segment == 'update' or segment == 'create':
                    incommingData = json.loads(value)
                    deviceID = incommingData['devices']['id']

                    #Updating device or create device
                    if segment == 'update':
                        temp_devices = [];
                        for device in data['devices']:
                            if device['id'] == incommingData['devices']['id']:
                                temp_devices.append(incommingData['devices'])
                            else:
                                temp_devices.append(device)
                        data['devices'] = temp_devices
                    else:
                        data['devices'].append(incommingData['devices'])

                    #Update alive
                    data['alive'][deviceID] = incommingData['alive']
                    #Update samrtConnection
                    data['smartConnection'][deviceID] = incommingData['smartConnection']
                    #Update status
                    if not deviceID in data['status'].keys():
                        data['status'][deviceID] = {}
                    data['status'][deviceID]['online'] = True
                    #Athorization code
                    code = ''
                    if data['settings']['bools']['autoAuthentication']:
                        code = deviceID + data['settings']['strings']['codeKey']
                    else:
                        code = '-'

                    if segment == 'create':
                        data['token'][deviceID] = {}
                        data['token'][deviceID]['authorization_code'] = {}
                        token[deviceID] = {}
                        token[deviceID]['authorization_code'] = {}
                    token[deviceID]['authorization_code']['value'] = code
                    data['token'][deviceID]['authorization_code'] = {"requestManualAuthorization": False}

                elif segment == 'delete':
                    temp_devices = [];
                    for device in data['devices']:
                        if device['id'] != value:
                            temp_devices.append(device)
                    data['devices'] = temp_devices
                    # Delete status
                    status = data['status']
                    del status[value]
                    data['status'] = status
                    # Delete token
                    #token = data['token']
                    del token[value]
                    #data['token'] = token
                    # Delete alive
                    alive = data['alive']
                    del alive[value]
                    data['alive'] = alive
                    # Delete smartConnection
                    smartConnection = data['smartConnection']
                    del smartConnection[value]
                    data['smartConnection'] = smartConnection

                writeJSON(data)
                writeToken(token)

                response = app.response_class(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
                return response
            #Special operations
            elif operation == 'rule':
                data = readJSON()
                if segment == 'update':
                    incommingData = json.loads(value)
                    data['rules'][int(incommingData['n'])] = incommingData['rule']
                if segment == 'create':
                    incommingData = json.loads(value)
                    data['rules'].append(incommingData['rule'])

                elif segment == 'delete':
                    temp_rules = data['rules']
                    del temp_rules[int(value)]
                    data['rules'] = temp_rules

                writeJSON(data)

                response = app.response_class(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
                return response

        else:
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
    data = readToken()
    legalTypes = ['access_token', 'authorization_code', 'refresh_token']

    if type in legalTypes:
        data[agent][type]['value'] = token
        data[agent][type]['timestamp'] = ts
        writeToken(data)
        return token
    else:
        return 'Something goes wrong'

#Auth endpoint
@app.route("/auth")
@app.route("/auth/")
def auth():
    token = readToken();                #Tokens from the DDBB
    clientId = request.args.get('client_id')    #ClientId from the client
    responseURI = request.args.get('redirect_uri')
    state = request.args.get('state')

    if clientId == token['google']['client_id']:
        #Create a new authorization_code
        code = tokenGenerator('google', 'authorization_code')
        #Compose the response URL
        responseURL = responseURI + '?code=' + str(code) + '&state=' +  state
        #Return the page
        return '<center><h1 style=\"font-size: 6em;\">Homeware LAN</h1><br><a style=\"font-size: 4em;\" class=\"btn btn-primary\" href=\"' + responseURL + '\">Pulsa aquí para enlazar</a></center>'
    else:
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
        if agent == 'google':
            code = request.form.get('code')
        else:
            code = request.args.get('code')
    else:
        if agent == 'google':
            code = request.form.get('refresh_token')
        else:
            code = request.args.get('refresh_token')


    #Get the tokens and ids from DDBB
    data = readJSON()
    token = readToken()
    obj = {}
    #Verify the code
    if code == token[agent][grantType]['value']:
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


        #Clear authorization_code if autoAuthentication is not permited
        if not data['settings']['bools']['autoAuthentication'] or agent == 'google':
            data = readJSON()
            token[agent]['authorization_code']['value'] = random.randrange(1000000000)
            writeJSON(data)


        ## TODO:
        #Create an alert on the status register

        #Response back
        response = app.response_class(
            response=json.dumps(obj),
            status=200,
            mimetype='application/json'
        )
        return response
    else:
        #Response back
        obj['error'] = 'invalid_grant'
        response = app.response_class(
            response=json.dumps(obj),
            status=200,
            mimetype='application/json'
        )
        return response

#Google's endpoint
@app.route("/smarthome", methods=['POST'])
@app.route("/smarthome/", methods=['POST'])
def smarthome():
    #Get all data
    body = request.json
    print(body)
    #Get the agent
    agent = request.headers['User-Agent']
    #Verify special agents
    if '+http://www.google.com/bot.html' in agent:
        agent = 'google';
    elif agent == 'OpenAuth':
        agent = 'google';
    #Get the access_token
    tokenClient = request.headers['authorization'].split(' ')[1]
    data = readJSON()
    token = readToken()
    if tokenClient == token[agent]['access_token']['value']:
        #Anlalyze the inputs
        inputs = body['inputs']
        requestId = body['requestId']
        for input in inputs:
            if input['intent'] == 'action.devices.SYNC':
                print('Intent SYNC')
                obj = {}
                obj['requestId'] = requestId
                obj['payload'] = {}
                obj['payload']['agentUserId'] = '123'
                obj['payload']['devices'] = data['devices']
                response = app.response_class(
                    response=json.dumps(obj),
                    status=200,
                    mimetype='application/json'
                )
                return response
            elif input['intent'] == 'action.devices.QUERY':
                updatestates()
                data = readJSON()
                obj = {}
                obj['requestId'] = requestId
                obj['payload'] = {}
                obj['payload']['devices'] = data['status']
                response = app.response_class(
                    response=json.dumps(obj),
                    status=200,
                    mimetype='application/json'
                )
                return response
            elif input['intent'] == 'action.devices.EXECUTE':
                #Response
                obj = {}
                obj['requestId'] = requestId
                obj['payload'] = {}
                obj['payload']['commands'] = []
                obj['payload']['commands'].append({})
                obj['payload']['commands'][0]['ids'] = []
                obj['payload']['commands'][0]['status'] = 'SUCCESS'
                obj['payload']['commands'][0]['states'] = {}
                #Get ans analyze data
                data = readJSON()
                #Only the first input and the first command
                ## TODO: Check for all the commands
                devices = input['payload']['commands'][0]['devices']
                executions = input['payload']['commands'][0]['execution']
                i = 0
                for device in devices:
                    deviceId = device['id']
                    obj['payload']['commands'][0]['ids'].append(deviceId)
                    deviceParams = executions[i]['params']
                    i += 1
                    deviceParamsKeys = deviceParams.keys()
                    for key in deviceParamsKeys:
                        data['status'][deviceId][key] = deviceParams[key]
                    publish.single("device/"+deviceId, json.dumps(data['status'][deviceId]), hostname="localhost")
                obj['payload']['commands'][0]['states'] = data['status']
                writeJSON(data)

                response = app.response_class(
                    response=json.dumps(obj),
                    status=200,
                    mimetype='application/json'
                )
                return response
            elif input['intent'] == 'action.devices.DISCONNECT':

                return 'Ok'

            else:
                print('Intent desconocido')
    else:
        print('Token incorrecto')
        return "A"

@app.errorhandler(404)
def page_not_found(error):
    return 'Error 404'

@app.errorhandler(500)
def page_not_found(error):
    return 'La qué has liado pollito'

@app.route("/cron")
@app.route("/cron/")
def cron():
    updatestates()
    verifyRules()

    return "Done"

def updatestates():
    #Get JSON
    data = readJSON()
    alive = data['alive']
    # Get te actual timestamp
    ts = int(time.time()*1000)

    for device in alive:
        if ts - int(alive[device]['timestamp']) > deviceAliveTimeout:
            data['status'][device]['online'] = False
        else:
            data['status'][device]['online'] = True
    #Save the new data
    writeJSON(data)

def verifyRules():
    data = readJSON()
    status = data['status']
    rules = data['rules']

    ts = time.localtime(time.time())
    h = ts.tm_hour
    m = ts.tm_min
    pw = ts.tm_wday
    week = [1,2,3,4,5,6,0]
    w = week[pw]

    for rule in rules:
        ammountTriggers = 1
        verified = 0
        triggers = []
        ruleKeys = []
        for key in rule.keys():
            ruleKeys.append(key)

        if 'triggers' in ruleKeys:
            ammountTriggers = len(rule['triggers'])
            triggers = rule['triggers']
        else:
            triggers.append(rule['trigger'])

        for trigger in triggers:
            #Verify device to device
            value = ""
            if '>' in str(trigger['value']):
                id = trigger['value'].split('>')[0]
                param = trigger['value'].split('>')[1]
                value = status[id][param]
            else:
                value = trigger['value']

            #Verify operators
            if int(trigger['operator']) == 1 and str(status[trigger['id']][trigger['param']]) == str(value):
                verified+=1
            elif int(trigger['operator']) == 2 and status[trigger['id']][trigger['param']] < value:
                verified+=1
            elif int(trigger['operator']) == 3 and status[trigger['id']][trigger['param']] > value:
                verified+=1
            elif int(trigger['operator']) == 4 and h == int(value.split(':')[0]) and m == int(value.split(':')[1]):
                if len(value.split(':')) == 3:
                    print(value.split(':')[2])
                    if str(w) in value.split(':')[2]:
                        verified+=1
                else:
                    verified+=1

        #Update targets if needed
        if verified == ammountTriggers:
            for target in rule['targets']:
                data['status'][target['id']][target['param']] = target['value']
        publish.single("device/"+target['id'], json.dumps(data['status'][target['id']]), hostname="localhost")

    writeJSON(data)

if __name__ == "__main__":
    runapp()
