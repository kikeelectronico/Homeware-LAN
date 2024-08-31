import requests
import os
import json
import pytest

# /api/global/*

def test_get_version():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/version", headers=headers)
    assert request.status_code == 200
    response = request.json()
    keys = list(response.keys())
    assert len(keys) == 1
    assert "version" in keys

def test_get_version_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/version", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_version_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/version", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_get_version_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/version", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_version_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/version", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_global():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    keys = list(response.keys())
    assert "devices" in keys
    assert "status" in keys

def test_get_global_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_global_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_get_global_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_global_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/global/get", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"