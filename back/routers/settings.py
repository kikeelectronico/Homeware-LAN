from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Optional

from security.authentication import allowUser
from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

class DDNS(BaseModel):
    enabled: bool
    hostname: str
    password: str
    provider: str
    username: str

class Log(BaseModel):
    days: int

class MQTT(BaseModel):
    user: str
    password: str

class Settings(BaseModel):
    client_id: str
    client_secret: str
    ddns: DDNS
    domain: str
    log: Log
    mqtt: MQTT
    sync_devices: bool
    sync_google: bool

@router.get("/api/settings", dependencies=[Depends(allowUser)])
def get_settings() -> Settings:
    return data_conector.getSettings()

class PatchSettings(BaseModel):
    client_id: Optional[str]
    client_secret: Optional[str]
    ddns: Optional[DDNS]
    domain: Optional[str]
    log: Optional[Log]
    mqtt: Optional[MQTT]
    sync_devices: Optional[bool]
    sync_google: Optional[bool]


@router.patch("/api/settings", dependencies=[Depends(allowUser)])
def update_settings(settings: PatchSettings) -> Settings:

    data_conector.updateSettings(jsonable_encoder(settings))
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
def set_service_account_key(serviceaccountkey: ServiceAccountKey):
    
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


