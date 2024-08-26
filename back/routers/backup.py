from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/backup/get", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/backup/get/", dependencies=[Depends(allowAuthenticated)])
def getBackupData():
    return data_conector.getBackupData()
