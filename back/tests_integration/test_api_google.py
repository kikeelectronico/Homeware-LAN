import requests
import os
import json
import pytest

auth_code = ""
access_token = ""
refresh_token = ""

# /auth

def test_auth():
    client_id = "123"
    redirect_uri = "localhost"
    state = "where-is-perry"
    request = requests.get(pytest.host + f"/auth?client_id={client_id}&redirect_uri={redirect_uri}&state={state}")
    assert request.status_code == 404

# Google auth by user /api/user/googleSync

def test_googleSync():
    headers = {
        "username": pytest.username,
        "password": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/googleSync", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"
    assert response["user"] == pytest.username
    assert response["url"] != ""
    global auth_code
    auth_code = response["url"].split("code=")[1].split("&state")[0]

def test_googleSync_fail_bad_username():
    headers = {
        "username": "where-is-perry",
        "password": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/googleSync", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"
    assert response["user"] == headers["username"]
    assert response["url"] == ""

def test_googleSync_fail_bad_password():
    headers = {
        "username": pytest.username,
        "password": "PASSWORD"
    }
    request = requests.get(pytest.host + "/api/user/googleSync", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"
    assert response["user"] == pytest.username
    assert response["url"] == ""

# /token

def generate_form_data_payload(kwargs):

    REQUEST_FORM_DATA_BOUNDARY = "REQUEST_FORM_DATA_BOUNDARY"
    FORM_DATA_STARTING_PAYLOAD = '--{0}\r\nContent-Disposition: form-data; name=\\"'.format(REQUEST_FORM_DATA_BOUNDARY)
    FORM_DATA_MIDDLE_PAYLOAD = '\"\r\n\r\n'
    FORM_DATA_ENDING_PAYLOAD = '--{0}--'.format(REQUEST_FORM_DATA_BOUNDARY)
    

    payload = ''
    for key, value in kwargs.items():
        payload += '{0}{1}{2}{3}\r\n'.format(FORM_DATA_STARTING_PAYLOAD, key, FORM_DATA_MIDDLE_PAYLOAD, value)
    payload += FORM_DATA_ENDING_PAYLOAD
    return payload

def test_get_tokens_with_auth_code():
    body = {
        "grant_type": "authorization_code",
        "client_id": "123",
        "client_secret": "456",
        "code": auth_code
    }
    request = requests.post(pytest.host + f"/token", data=body)
    assert request.status_code == 200
    response = request.json()
    assert response["token_type"] == "bearer"
    assert response["expires_in"] == 86400
    assert len(response["access_token"]) == 40
    assert len(response["refresh_token"]) == 40
    global access_token
    access_token = response["access_token"]
    global refresh_token
    refresh_token = response["refresh_token"]

def test_get_tokens_with_auth_code_fail_bad_auth_code():
    body = {
        "grant_type": "authorization_code",
        "client_id": "123",
        "client_secret": "456",
        "code": "where-is-perry"
    }
    request = requests.post(pytest.host + f"/token", data=body)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "invalid_grant"

def test_get_tokens_with_refresh_token():
    body = {
        "grant_type": "refresh_token",
        "client_id": "123",
        "client_secret": "456",
        "refresh_token": refresh_token
    }
    request = requests.post(pytest.host + f"/token", data=body)
    assert request.status_code == 200
    response = request.json()
    assert response["token_type"] == "bearer"
    assert response["expires_in"] == 86400
    assert len(response["access_token"]) == 40
    global access_token
    access_token = response["access_token"]

def test_get_tokens_with_refresh_token_fail_bad_refresh_token():
    body = {
        "grant_type": "authorization_code",
        "client_id": "123",
        "client_secret": "456",
        "refresh_token": "where-is-perry"
    }
    request = requests.post(pytest.host + f"/token", data=body)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "invalid_grant"

# /smarthome

def test_sync_smarthome():
    headers = {
        "authorization": f"bearer {access_token}"
    }
    body = {
        "requestId": "a-request-id",
        "inputs": [
            {
                "intent": "action.devices.SYNC"
            }
        ]
    }
    request = requests.post(pytest.host + "/smarthome", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["requestId"] == body["requestId"]
    assert "agentUserId" in response["payload"]
    assert len(response["payload"]["devices"]) == 1
    assert response["payload"]["devices"][0]["id"] == "light"

def test_query_smarthome():
    headers = {
        "authorization": f"bearer {access_token}"
    }
    body = {
        "requestId": "a-request-id",
        "inputs": [
            {
                "intent": "action.devices.QUERY"
            }
        ]
    }
    request = requests.post(pytest.host + "/smarthome", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["requestId"] == body["requestId"]
    assert len(response["payload"]["devices"]) == 1
    assert response["payload"]["devices"]["light"]["online"] == True
    assert response["payload"]["devices"]["light"]["on"] == False

def test_execute_smarthome():
    headers = {
        "authorization": f"bearer {access_token}"
    }
    body = {
        "requestId": "a-request-id",
        "inputs": [
            {
                "intent": "action.devices.EXECUTE",
                "payload": {
                    "commands": []
                }
            }
        ]
    }
    request = requests.post(pytest.host + "/smarthome", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["requestId"] == body["requestId"]
    assert len(response["payload"]["commands"]) == len(body["inputs"][0]["payload"]["commands"])
    
def test_disconnect_smarthome():
    headers = {
        "authorization": f"bearer {access_token}"
    }
    body = {
        "requestId": "a-request-id",
        "inputs": [
            {
                "intent": "action.devices.DISCONNECT"
            }
        ]
    }
    request = requests.post(pytest.host + "/smarthome", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.text
    assert response == "Ok"
