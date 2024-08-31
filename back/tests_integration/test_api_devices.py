import requests
import os
import json
import pytest

# /api/devices/*

def test_get_devices():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert len(response) == 2
    # assert response[0]["_id"] == "scene"
    assert response[0]["id"] == "scene"
    # assert response[1]["_id"] == "test_device"
    assert response[1]["id"] == "test_device"

def test_get_devices_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_devices_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_get_devices_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_devices_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices/get", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_get_device():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "test_device"
    request = requests.get(pytest.host + f"/api/devices/get/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    # assert device["_id"] == "test_device"
    assert response["id"] == "test_device"
    assert response["type"] == "action.devices.types.SWITCH"

def test_get_device_fail_bad_device_id():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "whre_is_perry"
    request = requests.get(pytest.host + f"/api/devices/get/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_create_device():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices/create", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["code"] == 200
    assert response["status"] == "Success"
    # Get the created device
    device_id = "switch000"
    request = requests.get(pytest.host + f"/api/devices/get/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    # assert device["_id"] == "test_device"
    assert response["id"] == "switch000"
    assert response["type"] == "action.devices.types.SWITCH"

def test_create_device_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices/create", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_create_device_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices/create", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_create_device_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices/create", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_create_device_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices/create", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_device():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch updated",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": False
        }
    }
    request = requests.post(pytest.host + "/api/devices/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["code"] == 200
    assert response["status"] == "Success"
    # Get the created device
    device_id = "switch000"
    request = requests.get(pytest.host + f"/api/devices/get/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    # assert device["_id"] == "test_device"
    assert response["id"] == "switch000"
    assert response["name"]["name"] == "Switch updated"

def test_update_device_fail_bad_device_id():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch999",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch updated",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": False
        }
    }
    request = requests.post(pytest.host + "/api/devices/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_device_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch updated",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": False
        }
    }
    request = requests.post(pytest.host + "/api/devices/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_device_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch updated",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": False
        }
    }
    request = requests.post(pytest.host + "/api/devices/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_update_device_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch updated",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": False
        }
    }
    request = requests.post(pytest.host + "/api/devices/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_update_device_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "device": {
            "id": "switch000",
            "type": "action.devices.types.SWITCH",
            "name": {
                "name": "Switch updated",
                "defaultNames": [
                    "Switch"
                ],
                "nicknames": [
                    "Switch"
                ]
            },
            "deviceInfo": {
                "hwVersion": "0.1",
                "swVersion": "0.1",
                "manufacturer": "Happy engineering",
                "model": "The happy device"
            },
            "traits": [
                "action.devices.traits.OnOff"
            ]
        },
        "status": {
            "online": False
        }
    }
    request = requests.post(pytest.host + "/api/devices/update", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_delete_device():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.post(pytest.host + f"/api/devices/delete/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "Success"
    assert response["code"] == 200

def test_delete_device_fail_bad_device_id():
    headers = {
        "authorization": f"baerer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "switch999"
    request = requests.post(pytest.host + f"/api/devices/delete/{device_id}", headers=headers)
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_delete_devices_fail_bad_token():
    headers = {
        "authorization": f"baerer whre_is_perry",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.post(pytest.host + f"/api/devices/delete/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_delete_devices_fail_no_token_value():
    headers = {
        "authorization": f"baerer ",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.post(pytest.host + f"/api/devices/delete/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"


def test_delete_devices_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.post(pytest.host + f"/api/devices/delete/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"

def test_delete_devices_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.post(pytest.host + f"/api/devices/delete/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["error"] == "Bad authentication"
    assert response["code"] == 401
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/api-docs.html"