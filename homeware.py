import os
from flask import Flask, request, render_template, redirect, send_file, url_for
import requests
from base64 import b64encode
import json
import time
from datetime import datetime
import random
import paho.mqtt.publish as publish
import subprocess

from data import Data
from renderHelper import RenderHelper

UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = {'json'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#Global variables
deviceAliveTimeout = 20000
responseURL = ''

#Init the data managment object
hData = Data()

#Init the RenderHelper
renderHelper = RenderHelper()

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
    if hData.firstRun():
        return redirect("/assistant/", code=302)
    else:
        return render_template('panel/index.html', basic = renderHelper.basic)


@app.route('/devices')
@app.route('/devices/')
@app.route('/devices/<process>/')
@app.route('/devices/<process>/')
@app.route('/devices/<process>/<id>')
@app.route('/devices/<process>/<id>/')
def devices(process = "", id = ""):

    if process == 'edit':
        if id != '':
            return render_template('panel/device_edit.html', deviceID=id, basic = renderHelper.basic)
        else:
            return render_template('panel/devices.html', basic = renderHelper.basic)
    elif process == 'assistant':
        return render_template('panel/device_assistant.html', basic = renderHelper.basic)
    else:
        return render_template('panel/devices.html', basic = renderHelper.basic)

@app.route('/rules')
@app.route('/rules/')
@app.route('/rules/<process>/')
@app.route('/rules/<process>/')
@app.route('/rules/<process>/<id>')
@app.route('/rules/<process>/<id>/')
def rules(process = "", id = -1):

    if process == 'edit':
            return render_template('panel/rule_edit.html', ruleID=id, basic = renderHelper.basic)
    elif process == 'json':
            return render_template('panel/rule_json.html', ruleID=id, basic = renderHelper.basic)
    else:
        return render_template('panel/rules.html', basic = renderHelper.basic)

@app.route('/settings')
@app.route('/settings/')
@app.route('/settings/<msg>/')
def settings(msg = ''):

    if msg == 'ok':
        msg = 'Saved correctly'
    elif 'fail' in msg:
        msg = msg.split(':')[1]
    else:
        msg = 'none'

    return render_template('panel/settings.html', msg=msg, basic = renderHelper.basic)

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
        'ssl': 'google',
        'google': 'initialize',
        'initialize': ''
    }
    if step == 'welcome':
        subprocess.run(["cp", "configuration_templates/template_secure.json", "secure.json"],  stdout=subprocess.PIPE)
        subprocess.run(["cp", "configuration_templates/template_homeware.json", "homeware.json"],  stdout=subprocess.PIPE)
        hData.refresh()


    return render_template('assistant/step_' + step + '.html', step=step, next=steps[step])

########################### API ###########################
@app.route('/test')
@app.route('/test/')
def test():
    #publish.single("test", "payload", hostname="localhost")
    return 'Load'

@app.route('/refresh')
@app.route('/refresh/')
def refresh():
    hData.refresh()
    return 'Done'

