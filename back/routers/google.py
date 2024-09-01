from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from data import Data
from commands import Commands

router = APIRouter()
data_conector = Data()
commands = Commands(data_conector)

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
        data_conector.updateOauthToken(agent, type, token, ts)
        return token
    else:
        data_conector.log('Warning', 'Try to create an incorrect type of token')
        return 'Something goes wrong'

@router.get("/auth")
@router.get("/auth/")
def auth(client_id: str, redirect_uri: str, state: str):
    if data_conector.validateOauthCredentials("client_id", client_id):
        data_conector.log('Warning', 'A new Google account has been linked from auth endpoint')
        # Create a new authorization_code
        code = tokenGenerator('google', 'authorization_code')
        # Compose the response URL
        responseURL = redirect_uri + '?code=' + str(code) + '&state=' + state
        data_conector.setResponseURL(responseURL)
        return redirect("/login/google/", code=302)
        # return '<a href="' + responseURL + '">enlace</a>'
    else:
        data_conector.log(
            'Alert', 'Unauthorized try to link a Google Account. Verify the client id and client secret')
        return 'Algo ha ido mal en la autorización'
    
@router.post("/token")
@router.post("/token/")
def token(grant_type: str, client_id: str, client_secret: str, code: str | None = None, refresh_token: str | None = None):
    # agent = request.headers['User-Agent']
    # # Verify special agents
    # if '+http://www.google.com/bot.html' in agent:
    #     agent = 'google'
    # elif agent == 'OpenAuth':
    #     agent = 'google'
    agent = "google"

    code = ''
    if grant_type == 'authorization_code':
        code = request.form.get('code')
    else:
        code = request.form.get('refresh_token')
    response = {}
    # Verify the code
    if  data_conector.validateOauthToken(grant_type, code):
        # Tokens lifetime
        secondsInDay = 86400
        # Create a new token
        access_token = tokenGenerator(agent, 'access_token')
        # Compose the response JSON
        response['token_type'] = 'bearer'
        response['expires_in'] = secondsInDay
        if grant_type == 'authorization_code':
            # Create a new token
            refresh_token = tokenGenerator(agent, 'refresh_token')
            response['access_token'] = access_token
            response['refresh_token'] = refresh_token
        elif grant_type == 'refresh_token':
            response['access_token'] = access_token
            response['refresh_token'] = code

        # Response back
        data_conector.log('Warning', 'New token has been created for ' + agent)
        return response
    else:
        # Response back
        response['error'] = 'invalid_grant'
        data_conector.log('Alert', 'Unauthorized token request. The new token hasn\'t been sent.')
        return response

@router.post("/smarthome")
@router.post("/smarthome/")
def smarthome(body: dict):
    if data_conector.deep_logging:
        data_conector.log('Log', 'Request: ' + json.dumps(body))
    # Get the agent
    # agent = request.headers['User-Agent']
    # # Verify special agents
    # if '+http://www.google.com/bot.html' in agent:
    #     agent = 'google'
    # elif agent == 'OpenAuth':
    #     agent = 'google'
    agent = "google"
    # Get the access_token
    tokenClient = request.headers['authorization'].split(' ')[1]
    if data_conector.validateOauthToken('access_token', tokenClient):
        # Anlalyze the inputs
        inputs = body['inputs']
        requestId = body['requestId']
        for input in inputs:
            if input['intent'] == 'action.devices.SYNC':
                response = {
                    'requestId': requestId,
                    'payload': {
                        'agentUserId': data_conector.getDDNS()['hostname'],
                        'devices': data_conector.getDevices()
                    }
                }
                data_conector.log('Log', 'Sync request by ' + agent + ' with ' +
                                  response['payload']['agentUserId'] + ' as agent user id')
                data_conector.updateSyncGoogle(True)
                if data_conector.deep_logging:
                    data_conector.log('Log', 'Response: ' + json.dumps(response))
                return response
            elif input['intent'] == 'action.devices.QUERY':
                response = {
                    'requestId': requestId,
                    'payload': {
                        'devices': data_conector.getStatus()
                    }
                }
                data_conector.log('Log', 'Query request by ' + agent)
                if data_conector.deep_logging:
                    data_conector.log('Log', 'Response: ' + json.dumps(response))
                return response
            elif input['intent'] == 'action.devices.EXECUTE':
                previus_status = data_conector.getStatus()
                # Response
                response = {
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
                    response['payload']['commands'].append(command_response)

                # data_conector.log('Log', 'Execute request by ' + agent)
                if data_conector.deep_logging:
                    data_conector.log('Log', 'Execute request by ' + agent)
                    data_conector.log('Log', 'Response: ' + json.dumps(response))
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