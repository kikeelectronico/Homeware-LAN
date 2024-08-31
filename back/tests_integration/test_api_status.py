import requests
import os
import json
import pytest

# /api/status/*

def test_get_status():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    keys = list(response.keys())
    assert len(keys) == 2
    assert "scene" in keys
    assert "test_device" in keys
    assert response["scene"]["enable"] == False
    assert response["test_device"]["on"] == False

def test_get_status_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_status_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_get_status_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_status_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/status/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_status():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "test_device"
    request = requests.get(pytest.host + f"/api/status/get/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["on"] == False
    assert response["online"] == True

def test_get_status_fail_bad_device_id():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "whre_is_perry"
    request = requests.get(pytest.host + f"/api/status/get/{device_id}", headers=headers)
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_status():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "id": "test_device",
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
        "id": "test_device",
        "param": "on",
        "value": False
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))

def test_update_status_fail_bad_device_id():
    headers = {
        "authorization": f"baerer {pytest.token}",
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
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_status_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "id": "test_device",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_status_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    body = {
        "id": "test_device",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_status_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "id": "test_device",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_status_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "id": "test_device",
        "param": "on",
        "value": True
    }
    request = requests.post(pytest.host + f"/api/status/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"