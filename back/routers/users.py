from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from data import Data
import errorResponses
from security.authentication import allowUser

router = APIRouter()
data_conector = Data()

@router.get("/api/user/validateToken")
@router.get("/api/user/validateToken/") # Legacy
def validateUserToken(token: Annotated[str | None, Header()] = None):
    if token:
        return {
            "status": "in" if data_conector.validateUserToken(token) else "fail"
        }
    else:
        return {
            "status": "fail"
        }

@router.get("/api/user/login")
@router.get("/api/user/login/") # Legacy
def login(username: Annotated[str | None, Header()] = None, password: Annotated[str | None, Header()] = None):
    if username is None or password is None:
        return errorResponses.FOUR_O_O

    token = data_conector.login(username, password)
    return {
        'status': 'in' if token is not None else "fail",
        'user': username,
        'token': token if token is not None else ""
    }

    
@router.get("/api/user/googleSync")
@router.get("/api/user/googleSync/") # Legacy
def googleSync(username: Annotated[str | None, Header()] = None, password: Annotated[str | None, Header()] = None):
    if username is None or password is None:
        return errorResponses.FOUR_O_O
    
    url = data_conector.googleSync(username, password)
    return {
            'status': 'in' if url is not None else "fail",
            'user': username,
            'url': url if url is not None else ""
        }

class Password(BaseModel):
    password: str
    new_password: str

@router.put("/api/user/password", dependencies=[Depends(allowUser)])
@router.post("/api/user/password", dependencies=[Depends(allowUser)]) # Legacy
@router.post("/api/user/password/", dependencies=[Depends(allowUser)]) # Legacy
def validateUserToken(password: Password | None = None):
    if password is None:
        return errorResponses.FOUR_O_O
    
    updated = data_conector.updatePassword(password.password, password.new_password)
    return {
        "message": "Updated" if updated else "Fail, the password hasn't been changed"
    }

