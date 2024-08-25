from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from data import Data
import errorResponses
from security.authentication import allowUser

router = APIRouter()
data_conector = Data()

@router.get("/api/user/validateToken")
@router.get("/api/user/validateToken/")
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
@router.get("/api/user/login/")
def login(username: Annotated[str | None, Header()] = None,
            password: Annotated[str | None, Header()] = None):
    if username and password:
        token = data_conector.login(username, password)
        return {
            'status': 'in' if token is not None else "fail",
            'user': username,
            'token': token if token is not None else ""
        }
    else:
        return errorResponses.FOUR_O_O

class Password(BaseModel):
    password: str
    new_password: str

@router.post("/api/user/password", dependencies=[Depends(allowUser)])
@router.post("/api/user/password/", dependencies=[Depends(allowUser)])
def validateUserToken(password: Password | None = None):
    if password:
        updated = data_conector.updatePassword(password.password, password.new_password)
        return {
            "message": "Updated" if updated else "Fail, the password hasn't been changed"
        }
    else:
        return errorResponses.FOUR_O_O