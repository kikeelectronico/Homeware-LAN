from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowAuthenticated
from data import Data

router = APIRouter()
data_conector = Data()

@router.get("/api/global/version", dependencies=[Depends(allowAuthenticated)])
@router.get("/api/global/version/", dependencies=[Depends(allowAuthenticated)])
def getVersion():
    response = data_conector.getVersion()
    return response