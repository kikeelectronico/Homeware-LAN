from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/devices", dependencies=[Depends(allowAuthenticated)])
def getDevices():
    return data_conector.getGlobal()

class Device(BaseModel):
    device: dict
    status: dict

@router.post("/api/devices", dependencies=[Depends(allowAuthenticated)])
def createDevices(device: Device):
    if device is None:
        return errorResponses.FOUR_O_O
    
    data_conector.createDevice(device.device, device.status)
    return JSONResponse(status_code=200,
                        content = {
                            "status": "Success",
                            "code": 200,
                        })

    
@router.put("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def updateDevices(device_id: str | None, device: Device):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    if device is None:
        return errorResponses.FOUR_O_O
    
    if data_conector.updateDevice(device.device, device.status):
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_FOUR

    
@router.delete("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def deleteDevices(device_id: str | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    if data_conector.deleteDevice(device_id):
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_FOUR


# Description

@router.get("/api/devices/description", dependencies=[Depends(allowAuthenticated)])
def getDevices():
    return data_conector.getDevices()

@router.get("/api/devices/{device_id}/description", dependencies=[Depends(allowAuthenticated)])
def getDevices(device_id: str | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    response = data_conector.getDevices(device_id)
    if not response: 
        return errorResponses.FOUR_O_FOUR
    return response

# Status

@router.get("/api/devices/status", dependencies=[Depends(allowAuthenticated)])
def getStatus():
    return data_conector.getStatus()

@router.get("/api/devices/{device_id}/status", dependencies=[Depends(allowAuthenticated)])
def getStatus(device_id: str | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatus(device_id)
    if not response:
        return errorResponses.FOUR_O_FOUR
    return response

@router.patch("/api/devices/{device_id}/status", dependencies=[Depends(allowAuthenticated)])
def updateStatus(device_id: str, state: dict | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    if state is None:
        return errorResponses.FOUR_O_O

    success = True
    for param in state:
        success = success & data_conector.updateParamStatus(device_id, param, state(param))

    JSONResponse(status_code=200,
                content = {
                    "status": "Success" if success else "Fail",
                    "code": 200,
                })  


# Legacy

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

@router.post("/api/devices/update/", dependencies=[Depends(allowAuthenticated)])
@router.post("/api/devices/update/", dependencies=[Depends(allowAuthenticated)])
def updateDevices(device: Device):
    if device:
        if data_conector.updateDevice(device.device, device.status):
            return JSONResponse(status_code=200,
                                content = {
                                    "status": "Success",
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
                                "status": "Success",
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
                                    "status": "Success",
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
    value: str | int | bool | float

@router.post("/api/status/update/", dependencies=[Depends(allowAuthenticated)])
@router.post("/api/status/update/", dependencies=[Depends(allowAuthenticated)])
def updateStatus(state: State):
    if state:
        if data_conector.updateParamStatus(state.id, state.param, state.value):
            return JSONResponse(status_code=200,
                                content = {
                                    "status": "Success",
                                    "code": 200,
                                })
        else:
            return errorResponses.FOUR_O_FOUR
    else:
        return errorResponses.FOUR_O_O