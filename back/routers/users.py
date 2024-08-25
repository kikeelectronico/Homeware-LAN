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