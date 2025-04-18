import requests
import os
import json
import pytest

# /api/devices/*

def test_get_devices():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert len(response) == 1
    assert response[0]["description"]["id"] == "light"

def test_get_devices_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_devices_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_get_devices_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_devices_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    request = requests.get(pytest.host + "/api/devices", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_get_device():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "light"
    request = requests.get(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["description"]["id"] == "light"
    assert response["description"]["type"] == "action.devices.types.LIGHT"

def test_get_device_fail_bad_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "whre_is_perry"
    request = requests.get(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/"

def test_create_device():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices", headers=headers, data=json.dumps(body))
    print(request.json())
    assert request.status_code == 200
    response = request.json()
    assert response["code"] == 200
    assert response["status"] == "Success"
    # Get the created device
    device_id = "switch000"
    request = requests.get(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["description"]["id"] == "switch000"
    assert response["description"]["type"] == "action.devices.types.SWITCH"

def test_create_device_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_create_device_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_create_device_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_create_device_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": True
        }
    }
    request = requests.post(pytest.host + "/api/devices", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_device():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": False
        }
    }
    device_id = "switch000"
    request = requests.put(pytest.host + f"/api/devices/{device_id}", headers=headers, data=json.dumps(body))
    assert request.status_code == 200
    response = request.json()
    assert response["code"] == 200
    assert response["status"] == "Success"
    # Get the created device
    request = requests.get(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["description"]["id"] == "switch000"
    assert response["description"]["name"]["name"] == "Switch updated"

def test_update_device_fail_bad_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": False
        }
    }
    device_id = "switch000"
    request = requests.put(pytest.host + f"/api/devices/{device_id}", headers=headers, data=json.dumps(body))
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/"

def test_update_device_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": False
        }
    }
    device_id = "switch000"
    request = requests.put(pytest.host + f"/api/devices/{device_id}", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_device_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": False
        }
    }
    device_id = "switch000"
    request = requests.put(pytest.host + f"/api/devices/{device_id}", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_update_device_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": False
        }
    }
    device_id = "switch000"
    request = requests.put(pytest.host + f"/api/devices/{device_id}", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_update_device_no_header():
    headers = {
        "content-type": "application/json"
    }
    body = {
        "description": {
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
            ],
            "attributes": {}
        },
        "states": {
            "online": False
        }
    }
    device_id = "switch000"
    request = requests.put(pytest.host + f"/api/devices/{device_id}", headers=headers, data=json.dumps(body))
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_delete_device():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.delete(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 200
    response = request.json()
    assert response["status"] == "Success"
    assert response["code"] == 200

def test_delete_device_fail_bad_device_id():
    headers = {
        "authorization": f"bearer {pytest.token}",
        "content-type": "application/json"
    }
    device_id = "switch999"
    request = requests.delete(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 404
    response = request.json()
    assert response["error"] == "Not found"
    assert response["code"] == 404
    assert response["note"] == "See the documentation https://homeware.enriquegomez.me/"

def test_delete_devices_fail_bad_token():
    headers = {
        "authorization": f"bearer whre_is_perry",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.delete(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_delete_devices_fail_no_token_value():
    headers = {
        "authorization": f"bearer ",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.delete(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"


def test_delete_devices_fail_no_header_value():
    headers = {
        "authorization": f"",
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.delete(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"

def test_delete_devices_fail_no_header():
    headers = {
        "content-type": "application/json"
    }
    device_id = "switch000"
    request = requests.delete(pytest.host + f"/api/devices/{device_id}", headers=headers)
    assert request.status_code == 401
    response = request.json()
    assert response["detail"] == "A valid token is needed"