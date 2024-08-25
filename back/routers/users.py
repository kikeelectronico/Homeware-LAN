from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from typing import Annotated

from data import Data

router = APIRouter()
data_conector = Data()

@router.get("/api/user/validateToken")
@router.get("/api/user/validateToken/")
def validateUserToken(token: Annotated[str | None, Header()] = None):
    response = {
        'status': 'in' if data_conector.validateUserToken(token) else "fail"
    }
    return response

@router.get("/api/user/login")
@router.get("/api/user/login/")
def login(username: Annotated[str | None, Header()] = None,
            password: Annotated[str | None, Header()] = None):
    token = data_conector.login(username, password)
    return {
        'status': 'in' if token is not None else "fail",
        'user': username,
        'token': token if token is not None else ""
    }