from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated
import time

from security.authentication import allowAuthenticated, allowUser
from data import Data

router = APIRouter()
data_conector = Data()

@router.get("/api/system/version", dependencies=[Depends(allowAuthenticated)])
def get_system_version():
    return {'version': data_conector.getVersion()}

@router.get("/api/system/status", dependencies=[Depends(allowUser)])
@router.get("/api/system/status/", dependencies=[Depends(allowUser)], include_in_schema=False) # Legacy
def get_system_status():
    response = {
        'api': {
            'enable': True,
            'status': 'Running',
            'title': 'Homeware API'
        },
        'mqtt': {
            'enable': True,
            'status': 'Stopped',
            'title': 'Homeware MQTT'
        },
        'tasks': {
            'enable': True,
            'status': 'Stopped',
            'title': 'Homeware Task'
        },
        'redis': data_conector.getRedisStatus(),
        'mongo': data_conector.getMongoStatus()
    }

    ts = int(time.time())
    alive = data_conector.getAlive()
    try:
        if (ts - int(alive['mqtt'])) < 10:
            response['mqtt']['status'] = "Running"
    except:
        data_conector.log("Log", "Fail to get MQTT core timestamp")
    try:
        if (ts - int(alive['tasks'])) < 10:
            response['tasks']['status'] = "Running"
    except:
        data_conector.log("Log", "Fail to get Tasks core timestamp")

    return response

# Legacy

@router.get("/api/global/version", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/global/version/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def get_version_deprecated():
    return {'version': data_conector.getVersion()}
