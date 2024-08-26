from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowUser
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/settings/get", dependencies=[Depends(allowUser)])
@router.get("/api/settings/get/", dependencies=[Depends(allowUser)])
def getSettings():
    return data_conector.getSettings()
    
@router.post("/api/settings/update/", dependencies=[Depends(allowUser)])
@router.post("/api/settings/update/", dependencies=[Depends(allowUser)])
def updateSettings(settings: dict | None = None):
    if settings:
        data_conector.updateSettings(settings)
        return data_conector.getSettings()
    else:
        return errorResponses.FOUR_O_O
