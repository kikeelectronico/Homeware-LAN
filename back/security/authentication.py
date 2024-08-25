
from fastapi import HTTPException, status, Header
from typing import Annotated

from data import Data

data_conector = Data()

def allowUser(authorization: Annotated[str | None, Header()] = None):
    token = authorization.split(" ")[1]
    if not data_conector.validateUserToken(token):
        data_conector.log('Alert', 'Request to API endpoint with bad authentication')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="A valid token is needed")

def allowAPIkey(authorization: Annotated[str | None, Header()] = None):
    token = authorization.split(" ")[1]
    if not data_conector.validateAPIKey(token):
        data_conector.log('Alert', 'Request to API endpoint with bad authentication')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="A valid token is needed")

def allowAuthenticated(authorization: Annotated[str | None, Header()] = None):
    token = authorization.split(" ")[1]
    if not data_conector.validateAPIKey(token) and not data_conector.validateUserToken(token):
        data_conector.log('Alert', 'Request to API endpoint with bad authentication')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="A valid token is needed")