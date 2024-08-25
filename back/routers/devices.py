from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/global/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/global/get/", dependencies=[Depends(allowAuthenticated)])
def getDevices():
    response = data_conector.getGlobal()
    return response

@router.get("/api/devices/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/devices/get/", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/devices/get/{device_id}", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/devices/get/{device_id}/", dependencies=[Depends(allowAuthenticated)])
def getDevices(device_id: str | None):
    if device_id:
        response = data_conector.getDevices(device_id)
        if not response: return errorResponses.FOUR_O_FOUR
        return response
    else:
        return data_conector.getDevices()
    