#API
@app.route("/api", methods=['GET', 'POST'])
@app.route("/api/", methods=['GET', 'POST'])
@app.route("/api/<segment>/", methods=['GET', 'POST'])
@app.route("/api/<segment>/<operation>", methods=['GET', 'POST'])
@app.route("/api/<segment>/<operation>/", methods=['GET', 'POST'])
@app.route("/api/<segment>/<operation>/<value>", methods=['GET', 'POST'])
@app.route("/api/<segment>/<operation>/<value>/", methods=['GET', 'POST'])
def front(operation = "", segment = "", value = ''):

    #Verify the access level
    accessLevel = 0
    try:
        authorization = request.headers['authorization'].split(' ')[1]
        savedToken = hData.getToken('front')
        savedAPIKey = hData.getToken('apikey')
        if authorization == savedAPIKey:
            accessLevel = 10
        elif authorization == savedToken:
            accessLevel = 100
    except:
        accessLevel = 0

    #if authorization == savedToken or (not savedAPIKey == '' and savedAPIKey == authorization):

    responseData = {}
    if segment == "" or operation == "":
        responseData = {
            'error': 'Bad request',
            'code': 400,
            'note': 'See the documentation'
        }
    else:
        #User doesn't require token
        if segment == 'user':
            if accessLevel >= 0:
                if operation == 'set':
                    return hData.setUser(request.get_json())
                elif operation == 'login':
                    responseData = hData.login(request.headers)
                elif operation == 'validateToken':
                    responseData = hData.validateUserToken(request.headers)
                elif operation == 'googleSync':
                    return hData.googleSync(request.headers, responseURL)
                else:
                    responseData = {
                        'error': 'Operation not supported',
                        'code': 400,
                        'note': 'See the documentation'
                    }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }

        elif segment == 'global':
            if accessLevel >= 10:
                if operation == 'version':
                    responseData = hData.getVersion()
                elif operation == 'get':
                    responseData = hData.homewareData
                else:
                    responseData = {
                        'error': 'Operation not supported',
                        'code': 400,
                        'note': 'See the documentation'
                    }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }
        elif segment == 'devices':
            if accessLevel >= 10:
                if operation == 'update':
                    incommingData = request.get_json()
                    hData.updateDevice(incommingData)
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'create':
                    incommingData = request.get_json()
                    hData.createDevice(incommingData)
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'delete':
                    hData.deleteDevice(value)
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'get':
                    if not value == '':
                        found = False
                        for device in hData.getDevices():
                            if device['id'] == value:
                                responseData = device
                                found = True
                                break
                        if not found:
                            responseData = {
                                'error': 'Device not found',
                                'code': 404,
                                'note': 'See the documentation'
                            }
                    else:
                        responseData = hData.getDevices()
                else:
                    responseData = {
                        'error': 'Operation not supported',
                        'code': 400,
                        'note': 'See the documentation'
                    }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }
        elif segment == 'status':
            if accessLevel >= 10:
                if operation == 'update':
                    incommingData = request.get_json()
                    hData.updateParamStatus(incommingData['id'],incommingData['param'],incommingData['value'])
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'get':
                    status = hData.getStatus()
                    if not value == '':
                        if value in status:
                            responseData = status[value]
                        else:
                            responseData = {
                                'error': 'Device not found',
                                'code': 404,
                                'note': 'See the documentation'
                            }
                    else:
                        responseData = status
                else:
                    responseData = {
                        'error': 'Operation not supported',
                        'code': 400,
                        'note': 'See the documentation'
                    }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }
        elif segment == 'rules':
            if accessLevel >= 10:
                if operation == 'update':
                    incommingData = request.get_json()
                    hData.updateRule(incommingData)
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'create':
                    incommingData = request.get_json()
                    hData.createRule(incommingData)
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'delete':
                    hData.deleteRule(value)
                    responseData = {
                        'status': 'Success',
                        'code': 200
                    }
                elif operation == 'get':
                    rules = hData.getRules()
                    try:
                        if not value == '':
                            if 0 <= int(value) < len(rules):
                                responseData = rules[int(value)]
                            else:
                                responseData = {
                                    'error': 'Rule not found',
                                    'code': 404,
                                    'note': 'See the documentation'
                                }
                        else:
                            responseData = rules
                    except:
                        responseData = {
                            'error': 'Invalid rule ID, it must be a integer',
                            'code': 409,
                            'note': 'See the documentation'
                        }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }
        elif segment == 'settings':
            if accessLevel >= 100:
                if operation == 'update':
                    incommingData = request.get_json()
                    hData.updateSecure(incommingData)
                    responseData = hData.getSecure()
                elif operation == 'get':
                    responseData = hData.getSecure()
                elif operation == 'apikey':
                    if authorization == savedToken:
                        responseData = {
                            'apikey': hData.generateAPIKey()
                        }
                    else:
                        responseData = {
                            'error': 'The operation can only be done by an admin user',
                            'code': 403,
                            'note': 'See the documentation'
                        }
                else:
                    responseData = {
                        'error': 'Operation not supported',
                        'code': 400,
                        'note': 'See the documentation'
                    }
            elif accessLevel >= 0:
                if operation == 'domain':
                    if value == '':
                        responseData = {
                            'error': 'A domain must be given',
                            'code': 400,
                            'note': 'See the documentation'
                        }
                    else:
                        hData.setDomain(value)
                        responseData = {
                            'status': 'Success',
                            'code': 200
                        }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }
        elif segment == 'system':
            if accessLevel >= 100:
                if operation == 'upgrade':
                    # subprocess.run(["sudo", "systemctl", "start", "homewareUpgrader"],  stdout=subprocess.PIPE)
                    subprocess.run(["sudo", "sh", "bash/update.sh"],  stdout=subprocess.PIPE)
                    responseData = {
                        'code': '202'
                    }
                else:
                    responseData = {
                        'error': 'Operation not supported',
                        'code': 400,
                        'note': 'See the documentation'
                    }
            else:
                responseData = {
                    'error': 'Bad authentication',
                    'code': 401,
                    'note': 'See the documentation'
                }


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
    frontToken = hData.getToken('front')
    if token == frontToken:
        if operation == 'buckup':
            now = datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            result = send_file(file + '.json',
               mimetype = "application/json", # use appropriate type based on file
               attachment_filename = file + '_' + str(date_time) + '.json',
               as_attachment = True,
               conditional = False)
            return result
        elif operation == 'restore':
            if request.method == 'POST':
                if 'file' not in request.files:
                    return redirect('/settings/fail:No file selected/')
                file = request.files['file']
                if file.filename == '':
                    return redirect('/settings/fail:Incorrect file name/')
                if file and allowed_file(file.filename):
                    filename = file.filename
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    subprocess.run(["mv", file.filename, "homeware.json"],  stdout=subprocess.PIPE)
                    hData.refresh()
                    return redirect('/settings/ok/')
        else:
            return 'Operation unknown'
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
    #data = readToken()
    legalTypes = ['access_token', 'authorization_code', 'refresh_token']

    if type in legalTypes:
        hData.updateToken(agent,type,token,ts)
        return token
    else:
        return 'Something goes wrong'

