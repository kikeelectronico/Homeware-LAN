from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated, allowUser
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/backup", dependencies=[Depends(allowAuthenticated)])
def getBackup():
    return data_conector.getBackup()

@router.put("/api/backup", dependencies=[Depends(allowUser)])
def restoreBackup(backup: dict | None = None):
    if backup is None:
        return errorResponses.FOUR_O_O
    
    data_conector.restoreBackup(backup)
    return JSONResponse(status_code=200,
                        content = {
                            "error": "Success",
                            "code": 200,
                        })
        

# Legacy

@router.get("/api/backup/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/backup/get/", dependencies=[Depends(allowAuthenticated)])
def getBackup():
    return data_conector.getBackup()

