from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from enum import Enum
from typing import Annotated

from security.authentication import allowUser
from data import Data

router = APIRouter()
data_conector = Data()

class Severity(str, Enum):
    warning = "Warning"
    log = "Log"
    alert = "Alert"

class LogRegistry(BaseModel):
    agent: str
    severity: Severity
    message: str
    timestamp: float

@router.get("/api/logs", dependencies=[Depends(allowUser)])
def get_log() -> list[LogRegistry]:
    return data_conector.getLog()

@router.delete("/api/logs", dependencies=[Depends(allowUser)])
def delete_log() -> bool:
    return data_conector.deleteLog()

class Alerts(BaseModel):
    alert: str

@router.get("/api/alerts", dependencies=[Depends(allowUser)])
def get_alerts() -> Alerts:
    return data_conector.isThereAnAlert()

# Legacy

@router.get("/api/log/get", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/log/get/", dependencies=[Depends(allowUser)], include_in_schema=False)
def get_log_deprecated():
    return data_conector.getLog()

@router.get("/api/log/delete", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/log/delete/", dependencies=[Depends(allowUser)], include_in_schema=False)
def delete_log_deprecated():
    return data_conector.deleteLog()

@router.get("/api/log/alert", dependencies=[Depends(allowUser)], include_in_schema=False)
@router.get("/api/log/alert/", dependencies=[Depends(allowUser)], include_in_schema=False)
def get_alerts_deprecated():
    return data_conector.isThereAnAlert()