#Auth endpoint
@app.route("/auth")
@app.route("/auth/")
def auth():
    token = hData.getToken('google')               #Tokens from the DDBB
    clientId = request.args.get('client_id')    #ClientId from the client
    responseURI = request.args.get('redirect_uri')
    state = request.args.get('state')
    print('auth')
    if clientId == token['client_id']:
        print('id_correcto')
        #Create a new authorization_code
        code = tokenGenerator('google', 'authorization_code')
        #Compose the response URL
        global responseURL
        responseURL = responseURI + '?code=' + str(code) + '&state=' +  state
        print(responseURL)
        #Return the page
        #return '<center><h1 style=\"font-size: 6em;\">Homeware LAN</h1><br><a style=\"font-size: 4em;\" class=\"btn btn-primary\" href=\"' + responseURL + '\">Pulsa aquí para enlazar</a></center>'
        return render_template('panel/googleSync.html')
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
        code = request.form.get('code')
    else:
        code = request.form.get('refresh_token')


    #Get the tokens and ids from DDBB
    token = hData.getToken(agent)
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
    token = hData.getToken(agent)
    if tokenClient == token['access_token']['value']:
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
                obj['payload']['devices'] = hData.getDevices()
                response = app.response_class(
                    response=json.dumps(obj),
                    status=200,
                    mimetype='application/json'
                )
                return response
            elif input['intent'] == 'action.devices.QUERY':
                #updatestates()
                obj = {}
                obj['requestId'] = requestId
                obj['payload'] = {}
                obj['payload']['devices'] = hData.getStatus()
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
                #Only the first input and the first command
                n = 0
                for command in input['payload']['commands']:
                    devices = command['devices']
                    executions = command['execution']
                    for device in devices:
                        deviceId = device['id']
                        obj['payload']['commands'][n]['ids'].append(deviceId)
                        params = executions[0]['params']
                        command = executions[0]['command']

                        #Critical commands are commands with special treatment
                        commandsOperation = {
                            "action.devices.commands.OpenClose": {
                                "operation": "object",
                                "object": "openState"
                            },
                            "action.devices.commands.SetTemperature": {
                                "operation": "rename",
                                "from": "temperature",
                                "to": "temperatureSetpointCelsius"
                            },
                            "action.devices.commands.SetModes": {
                                "operation": "rename",
                                "from": "updateModeSettings",
                                "to": "currentModeSettings"
                            },
                            "action.devices.commands.SetHumidity": {
                                "operation": "rename",
                                "from": "humidity",
                                "to": "humiditySetpointPercent"
                            }
                        }

                        if command in commandsOperation.keys():
                            if commandsOperation[command]['operation'] == 'object':
                                paramsKeys = params.keys()
                                for key in paramsKeys:
                                    hData.updateParamStatus(deviceId, commandsOperation[command]['object'], { key: params[key]})
                                publish.single("device/"+deviceId, json.dumps(hData.getStatus()[deviceId]), hostname="localhost")
                            elif commandsOperation[command]['operation'] == 'rename':
                                paramsKeys = params.keys()
                                for key in paramsKeys:
                                    hData.updateParamStatus(deviceId, commandsOperation[command]['to'], params[key])
                                publish.single("device/"+deviceId, json.dumps(hData.getStatus()[deviceId]), hostname="localhost")
                        else:
                            paramsKeys = params.keys()
                            for key in paramsKeys:
                                hData.updateParamStatus(deviceId, key, params[key])
                            publish.single("device/"+deviceId, json.dumps(hData.getStatus()[deviceId]), hostname="localhost")

                    obj['payload']['commands'][n]['states'] = hData.getStatus()
                    n += 1

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

