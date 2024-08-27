from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated, allowUser
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/backup/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/backup/get/", dependencies=[Depends(allowAuthenticated)])
def getBackupData():
    return data_conector.getBackupData()

@router.put("/api/backup", dependencies=[Depends(allowUser)])
def restoreBackupData(backup: dict | None = None):
    if backup:
        data_conector.restoreBackup(backup)
        return JSONResponse(status_code=200,
                            content = {
                                "error": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses,FOUR_O_O