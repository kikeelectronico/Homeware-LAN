import pytest
import requests
import os
import json

# /api/user/*

def test_login():
    headers = {
        "username": pytest.username,
        "password": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"
    assert response["user"] == pytest.username
    # Update token new token
    pytest.token = response["token"]

def test_login_fail_bad_username():
    headers = {
        "username": "where-is-perry",
        "password": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"

def test_login_fail_bad_password():
    headers = {
        "username": pytest.username,
        "password": "PASSWORD"
    }
    request = requests.get(pytest.host + "/api/user/login", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"

def test_valiteToken():
    headers = {
        "username": pytest.username,
        "token": pytest.token
    }
    request = requests.get(pytest.host + "/api/user/validateToken", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"

def test_valiteToken_fail_bad_token():
    headers = {
        "username": pytest.username,
        "token": "where-is-perry"
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
        "new_pass": "where-is-perry" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["message"] == "Updated"
    # Reset password
    body = {
        "password": "where-is-perry",
        "new_password": pytest.password
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))

def test_changePassword_fail_bad_password():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "password": "where-is-perry",
        "new_password": "new_admin" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["message"] == "Fail, the password hasn't been changed"

def test_changePassword_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "password": pytest.password,
        "new_password": "where-is-perry" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_changePassword_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    body = {
        "password": pytest.password,
        "new_password": "where-is-perry" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_changePassword_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "password": pytest.password,
        "new_password": "where-is-perry" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_changePassword_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "password": pytest.password,
        "new_password": "where-is-perry" 
    }
    request = requests.post(pytest.host + "/api/user/password", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"