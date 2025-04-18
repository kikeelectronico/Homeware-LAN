from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from data import Data
import errorResponses
from security.authentication import allowUser

router = APIRouter()
data_conector = Data()

class TokenValidation(BaseModel):
    valid: str

@router.get("/api/user/validateToken")
@router.get("/api/user/validateToken/", include_in_schema=False) # Legacy
def validate_user_token(token: Annotated[str | None, Header()] = None) -> TokenValidation:
    if token:
        return {
            "valid": data_conector.validateUserToken(token)
        }
    else:
        return {
            "valid": False
        }

class UserSesion(BaseModel):
    username: str
    token: str
    valid: str

@router.get("/api/user/login")
@router.get("/api/user/login/", include_in_schema=False) # Legacy
def user_login(username: Annotated[str | None, Header()] = None, password: Annotated[str | None, Header()] = None) -> UserSesion:
    if username is None or password is None:
        return errorResponses.FOUR_O_O

    token = data_conector.login(username, password)
    return {
        'username': username,
        'token': token if token is not None else "",
        'valid': token is not None
    }

    
@router.get("/api/user/googleSync", include_in_schema=False)
@router.get("/api/user/googleSync/", include_in_schema=False) # Legacy
def googleSync(username: Annotated[str | None, Header()] = None, password: Annotated[str | None, Header()] = None):
    if username is None or password is None:
        return errorResponses.FOUR_O_O
    
    url = data_conector.googleSync(username, password)
    return {
            'username': username,
            'url': url if url is not None else "",
            'valid': url is not None
        }

class Password(BaseModel):
    password: str
    new_password: str

@router.put("/api/user/password", dependencies=[Depends(allowUser)])
@router.post("/api/user/password", dependencies=[Depends(allowUser)], include_in_schema=False) # Legacy
@router.post("/api/user/password/", dependencies=[Depends(allowUser)], include_in_schema=False) # Legacy
def change_user_password(password: Password | None = None):
    if password is None:
        return errorResponses.FOUR_O_O
    
    updated = data_conector.updatePassword(password.password, password.new_password)
    return {
        "message": "Updated" if updated else "Fail, the password hasn't been changed"
    }

