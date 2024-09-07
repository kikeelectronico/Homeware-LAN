import requests
import os
import json
import pytest

# /api/status/*

def test_get_status():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    keys = list(response.keys())
    assert len(keys) == 1
    assert "light" in keys
    assert response["light"]["on"] == False

def test_get_status_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_status_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_get_status_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_status_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_status_with_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "light"
    request = requests.get(pytest.host + f"/api/status/get/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["on"] == False
    assert response["online"] == True

def test_get_status_fail_bad_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "whre_is_perry"
    request = requests.get(pytest.host + f"/api/status/get/{device_id}", headers=headers)
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/"

def test_update_status():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "id": "light",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "Success"
    assert response["code"] == 200
    # Reset value
    body = {
        "id": "light",
        "param": "on",
        "value": False
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))

def test_update_status_fail_bad_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "id": "where-is-perry",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/"

def test_update_status_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "id": "light",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_status_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    body = {
        "id": "light",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_status_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "id": "light",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_status_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "id": "light",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"