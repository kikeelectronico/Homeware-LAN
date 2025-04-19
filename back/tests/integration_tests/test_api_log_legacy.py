import requests
import os
import json
import pytest

# /api/log/*

def test_legacy_get_log():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert isinstance(response, list)

def test_legacy_get_log_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_legacy_get_log_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_legacy_get_log_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_legacy_get_log_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_legacy_get_alert():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/alert", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert "alert" in response

def test_legacy_get_alert_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/alert", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_legacy_get_alert_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/alert", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_legacy_get_alert_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/alert", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_legacy_get_alert_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/log/alert", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"
