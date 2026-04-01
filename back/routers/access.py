from fastapi import APIRouter, Depends, HTTPException, status, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional

from security.authentication import allowUser
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

class Access(BaseModel):
    id: str = Field(alias="_id")
    agent: str
    apikey: str

@router.get("/api/access", dependencies=[Depends(allowUser)])
def get_access() -> list[Access]:
    return data_conector.getAPIKeys()

@router.patch("/api/access/", dependencies=[Depends(allowUser)])
def update_access() -> Access:
    return data_conector.createAPIKey()

@router.delete("/api/access/{apikey_id}", dependencies=[Depends(allowUser)])
def delete_access(apikey_id: str = "") -> Access:
    if apikey_id == "":
        return errorResponses.FOUR_O_O

    if data_conector.deleteAPIKey(apikey_id):
        return JSONResponse(status_code=200,
                            content = {
                                "status": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses.FOUR_O_FOUR

# Legacy

@router.get("/api/access/get", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/access/get/", dependencies=[Depends(allowUser)], include_in_schema=False)
def get_access_deprecated():
    return data_conector.getAPIKeys()[0]

@router.get("/api/access/create", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/access/create/", dependencies=[Depends(allowUser)], include_in_schema=False)
def create_access_deprecated():
    return data_conector.createAPIKey()
