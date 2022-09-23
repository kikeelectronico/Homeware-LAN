import os
from flask import Flask, request, redirect, send_file, Response
from flask_cors import CORS
import json
import time
from datetime import datetime
import random
import paho.mqtt.publish as publish
import subprocess
from gevent import monkey

from data import Data
from commands import Commands
import hostname

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

# Global variables
responseURL = ''

# Init the data managment object
data_conector = Data()

# Init command executor
commands = Commands(data_conector)

# app


def runapp():
    app.run(host='0.0.0.0', port=5001, debug=True)

########################### API ###########################


@app.route('/test')
@app.route('/test/')
def test():
    return 'Load'

# API


def checkAccessLevel(headers):

    accessLevel = 0
    try:
        authorization = headers['authorization'].split(' ')[1]
        savedToken = data_conector.getToken(agent='front')
        savedAPIKey = data_conector.getToken(agent='apikey')
        if authorization == savedAPIKey:
            accessLevel = 10
        elif authorization == savedToken:
            accessLevel = 100
    except:
        accessLevel = 0

    return accessLevel

@app.route("/api/devices/update", methods=['POST'])
@app.route("/api/devices/update/", methods=['POST'])
def apiDevicesUpdate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        incommingData = request.get_json()
        if data_conector.updateDevice(incommingData):
            response = app.response_class(
                response=json.dumps(TWO_O_O),
                status=200,
                mimetype='application/json'
            )
        else:
            response = app.response_class(
                response=json.dumps(FOUR_O_FOUR),
                status=404,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to api > devices > update with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/devices/create", methods=['POST'])
@app.route("/api/devices/create/", methods=['POST'])
def apiDevicesCreate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        incommingData = request.get_json()
        data_conector.createDevice(incommingData)
        response = app.response_class(
            response=json.dumps(TWO_O_O),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to api > devices > create with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/devices/delete/<value>", methods=['POST'])
@app.route("/api/devices/delete/<value>/", methods=['POST'])
def apiDevicesDelete(value=''):

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        if data_conector.deleteDevice(value):
            response = app.response_class(
                response=json.dumps(TWO_O_O),
                status=200,
                mimetype='application/json'
            )
        else:
            response = app.response_class(
                response=json.dumps(FOUR_O_FOUR),
                status=404,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to api > devices > delete with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/devices/get", methods=['GET'])
@app.route("/api/devices/get/", methods=['GET'])
@app.route("/api/devices/get/<value>", methods=['GET'])
@app.route("/api/devices/get/<value>/", methods=['GET'])
def apiDevicesGet(value=''):

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
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
        data_conector.log(
            'Alert', 'Request to api > devices > get with bad authentication')
        responseData = FOUR_O_ONE

    response = app.response_class(
        response=json.dumps(responseData),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/api/status/update", methods=['POST'])
@app.route("/api/status/update/", methods=['POST'])
def apiStatusUpdate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        incommingData = request.get_json()
        if data_conector.updateParamStatus(incommingData['id'], incommingData['param'], incommingData['value']):
            response = app.response_class(
                response=json.dumps(TWO_O_O),
                status=200,
                mimetype='application/json'
            )
        else:
            response = app.response_class(
                response=json.dumps(FOUR_O_FOUR),
                status=404,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to API > status > update endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/status/get", methods=['GET'])
@app.route("/api/status/get/", methods=['GET'])
@app.route("/api/status/get/<value>", methods=['GET'])
@app.route("/api/status/get/<value>/", methods=['GET'])
def apiStatusGet(value=''):

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        status = data_conector.getStatus()
        if not value == '':
            if value in status:
                response = app.response_class(
                    response=json.dumps(status[value]),
                    status=200,
                    mimetype='application/json'
                )
            else:
                response = app.response_class(
                    response=json.dumps(FOUR_O_FOUR),
                    status=404,
                    mimetype='application/json'
                )
        else:
            response = app.response_class(
                response=json.dumps(status),
                status=200,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to API > status > get endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/tasks/update", methods=['POST'])
@app.route("/api/tasks/update/", methods=['POST'])
def apiTasksUpdate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        incommingData = request.get_json()
        if data_conector.updateTask(incommingData):
            response = app.response_class(
                response=json.dumps(TWO_O_O),
                status=200,
                mimetype='application/json'
            )
        else:
            response = app.response_class(
                response=json.dumps(FOUR_O_FOUR),
                status=404,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to API > task > update endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )
    
    return response

@app.route("/api/tasks/create", methods=['POST'])
@app.route("/api/tasks/create/", methods=['POST'])
def apiTasksCreate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        incommingData = request.get_json()
        data_conector.createTask(incommingData['task'])
        response = app.response_class(
            response=json.dumps(TWO_O_O),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > task > create endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/tasks/delete/<value>", methods=['POST'])
@app.route("/api/tasks/delete/<value>/", methods=['POST'])
def apiTasksDelete(value=''):

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        if data_conector.deleteTask(int(value)):
            response = app.response_class(
                response=json.dumps(TWO_O_O),
                status=200,
                mimetype='application/json'
            )
        else:
            response = app.response_class(
                response=json.dumps(FOUR_O_FOUR),
                status=404,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to API > task > delete endpoint with bad authentication')
        response = app.response_class(
                response=json.dumps(FOUR_O_ONE),
                status=401,
                mimetype='application/json'
            )

    
    return response

@app.route("/api/tasks/get", methods=['GET'])
@app.route("/api/tasks/get/", methods=['GET'])
@app.route("/api/tasks/get/<value>", methods=['GET'])
@app.route("/api/tasks/get/<value>/", methods=['GET'])
def apiTasksGet(value=''):

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        tasks = data_conector.getTasks()
        try:
            if not value == '':
                if 0 <= int(value) < len(tasks):
                    response = app.response_class(
                        response=json.dumps(tasks[int(value)]),
                        status=200,
                        mimetype='application/json'
                    )
                else:
                    response = app.response_class(
                        response=json.dumps(FOUR_O_FOUR),
                        status=404,
                        mimetype='application/json'
                    )
            else:
                response = app.response_class(
                    response=json.dumps(tasks),
                    status=200,
                    mimetype='application/json'
                )
        except:
            responseData = {
                'error': 'Invalid task ID, it must be a integer',
                'code': 400,
                'note': 'See the documentation https://kikeelectronico.github.io/Homeware-LAN/api/'
            }
            response = app.response_class(
                response=json.dumps(responseData),
                status=400,
                mimetype='application/json'
            )
    else:
        data_conector.log(
            'Alert', 'Request to API > task > get endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/global/version", methods=['GET'])
@app.route("/api/global/version/", methods=['GET'])
def apiGlobalVersion():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        response = app.response_class(
            response=json.dumps(data_conector.getVersion()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > global > version endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )
    
    return response

@app.route("/api/global/get", methods=['GET'])
@app.route("/api/global/get/", methods=['GET'])
def apiGlobalGet():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        response = app.response_class(
            response=json.dumps(data_conector.getGlobal()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > global > get endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )
    
    return response

@app.route("/api/user/password", methods=['POST'])
@app.route("/api/user/password/", methods=['POST'])
def apiUserPassword():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 10:
        response = app.response_class(
            response=json.dumps(data_conector.updatePassword(request.get_json())),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > user > password endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )
    
    return response

@app.route("/api/user/set", methods=['POST'])
@app.route("/api/user/set/", methods=['POST'])
def apiUserSet():

    return "Deprecated function"

@app.route("/api/user/login", methods=['GET'])
@app.route("/api/user/login/", methods=['GET'])
def apiUserLogin():

    response = app.response_class(
        response=json.dumps(data_conector.login(request.headers)),
        status=200,
        mimetype='application/json'
    )

    return response

@app.route("/api/user/validateToken", methods=['GET'])
@app.route("/api/user/validateToken/", methods=['GET'])
def apiUserValidateToken():

    response = app.response_class(
        response=json.dumps(data_conector.validateUserToken(request.headers)),
        status=200,
        mimetype='application/json'
    )

    return response

@app.route("/api/user/googleSync", methods=['GET'])
@app.route("/api/user/googleSync/", methods=['GET'])
def apiUserGoogleSync():

   return data_conector.googleSync(request.headers, responseURL)

@app.route("/api/access/create", methods=['GET'])
@app.route("/api/access/create/", methods=['GET'])
def apiAccessCreate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        data_conector.log('Warning', 'An API Key has been regenerated')
        response = app.response_class(
            response=json.dumps(data_conector.generateAPIKey()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log('Alert', 'Request to API > access > create endpoint.')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/access/get", methods=['GET'])
@app.route("/api/access/get/", methods=['GET'])
def apiAccessGet():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        response = app.response_class(
            response=json.dumps(data_conector.getAPIKey()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log('Alert', 'Request to API > access > get endpoint.')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/settings/update", methods=['POST'])
@app.route("/api/settings/update/", methods=['POST'])
def apiSettingsUpdate():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        incommingData = request.get_json()
        data_conector.updateSettings(incommingData)
        response = app.response_class(
            response=json.dumps(data_conector.getSettings()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > settings > update endpoint.')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/settings/get", methods=['GET'])
@app.route("/api/settings/get/", methods=['GET'])
def apiSettingsGet():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        response = app.response_class(
            response=json.dumps(data_conector.getSettings()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > settings > get endpoint.')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/settings/domain/<value>", methods=['POST'])
@app.route("/api/settings/domain/<value>/", methods=['POST'])
def apiSettingsDomain(value=''):

    return "Deprecated function"

@app.route("/api/system/status", methods=['GET'])
@app.route("/api/system/status/", methods=['GET'])
def apiSystemStatus():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        # Try to get username and password
        try:
            mqttData = data_conector.getMQTT()
            if not mqttData['user'] == "":
                publish.single("homeware/alive", "all", hostname=hostname.MQTT_HOST, auth={
                                'username': mqttData['user'], 'password': mqttData['password']})
            else:
                publish.single("homeware/alive", "all",
                                hostname=hostname.MQTT_HOST)
        except:
            data_conector.log('Warning','Unable to send alive request')

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
        
        response = app.response_class(
            response=json.dumps(responseData),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > system endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/log/get", methods=['GET'])
@app.route("/api/log/get/", methods=['GET'])
def apiLogGet():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        responseData = data_conector.getLog()
        response = app.response_class(
            response=json.dumps(responseData),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > log > get endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )
    
    return response

@app.route("/api/log/delete", methods=['GET'])
@app.route("/api/log/delete/", methods=['GET'])
def apiLogDelete():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        response = app.response_class(
            response=json.dumps(data_conector.deleteLog()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > log > delete endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

@app.route("/api/log/alert", methods=['GET'])
@app.route("/api/log/alert/", methods=['GET'])
def apiLogAlert():

    accessLevel = checkAccessLevel(request.headers)

    if accessLevel >= 100:
        response = app.response_class(
            response=json.dumps(data_conector.isThereAnAlert()),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > log > alert endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )

    return response

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Files operation
@app.route("/files/<operation>/<file>/<token>/", methods=['GET', 'POST'])
def files(operation='', file='', token=''):
    # Get the access_token
    frontToken = data_conector.getToken(agent='front')
    if token == frontToken:
        if operation == 'buckup':
            # Create file
            data_conector.createFile('homeware')
            # Download file
            now = datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            result = send_file('../homeware.json',
                               mimetype="application/json",  # use appropriate type based on file
                               attachment_filename=file + '_' + \
                               str(date_time) + '.json',
                               as_attachment=True,
                               conditional=False)
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
                    file.save(os.path.join(
                        app.config['UPLOAD_FOLDER'], "homeware.json"))
                    data_conector.load()
                    data_conector.log(
                        'Warning', 'A backup file has been restored')
                    return redirect('/backup/?status=Success')
        elif operation == 'download':
            if file == "log":
                # Download file
                now = datetime.now()
                date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
                result = send_file('../logs/homeware.log',
                                   mimetype="text/plain",  # use appropriate type based on file
                                   attachment_filename='homeware_' + \
                                   str(date_time) + '.log',
                                   as_attachment=True,
                                   conditional=False)
                data_conector.log(
                    'Warning', 'The log file has been downloaded')
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
                        file.save(os.path.join(app.config['UPLOAD_FOLDER'] + "files/", "google.json"))
                        data_conector.log('Info', 'A google auth file has been uploaded')
                        data_conector.updateSyncGoogle(True)
                        return redirect('/settings/?status=Success')
        else:
            return 'Operation unknown'
    else:
        data_conector.log(
            'Alert', 'Unauthorized access try to the backup and restore endpoint')
        return 'Bad token'

# Backup json
@app.route("/api/backup/get/", methods=['GET'])
def backupGet():
    accessLevel = checkAccessLevel(request.headers)
    if accessLevel >= 10:
        backup_data = data_conector.getBackup()
        response = app.response_class(
            response=json.dumps(backup_data),
            status=200,
            mimetype='application/json'
        )
    else:
        data_conector.log(
            'Alert', 'Request to API > backup > get endpoint with bad authentication')
        response = app.response_class(
            response=json.dumps(FOUR_O_ONE),
            status=401,
            mimetype='application/json'
        )
    return response


def tokenGenerator(agent, type):
    # Generate the token
    chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    token = ''
    i = 0
    while i < 40:
        token += random.choice(chars)
        i += 1

    # Verify special agents
    if '+http://www.google.com/bot.html' in agent:
        agent = 'google'
    elif agent == 'OpenAuth':
        agent = 'google'

    # Save the token
    ts = int(time.time() * 1000)
    # data = readToken()
    legalTypes = ['access_token', 'authorization_code', 'refresh_token']

    if type in legalTypes:
        data_conector.updateToken(agent, type, token, ts)
        return token
    else:
        data_conector.log(
            'Warning', 'Try to create an incorrect type of token')
        return 'Something goes wrong'

# Auth endpoint
@app.route("/auth")
@app.route("/auth/")
def auth():
    clientId = request.args.get('client_id')  # ClientId from the client
    responseURI = request.args.get('redirect_uri')
    state = request.args.get('state')
    if clientId == data_conector.getToken(agent='google', type="client_id"):
        data_conector.log(
            'Warning', 'A new Google account has been linked from auth endpoint')
        # Create a new authorization_code
        code = tokenGenerator('google', 'authorization_code')
        # Compose the response URL
        global responseURL
        responseURL = responseURI + '?code=' + str(code) + '&state=' + state
        return redirect("/login/google/", code=302)
        # return '<a href="' + responseURL + '">enlace</a>'
    else:
        data_conector.log(
            'Alert', 'Unauthorized try to link a Google Account. Verify the client id and client secret')
        return 'Algo ha ido mal en la autorización'

# Token's endpoint
@app.route('/token', methods=['GET', 'POST'])
@app.route('/token/', methods=['GET', 'POST'])
def token():

    agent = request.headers['User-Agent']
    # Verify special agents
    if '+http://www.google.com/bot.html' in agent:
        agent = 'google'
    elif agent == 'OpenAuth':
        agent = 'google'

    grantType = request.form.get('grant_type')
    client_id = request.form.get('client_id')
    client_secret = request.form.get('client_secret')
    code = ''
    if grantType == 'authorization_code':
        code = request.form.get('code')
    else:
        code = request.form.get('refresh_token')
    obj = {}
    # Verify the code
    if code == data_conector.getToken(agent, grantType, 'value'):
        # Tokens lifetime
        secondsInDay = 86400
        # Create a new token
        access_token = tokenGenerator(agent, 'access_token')
        # Compose the response JSON
        obj['token_type'] = 'bearer'
        obj['expires_in'] = secondsInDay
        if grantType == 'authorization_code':
            # Create a new token
            refresh_token = tokenGenerator(agent, 'refresh_token')
            obj['access_token'] = access_token
            obj['refresh_token'] = refresh_token
        elif grantType == 'refresh_token':
            obj['access_token'] = access_token
            obj['refresh_token'] = code

        # Response back
        response = app.response_class(
            response=json.dumps(obj),
            status=200,
            mimetype='application/json'
        )
        data_conector.log('Warning', 'New token has been created for ' + agent)
        return response
    else:
        # Response back
        obj['error'] = 'invalid_grant'
        response = app.response_class(
            response=json.dumps(obj),
            status=200,
            mimetype='application/json'
        )
        data_conector.log(
            'Alert', 'Unauthorized token request. The new token hasn\'t been sent.')
        return response

# Google's endpoint
@app.route("/smarthome", methods=['POST'])
@app.route("/smarthome/", methods=['POST'])
def smarthome():
    # Get all data
    body = request.json
    if data_conector.deep_logging:
        data_conector.log('Log', 'Request: ' + json.dumps(body))
    # Get the agent
    agent = request.headers['User-Agent']
    # Verify special agents
    if '+http://www.google.com/bot.html' in agent:
        agent = 'google'
    elif agent == 'OpenAuth':
        agent = 'google'
    # Get the access_token
    tokenClient = request.headers['authorization'].split(' ')[1]
    if tokenClient == data_conector.getToken(agent, 'access_token', 'value'):
        # Anlalyze the inputs
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
                data_conector.log('Log', 'Sync request by ' + agent + ' with ' +
                                  obj['payload']['agentUserId'] + ' as agent user id')
                data_conector.updateSyncGoogle(True)
                if data_conector.deep_logging:
                    data_conector.log('Log', 'Response: ' + json.dumps(obj))
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
                if data_conector.deep_logging:
                    data_conector.log('Log', 'Response: ' + json.dumps(obj))
                return response
            elif input['intent'] == 'action.devices.EXECUTE':
                previus_status = data_conector.getStatus()
                # Response
                obj = {
                    'requestId': requestId,
                    'payload': {
                        'commands': []
                    }
                }
                # Analize commands for all devices
                for command in input['payload']['commands']:
                    devices = command['devices']
                    executions = command['execution']
                    ids = []
                    errorCode = ""
                    for device in devices:
                        deviceId = device['id']
                        ids.append(deviceId)
                        params = executions[0]['params']
                        command = executions[0]['command'].split('.')[3]
                        # evaluate the command
                        commands.setParams(deviceId, params)
                        if(command in dir(Commands)):
                            errorCode = eval('commands.' + command + '()')
                        else:
                            data_conector.log('Log', 'Incorrect command')

                    command_response = {}
                    if len(errorCode) > 0:
                        command_response = {
                            'ids': ids,
                            'errorCode': errorCode,
                            'status': 'ERROR',
                        }
                    else:
                        new_status = data_conector.getStatus()
                        command_response = {
                            'ids': ids,
                            'states': new_status[ids[0]],
                            'status': 'SUCCESS',
                        }
                    obj['payload']['commands'].append(command_response)

                response = app.response_class(
                    response=json.dumps(obj),
                    status=200,
                    mimetype='application/json'
                )
                # data_conector.log('Log', 'Execute request by ' + agent)
                if data_conector.deep_logging:
                    data_conector.log('Log', 'Execute request by ' + agent)
                    data_conector.log('Log', 'Response: ' + json.dumps(obj))
                return response
            elif input['intent'] == 'action.devices.DISCONNECT':
                data_conector.log('Log', 'Disconnect request by ' + agent)
                data_conector.updateLinked(False)
                return 'Ok'

            else:
                data_conector.log('Log', 'Unknown request by ' + agent)
    else:
        data_conector.log('Alert', 'Unauthorized request from ' +
                          agent + '. Maybe the token has expired.')
        return "A"

# Clock endpoint
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
    monkey.patch_all()
    runapp()
