from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data

router = APIRouter()
data_conector = Data()

@router.get("/api/global/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/global/get/", dependencies=[Depends(allowAuthenticated)])
def getDevices():
    response = data_conector.getGlobal()
    return response