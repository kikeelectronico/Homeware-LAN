import requests
import os
import json
import pytest

# /api/access/*

apikey = ""

def test_create_access():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.patch(pytest.host + "/api/access/", headers=headers)
    assert request.status_code == 200
    response = request.json()
    keys = list(response.keys())
    assert len(keys) == 1
    assert "apikey" in keys
    assert len(response["apikey"]) > 0
    global apikey
    apikey = response["apikey"]

def test_create_access_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.patch(pytest.host + "/api/access/", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_create_access_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.patch(pytest.host + "/api/access/", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_create_access_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.patch(pytest.host + "/api/access/", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_create_access_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.patch(pytest.host + "/api/access/", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_access():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/access", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert len(response) == 1
    keys = response[0].keys()
    assert "apikey" in keys
    assert len(response[0]["apikey"]) > 0
    assert apikey == response[0]["apikey"]

def test_get_access_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/access", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_access_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/access", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_get_access_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/access", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_access_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/access", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"
