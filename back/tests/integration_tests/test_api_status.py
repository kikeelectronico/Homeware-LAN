import requests
import os
import json
import pytest

# /api/status/*

def test_get_status_with_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "light"
    request = requests.get(pytest.host + f"/api/devices/{device_id}/status", headers=headers)
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
    request = requests.get(pytest.host + f"/api/devices/{device_id}/status", headers=headers)
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
        "on": True
    }
    device_id = "light"
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "Success"
    assert response["code"] == 200
    # Reset value
    body = {
        "on": False
    }
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))

def test_update_status_fail_bad_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "on": True
    }
    device_id = "where-is-perry"
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))
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
        "on": True
    }
    device_id = "light"
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_status_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    body = {
        "on": True
    }
    device_id = "light"
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_status_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "on": True
    }
    device_id = "light"
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_status_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "on": True
    }
    device_id = "light"
    request = requests.patch(pytest.host + f"/api/devices/{device_id}/status", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"