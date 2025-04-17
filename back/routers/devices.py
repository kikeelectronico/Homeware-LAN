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
def get_devices():
    devices_description = data_conector.getDevices()
    devices = []
    for device_description in devices_description:
        devices.append({
            "description": device_description,
            "status": data_conector.getStatus(device_description["_id"])
        })
    return devices

class Device(BaseModel):
    description: dict
    status: dict

@router.post("/api/devices", dependencies=[Depends(allowAuthenticated)])
def create_a_device(device: Device):
    if device is None:
        return errorResponses.FOUR_O_O
    
    data_conector.createDevice(device.description, device.status)
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
def get_a_device(device_id: str | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    device_description = data_conector.getDevices(device_id)
    
    if not device_description:
        return errorResponses.FOUR_O_FOUR
    
    device_status = data_conector.getStatus(device_id)
    return {
        "description": device_description,
        "status": device_status
    }

@router.put("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def update_a_device(device_id: str | None, device: Device):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    if device is None:
        return errorResponses.FOUR_O_O
    
    if data_conector.updateDevice(device.description, device.status):
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_FOUR

    
@router.delete("/api/devices/{device_id}", dependencies=[Depends(allowAuthenticated)])
def delete_a_device(device_id: str | None = None):
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

# Status

@router.get("/api/devices/{device_id}/status", dependencies=[Depends(allowAuthenticated)])
def get_the_status_of_a_device(device_id: str | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatus(device_id)
    if not response:
        return errorResponses.FOUR_O_FOUR
    return response

@router.get("/api/devices/{device_id}/status/param/{param_name}", dependencies=[Depends(allowAuthenticated)])
def get_a_param_of_a_device(device_id: str | None = None, param_name: str | None = None):
    if device_id is None or param_name is None:
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatusParam(device_id, param_name)
    if response is None:
        return errorResponses.FOUR_O_FOUR
    return response

@router.patch("/api/devices/{device_id}/status", dependencies=[Depends(allowAuthenticated)])
def update_the_status_of_a_device(device_id: str, state: dict | None = None):
    if device_id is None:
        return errorResponses.FOUR_O_O
    
    if state is None:
        return errorResponses.FOUR_O_O
    
    response = data_conector.getStatus(device_id)
    if not response:
        return errorResponses.FOUR_O_FOUR

    success = True
    for param in state:
        success = success & data_conector.updateParamStatus(device_id, param, state[param])

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