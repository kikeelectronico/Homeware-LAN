from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

class DeviceInfo(BaseModel):
    hwVersion: str
    manufacturer: str
    model: str
    swVersion: str

class DeviceName(BaseModel):
    defaultNames: list[str]
    name: str
    nicknames: list[str]

class DeviceDescription(BaseModel):
    _id: str
    id: str
    attributes: dict
    deviceInfo: dict # DeviceInfo
    name: DeviceName
    traits: list[str]
    type: str

class Device(BaseModel):
    description: DeviceDescription
    states: dict

@router.get("/api/devices", dependencies=[Depends(allowAuthenticated)])
def get_devices() -> list[Device]:
    devices_description = data_conector.getDevices()
    devices = []
    for device_description in devices_description:
        devices.append({
            "description": device_description,
            "states": data_conector.getStatus(device_description["_id"])
        })
    return devices

@router.post("/api/devices", dependencies=[Depends(allowAuthenticated)])
def create_a_device(device: Device):

    device = jsonable_encoder(device)
    
    data_conector.createDevice(device["description"], device["states"])
    return JSONResponse(status_code=200,
                        content = {
                            "status": "Success",
                            "code": 200,
                        })

# Start legacy

@router.get("/api/devices/get", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/devices/get/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/devices/get/{device_id}", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/devices/get/{device_id}/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def get_devices_deprecated(device_id: str | None = None):
    if device_id:
        response = data_conector.getDevices(device_id)
        if not response: return errorResponses.FOUR_O_FOUR
        return response
    else:
        return data_conector.getDevices()

# End legacy

@router.get("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def get_a_device(device_id: str = "") -> Device:
    if device_id == "":
        return errorResponses.FOUR_O_O
    
    device_description = data_conector.getDevices(device_id)
    
    if not device_description:
        return errorResponses.FOUR_O_FOUR
    
    device_states = data_conector.getStatus(device_id)
    return {
        "description": device_description,
        "states": device_states
    }

@router.put("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def update_a_device(device: Device, device_id: str = ""):
    if device_id == "":
        return errorResponses.FOUR_O_O
    
    device = jsonable_encoder(device)
    
    if data_conector.updateDevice(device["description"], device["states"]):
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_FOUR

    
@router.delete("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def delete_a_device(device_id: str = ""):
    if device_id == "":
        return errorResponses.FOUR_O_O

    if data_conector.deleteDevice(device_id):
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_FOUR

# States

@router.get("/api/devices/{device_id}/states", dependencies=[Depends(allowAuthenticated)])
def get_states_of_a_device(device_id: str = "") -> dict:
    if device_id == "":
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatus(device_id)
    if not response:
        return errorResponses.FOUR_O_FOUR
    return response

@router.get("/api/devices/{device_id}/states/{state_name}", dependencies=[Depends(allowAuthenticated)])
def get_a_state_of_a_device(device_id: str = "", state_name: str = ""):
    if device_id == "" or state_name == "":
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatusParam(device_id, state_name)
    if response is None:
        return errorResponses.FOUR_O_FOUR
    return response

@router.patch("/api/devices/{device_id}/states", dependencies=[Depends(allowAuthenticated)])
def update_states_of_a_device(states: dict, device_id: str = ""):
    if device_id == "":
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatus(device_id)
    if not response:
        return errorResponses.FOUR_O_FOUR

    success = True
    for param in states:
        success = success & data_conector.updateParamStatus(device_id, param, states[param])

    return {
                "status": "Success" if success else "Fail",
                "code": 200,
            } 


# Legacy

@router.get("/api/global/get", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/global/get/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def get_devices_global_deprecated():
    response = data_conector.getGlobal()
    return response

class DeviceLegacy(BaseModel):
    device: dict
    status: dict

@router.post("/api/devices/update", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.post("/api/devices/update/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def update_devices_deprecated(device: DeviceLegacy):
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

@router.post("/api/devices/create", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.post("/api/devices/create/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def create_devices_deprecated(device: DeviceLegacy):
    if device:
        data_conector.createDevice(device.device, device.status)
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_O

@router.post("/api/devices/delete/{device_id}", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.post("/api/devices/delete/{device_id}/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def delete_devices_deprecated(device_id: str | None = None):
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

@router.get("/api/status/get", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/status/get/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/status/get/{device_id}", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/status/get/{device_id}/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def get_status_deprecated(device_id: str | None = None):
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

@router.post("/api/status/update", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.post("/api/status/update/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def update_status_deprecated(state: State):
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