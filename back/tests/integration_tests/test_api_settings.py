import requests
import os
import json
import pytest

# /api/settings/*

def test_get_settings():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/settings", headers=headers)
    assert request.status_code == 200
    response = request.json()
    keys = list(response.keys())
    assert len(keys) == 8
    assert "domain" in keys
    # assert "_id" in keys
    assert "ddns" in keys
    assert "mqtt" in keys
    assert "sync_google" in keys
    assert "sync_devices" in keys
    assert "log" in keys
    assert "client_id" in keys
    assert "client_secret" in keys

def test_get_settings_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/settings", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_settings_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/settings", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_get_settings_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/settings", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_settings_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/settings", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_settings():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "domain": "localhost",
        "ddns": {
            "enabled": False,
            "hostname": "localhost",
            "password": "",
            "provider": "noip",
            "username": ""
        },
        "mqtt": {
            "user": "mosquitto",
            "password": "homewarelan123"
        },
        "sync_google": False,
        "sync_devices": False,
        "log": {
            "days": 0
        },
        "client_id": "123",
        "client_secret": "456"
    }
    request = requests.patch(pytest.host + "/api/settings", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response == body

def test_update_settings_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "_id": "settings",
        "domain": "localhost",
        "ddns": {
            "enabled": False,
            "hostname": "localhost",
            "password": "",
            "provider": "noip",
            "username": ""
        },
        "mqtt": {
            "user": "mosquitto",
            "password": "homewarelan123"
        },
        "sync_google": False,
        "sync_devices": False,
        "log": {
            "days": 0
        },
        "client_id": "123",
        "client_secret": "456"
    }
    request = requests.patch(pytest.host + "/api/settings", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_settings_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    body = {
        "_id": "settings",
        "domain": "localhost",
        "ddns": {
            "enabled": False,
            "hostname": "localhost",
            "password": "",
            "provider": "noip",
            "username": ""
        },
        "mqtt": {
            "user": "mosquitto",
            "password": "homewarelan123"
        },
        "sync_google": False,
        "sync_devices": False,
        "log": {
            "days": 0
        },
        "client_id": "123",
        "client_secret": "456"
    }
    request = requests.patch(pytest.host + "/api/settings", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_update_settings_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "_id": "settings",
        "domain": "localhost",
        "ddns": {
            "enabled": False,
            "hostname": "localhost",
            "password": "",
            "provider": "noip",
            "username": ""
        },
        "mqtt": {
            "user": "mosquitto",
            "password": "homewarelan123"
        },
        "sync_google": False,
        "sync_devices": False,
        "log": {
            "days": 0
        },
        "client_id": "123",
        "client_secret": "456"
    }
    request = requests.patch(pytest.host + "/api/settings", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_settings_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "_id": "settings",
        "domain": "localhost",
        "ddns": {
            "enabled": False,
            "hostname": "localhost",
            "password": "",
            "provider": "noip",
            "username": ""
        },
        "mqtt": {
            "user": "mosquitto",
            "password": "homewarelan123"
        },
        "sync_google": False,
        "sync_devices": False,
        "log": {
            "days": 0
        },
        "client_id": "123",
        "client_secret": "456"
    }
    request = requests.patch(pytest.host + "/api/settings", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"