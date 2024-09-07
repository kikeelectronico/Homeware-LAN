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
