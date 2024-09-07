import requests
import os
import json
import pytest

# /auth*

def test_auth():
    client_id = "123"
    redirect_uri = "localhost"
    state = "where-is-perry"
    request = requests.get(pytest.host + f"/auth?client_id={client_id}&redirect_uri={redirect_uri}&state={state}")
    assert request.status_code == 404

# Google auth by user /api/user/googleSync

def test_googleSync():
    headers = {
        "username": pytest.username,
        "password": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/googleSync", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "in"
    assert response["user"] == pytest.username
    assert response["url"] != ""

def test_googleSync_fail_bad_username():
    headers = {
        "username": "where-is-perry",
        "password": pytest.password
    }
    request = requests.get(pytest.host + "/api/user/googleSync", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"
    assert response["user"] == headers["username"]
    assert response["url"] == ""

def test_googleSync_fail_bad_password():
    headers = {
        "username": pytest.username,
        "password": "PASSWORD"
    }
    request = requests.get(pytest.host + "/api/user/googleSync", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "fail"
    assert response["user"] == pytest.username
    assert response["url"] == ""