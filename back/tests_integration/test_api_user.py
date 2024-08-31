import pytest
import requests
import os
import json

# /api/user/*

def test_login():
    headers = {
        "user": pytest.username,
        "pass": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"
    assert response["user"] == pytest.username
    # Update token new token
    pytest.token = response["token"]

def test_login_fail_password():
    headers = {
        "user": pytest.username,
        "pass": "PASSWORD"
    }
    request = requests.get(pytest.host + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"

def test_valiteToken():
    headers = {
        "user": pytest.username,
        "token": pytest.token
    }
    request = requests.get(pytest.host + "/api/user/validateToken", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"

def test_valiteToken_fail_token():
    headers = {
        "user": pytest.username,
        "token": "token"
    }
    request = requests.get(pytest.host + "/api/user/validateToken", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"
    
def test_changePassword():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "pass": pytest.password,
        "new_pass": "new_admin" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["message"] == "Updated"
    # Reset password
    body = {
        "pass": "new_admin",
        "new_pass": pytest.password
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))

def test_changePassword_fail_password():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "pass": "this_is_not_the_password",
        "new_pass": "new_admin" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["message"] == "Fail, the password hasn't been changed"