#Clock endpoint
@app.route("/clock")
@app.route("/clock/")
def clock():
    ts = time.localtime(time.time())
    h = ts.tm_hour
    m = ts.tm_min
    return str(h) + ":" + str(m)

@app.errorhandler(404)
def page_not_found(error):
    return 'Error 404'

@app.errorhandler(500)
def page_not_found(error):
    return 'La qué has liado pollito.'

@app.route("/cron")
@app.route("/cron/")
def cron():
    #updatestates()
    verifyRules()
    ddnsUpdater()

    return "Done"
#
# def updatestates():
#     #Get JSON
#     data = readJSON()
#     alive = data['alive']
#     # Get te actual timestamp
#     ts = int(time.time()*1000)
#
#     for device in alive:
#         if False: #ts - int(alive[device]['timestamp']) > deviceAliveTimeout:
#             data['status'][device]['online'] = False
#         else:
#             data['status'][device]['online'] = True
#     #Save the new data
#     writeJSON(data)

def verifyRules():
    status = hData.getStatus()
    rules = hData.getRules()

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
                    if str(w) in value.split(':')[2]:
                        verified+=1
                else:
                    verified+=1
        #Update targets if needed
        if verified == ammountTriggers:
            for target in rule['targets']:
                if str(target['value']) == 'toggle':
                    hData.updateParamStatus(target['id'], target['param'], not status[target['id']][target['param']])
                else:
                    hData.updateParamStatus(target['id'], target['param'], target['value'])
                publish.single("device/"+target['id'], json.dumps(hData.getStatus()[target['id']]), hostname="localhost")

def ddnsUpdater():
    ddns = hData.getDDNS()
    ipServer = 'http://ip1.dynupdate.no-ip.com/'
    if ddns['enabled']:

        ipRequest = requests.get(url=ipServer)
        newIP = ipRequest.text
        if not newIP == ddns['ip']:

            noipServer = 'https://dynupdate.no-ip.com/nic/update'
            params = {
                'hostname': ddns['hostname'],
                'myip': newIP
            }
            user = ddns['username'] + ':' + ddns['password']
            userEncoded = str(b64encode(bytes(user, 'utf-8')))
            headers = {
                'User-Agent': 'Homeware Homeware/v0.4 hola@rinconingenieril.es',
                'Authorization': 'Basic ' + userEncoded[2:len(userEncoded)-1]
            }
            noipRequest = requests.get(url= noipServer, params=params, headers=headers)
            #Analyze the response
            code = noipRequest.text.split(' ')[0]
            print(noipRequest.text)
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
                hData.updateDDNS(newIP, status[code], code, False, last)
            else:
                hData.updateDDNS(newIP, status[code], code, True, last)

if __name__ == "__main__":
    runapp()
