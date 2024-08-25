from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from data import Data
import errorResponses

router = APIRouter()
data_conector = Data()

@router.get("/api/user/validateToken")
@router.get("/api/user/validateToken/")
def validateUserToken(token: Annotated[str | None, Header()] = None):
    if token:
        return {
            'status': 'in' if data_conector.validateUserToken(token) else "fail"
        }
    else:
        return errorResponses.FOUR_O_O

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