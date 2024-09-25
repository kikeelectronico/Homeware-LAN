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

@router.get("/api/settings/get", dependencies=[Depends(allowUser)])
@router.get("/api/settings/get/", dependencies=[Depends(allowUser)])
def getSettings():
    return data_conector.getSettings()
    
@router.post("/api/settings/update/", dependencies=[Depends(allowUser)])
@router.post("/api/settings/update/", dependencies=[Depends(allowUser)])
def updateSettings(settings: dict | None = None):
    if settings:
        data_conector.updateSettings(settings)
        return data_conector.getSettings()
    else:
        return errorResponses.FOUR_O_O

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
def restoreBackup(serviceaccountkey: ServiceAccountKey | None = None):
    if serviceaccountkey:
        data_conector.createServiceAccountKeyFile(jsonable_encoder(serviceaccountkey))
        return JSONResponse(status_code=200,
                            content = {
                                "error": "Success",
                                "code": 200,
                            })
    else:
        return errorResponses,FOUR_O_O
