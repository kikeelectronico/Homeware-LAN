from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated, allowUser
from data import Data

router = APIRouter()
data_conector = Data()

@router.get("/api/global/version", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/global/version/", dependencies=[Depends(allowAuthenticated)])
def getVersion():
    return data_conector.getVersion()

@router.get("/api/system/status", dependencies=[Depends(allowUser)])
@router.get("/api/system/status/", dependencies=[Depends(allowUser)])
def getSystemStatus():
    # ToDo: move homeware heartbeat request to tasks
    # mqttData = data_conector.getMQTT()
    # publish.single("homeware/alive", "all", hostname=hostname.MQTT_HOST, auth={
    #                         'username': mqttData['user'], 'password': mqttData['password']})
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
    if (ts - int(alive['mqtt'])) < 10:
        response['mqtt']['status'] = "Running"
    if (ts - int(alive['tasks'])) < 10:
        response['tasks']['status'] = "Running"

    return response
