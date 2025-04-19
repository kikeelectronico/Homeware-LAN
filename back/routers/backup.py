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
def get_backup():
    return data_conector.getBackup()

@router.put("/api/backup", dependencies=[Depends(allowUser)])
def restore_backup(backup: dict | None = None):
    if backup is None:
        return errorResponses.FOUR_O_O
    
    data_conector.restoreBackup(backup)
    return JSONResponse(status_code=200,
                        content = {
                            "error": "Success",
                            "code": 200,
                        })
        

# Legacy

@router.get("/api/backup/get", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
@router.get("/api/backup/get/", dependencies=[Depends(allowAuthenticated)], include_in_schema=False)
def get_backup_deprecated():
    return data_conector.getBackup()

