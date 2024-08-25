from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowUser
from data import Data

router = APIRouter()
data_conector = Data()

@router.get("/api/log/alert", dependencies=[Depends(allowUser)])
@router.get("/api/log/alert/", dependencies=[Depends(allowUser)])
def getAlerts():
    response = data_conector.isThereAnAlert()
    return response