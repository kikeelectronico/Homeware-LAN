import requests
import os
import json

HOST = os.environ.get("TEST_HOST", "http://localhost:5001")
USERNAME = os.environ.get("TEST_USERNAME", "admin")
PASSWORD = os.environ.get("TEST_PASSWORD", "admin")

token = ""

# /api/user/*

def test_login():
    headers = {
        "user": USERNAME,
        "pass": PASSWORD
    }
    request = requests.get(HOST + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"
    assert response["user"] == USERNAME
    global token
    token = response["token"]

def test_login_fail_password():
    headers = {
        "user": USERNAME,
        "pass": "PASSWORD"
    }
    request = requests.get(HOST + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"

def test_valiteToken():
    headers = {
        "user": USERNAME,
        "token": token
    }
    request = requests.get(HOST + "/api/user/validateToken", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"

def test_valiteToken_fail_token():
    headers = {
        "user": USERNAME,
        "token": "token"
    }
    request = requests.get(HOST + "/api/user/validateToken", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"
    
def test_changePassword():
    headers = {
        "authorization": f"baerer {token}",
        "content-type": "application/json"
    }
    body = {
        "pass": PASSWORD,
        "new_pass": "new_admin" 
    }
    request = requests.post(HOST + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["message"] == "Updated"
    # Reset password
    body = {
        "pass": "new_admin",
        "new_pass": PASSWORD
    }
    request = requests.post(HOST + "/api/user/password", headers=headers, data=json.dumps(body))

def test_changePassword_fail_password():
    headers = {
        "authorization": f"baerer {token}",
        "content-type": "application/json"
    }
    body = {
        "pass": "this_is_not_the_password",
        "new_pass": "new_admin" 
    }
    request = requests.post(HOST + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["message"] == "Fail, the password hasn't been changed"