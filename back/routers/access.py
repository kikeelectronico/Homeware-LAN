from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Optional

from security.authentication import allowUser
from data import Data

router = APIRouter()
data_conector = Data()

class Access(BaseModel):
    apikey: str

@router.get("/api/access", dependencies=[Depends(allowUser)])
def get_access() -> list[Access]:
    print(data_conector.getAPIKey())
    return [data_conector.getAPIKey()]

@router.patch("/api/access/", dependencies=[Depends(allowUser)])
def update_access() -> Access:
    return data_conector.createAPIKey()

# Legacy

@router.get("/api/access/get", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/access/get/", dependencies=[Depends(allowUser)], include_in_schema=False)
def get_access_deprecated():
    return data_conector.getAPIKey()

@router.get("/api/access/create", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/access/create/", dependencies=[Depends(allowUser)], include_in_schema=False)
def create_access_deprecated():
    return data_conector.createAPIKey()