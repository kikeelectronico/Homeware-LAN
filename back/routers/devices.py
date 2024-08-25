from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/global/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/global/get/", dependencies=[Depends(allowAuthenticated)])
def getDevicesGlobal():
    response = data_conector.getGlobal()
    return response

@router.get("/api/devices/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/devices/get/", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/devices/get/{device_id}", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/devices/get/{device_id}/", dependencies=[Depends(allowAuthenticated)])
def getDevices(device_id: str | None = None):
    if device_id:
        response = data_conector.getDevices(device_id)
        if not response: return errorResponses.FOUR_O_FOUR
        return response
    else:
        return data_conector.getDevices()
    
class Device(BaseModel):
    device: dict
    status: dict

@router.post("/api/devices/update/", dependencies=[Depends(allowAuthenticated)])
@router.post("/api/devices/update/", dependencies=[Depends(allowAuthenticated)])
def updateDevices(device: Device):
    if device:
        if data_conector.updateDevice(device.device, device.status):
            return JSONResponse(status_code=200,
                                content = {
                                    "error": "Success",
                                    "code": 200,
                                })
        else:
            return errorResponses.FOUR_O_FOUR
    else:
        return errorResponses.FOUR_O_O

@router.post("/api/devices/create/", dependencies=[Depends(allowAuthenticated)])
@router.post("/api/devices/create/", dependencies=[Depends(allowAuthenticated)])
def createDevices(device: Device):
    if device:
        data_conector.createDevice(device.device, device.status)
        return JSONResponse(status_code=200,
                            content = {
                                "error": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_O

@router.post("/api/devices/delete/{device_id}", dependencies=[Depends(allowAuthenticated)])
@router.post("/api/devices/delete/{device_id}/", dependencies=[Depends(allowAuthenticated)])
def deleteDevices(device_id: str | None = None):
    if device_id:
        if data_conector.deleteDevice(device_id):
            return JSONResponse(status_code=200,
                                content = {
                                    "error": "Success",
                                    "code": 200,
                                })
        else:
            return errorResponses.FOUR_O_FOUR
    else:
        return errorResponses.FOUR_O_O

@router.get("/api/status/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/status/get/", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/status/get/{device_id}", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/status/get/{device_id}/", dependencies=[Depends(allowAuthenticated)])
def getStatus(device_id: str | None = None):
    if device_id:
        response = data_conector.getStatus(device_id)
        if not response: return errorResponses.FOUR_O_FOUR
        return response
    else:
        return data_conector.getStatus()

class State(BaseModel):
    id: str
    param: str
    value: str

@router.post("/api/status/update/", dependencies=[Depends(allowAuthenticated)])
@router.post("/api/status/update/", dependencies=[Depends(allowAuthenticated)])
def updateStatus(state: State):
    if state:
        if data_conector.updateParamStatus(sate.id, state.param, state.value):
            return JSONResponse(status_code=200,
                                content = {
                                    "error": "Success",
                                    "code": 200,
                                })
        else:
            return errorResponses.FOUR_O_FOUR
    else:
        return errorResponses.FOUR_O_O