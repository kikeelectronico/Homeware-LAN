import pytest
import requests

def pytest_configure(config):
    # Set global vars
    pytest.host = config.getoption("host")
    pytest.username = config.getoption("username")
    pytest.password = config.getoption("password")
    # Get user token
    pytest.token = ""
    headers = {
        "username": config.getoption("username"),
        "password": config.getoption("password")
    }
    request = requests.get(config.getoption("host") + "/api/user/login", headers=headers)
    if request.status_code == 200:
        response = request.json()
        if response["valid"]:
            pytest.token = response["token"]

def pytest_addoption(parser):
    parser.addoption("--host", action="store", default="http://localhost:5001", help="Host machine URL")
    parser.addoption("--username", action="store", default="admin", help="user name")
    parser.addoption("--password", action="store", default="admin", help="user password")


