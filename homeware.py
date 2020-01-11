from flask import Flask, request, render_template
import json
import time
import random
import subprocess
from multiprocessing import Process
from aux import readJSON, writeJSON

app = Flask(__name__)
app = Flask(__name__)

#Global variables
deviceAliveTimeout = 20000

#app
def runapp():
    app.run(host='0.0.0.0', port=5001, debug=True)


########################### APP ###########################

@app.route('/')
def index():
    return 'Welcome to Homeware'

@app.route('/config')
@app.route('/config/')
@app.route('/config/<step>')
@app.route('/config/<step>/')
def config(step = 'welcome'):

    steps = {
        'welcome': 'ports',
        'ports': 'domain',
        'domain': 'nginx',
        'nginx': 'confignginx',
        'confignginx': 'change2domain',
        'change2domain': ''
    }

    return render_template('step_' + step + '.html', step=step, next=steps[step])

@app.route('/test')
@app.route('/test/')
def test():
    return 'Load'

@app.route('/operation/<name>')
def operation(name):
    if name == 'nginx':
        output = '<b>$ sudo apt-get update</b><br><br>'
        result = subprocess.run(["sudo", "apt-get", "update"],  stdout=subprocess.PIPE)
        output += str(result.stdout)
        output += '<br><br><b>$ sudo apt-get install nginx</b><br><br>'
        result = subprocess.run(["sudo", "apt-get", "install", "nginx"],  stdout=subprocess.PIPE)
        output += str(result.stdout)
        return output
    elif name == 'confignginx':
        output = '<b>Running...</b><br><br>'
        result = subprocess.run(["sudo", "sh", "bash/confignginx.sh"], stdout=subprocess.PIPE)
        print(result.stdout)
        output += str(result.stdout)

        return output

    return 'Load'

########################### API ###########################
#Hardware's endpoint
@app.route("/read/")
def read():
    #Get all data
    userAgent = request.headers['User-Agent']
    id = request.args.get('id')
    token = request.headers['authorization'].split(' ')[1]
    param = request.args.get('param')
    value = request.args.get('value')
    vartype = request.args.get('vartype')
    smartConnection = request.args.get('smartconnection')
    #Response content
    responseData = {}
    #Change var type
    if vartype == "int":
        value = int(value)
    elif vartype == "bool":
        if value == "true":
            value = True;
        else:
            value = False;

    #Read the JSON file
    data = readJSON()

    #Verify token
    if(token == data['token'][id]['access_token']['value']):
        #Save the current timestamp
        ts = int(time.time()*1000)
        data['alive'][id]['timestamp'] = ts
        #Validate smartConnection
        if smartConnection == "true":
            responseData = data['smartConnection'][id]
        else:
            #Verify if data must been updated
            if isinstance(param, str):
                data['status'][id][param] = value
            responseData = data['status'][id]
        writeJSON(data)
        #Response back
        response = app.response_class(
            response=json.dumps(responseData),
            status=200,
            mimetype='application/json'
        )
        return response

    else:
        return "Bad token"

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
    data = readJSON()
    legalTypes = ['access_token', 'authorization_code', 'refresh_token']

    if type in legalTypes:
        data['token'][agent][type]['value'] = token
        data['token'][agent][type]['timestamp'] = ts
        writeJSON(data)
        return token
    else:
        return 'Something goes wrong'

#Auth endpoint
@app.route("/auth")
def auth():
    token = readJSON()['token'];                #Tokens from the DDBB
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
    #Verify the code
    if code == data['token'][agent][grantType]['value']:
        #Tokens lifetime
        secondsInDay = 86400;
        #Create a new token
        access_token = tokenGenerator(agent, 'access_token')
        #Compose the response JSON
        obj = {}
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
            data['token'][agent]['authorization_code']['value'] = random.randrange(1000000000)
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
    token = request.headers['authorization'].split(' ')[1]
    data = readJSON()
    if token == data['token'][agent]['access_token']['value']:
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

#Dinamic load
@app.route('/<a>/<b>/<c>')
def verification(a,b,c):
    #SSL validation
    if a == '.well-known' and b == 'acme-challenge':
        with open('sslVerification.json', 'r') as f:
            verification = json.load(f)
            verificationContent = verification['content']
            verificationUri = verification['uri']
        return verificationContent
    else:
        return 'Something'

@app.errorhandler(404)
def page_not_found(error):
    return 'Error 404'

@app.errorhandler(500)
def page_not_found(error):
    return 'La qué has liado pollito'

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

if __name__ == "__main__":
    runapp()
    #p1 = Process(target=runapp)
    #p1.start()
    #p1.join()

    #Cron job execution at main thread
    # while(True):
    #     updatestates()
    #     time.sleep(5)
