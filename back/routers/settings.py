from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Annotated

from security.authentication import allowUser
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/settings", dependencies=[Depends(allowUser)])
def get_settings():
    return data_conector.getSettings()
    
@router.patch("/api/settings", dependencies=[Depends(allowUser)])
def update_settings(settings: dict | None = None):
    if settings is None:
        return errorResponses.FOUR_O_O
    
    data_conector.updateSettings(settings)
    return data_conector.getSettings()


class ServiceAccountKey(BaseModel):
    type: str
    project_id: str
    private_key_id: str
    private_key: str
    client_email: str
    client_id: str
    auth_uri: str
    token_uri: str
    auth_provider_x509_cert_url: str
    client_x509_cert_url: str
    universe_domain: str

@router.put("/api/settings/serviceaccountkey", dependencies=[Depends(allowUser)])
def set_service_account_key(serviceaccountkey: ServiceAccountKey | None = None):
    if serviceaccountkey is None:
        return errorResponses.FOUR_O_O
    
    data_conector.createServiceAccountKeyFile(jsonable_encoder(serviceaccountkey))
    return JSONResponse(status_code=200,
                        content = {
                            "error": "Success",
                            "code": 200,
                        })
   

# Legacy

@router.get("/api/settings/get", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/settings/get/", dependencies=[Depends(allowUser)], include_in_schema=False)
def get_settings():
    return data_conector.getSettings()
    
@router.post("/api/settings/update", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.post("/api/settings/update/", dependencies=[Depends(allowUser)], include_in_schema=False)
def update_settings(settings: dict | None = None):
    if settings:
        data_conector.updateSettings(settings)
        return data_conector.getSettings()
    else:
        return errorResponses.FOUR_O_O


