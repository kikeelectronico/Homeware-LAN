import requests
import pytest

# /api/access/*

def test_create_access():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.post(
        pytest.host + "/api/access/",
        headers=headers,
        json={"agent": "integration-test"}
    )
    assert request.status_code == 200
    response = request.json()
    assert set(response.keys()) == {"_id", "agent", "apikey"}
    assert response["_id"]
    assert response["agent"] == "integration-test"
    assert len(response["apikey"]) > 0

def test_create_access_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.post(pytest.host + "/api/access/", headers=headers, json={"agent": "integration-test"})
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_create_access_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.post(pytest.host + "/api/access/", headers=headers, json={"agent": "integration-test"})
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_create_access_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.post(pytest.host + "/api/access/", headers=headers, json={"agent": "integration-test"})
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_create_access_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.post(pytest.host + "/api/access/", headers=headers, json={"agent": "integration-test"})
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_access():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    created = requests.post(
        pytest.host + "/api/access/",
        headers=headers,
        json={"agent": "integration-test-list"}
    )
    assert created.status_code == 200
    created_access = created.json()

    request = requests.get(pytest.host + "/api/access", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert isinstance(response, list)
    assert all({"_id", "agent", "apikey"}.issubset(item.keys()) for item in response)
    assert all(len(item["apikey"]) > 0 for item in response)
    assert created_access in response

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
