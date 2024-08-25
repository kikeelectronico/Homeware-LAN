
from fastapi import HTTPException, status, Header, Request
from typing import Annotated

from data import Data

data_conector = Data()

def allowUser(request: Request, authorization: Annotated[str | None, Header()] = None):
    if authorization:
        token = authorization.split(" ")[1]
        if not data_conector.validateUserToken(token):
            data_conector.log('Alert', f'Request to API endpoint {request.url.path} with bad authentication')
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="A valid token is needed")
    else:
        data_conector.log('Alert', f'Request to API endpoint {request.url.path} without authentication')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="A valid token is needed")
        


def allowAPIkey(request: Request, authorization: Annotated[str | None, Header()] = None):
    if authorization:
        token = authorization.split(" ")[1]
        if not data_conector.validateAPIKey(token):
            data_conector.log('Alert', f'Request to API endpoint {request.url.path} with bad authentication')
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="A valid token is needed")
    else:
        data_conector.log('Alert', f'Request to API endpoint {request.url.path} without authentication')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="A valid token is needed")
        


def allowAuthenticated(request: Request, authorization: Annotated[str | None, Header()] = None):
    if authorization:
        token = authorization.split(" ")[1]
        if not data_conector.validateAPIKey(token) and not data_conector.validateUserToken(token):
            data_conector.log('Alert', f'Request to API endpoint {request.url.path} with bad authentication')
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="A valid token is needed")
    else:
        data_conector.log('Alert', f'Request to API endpoint {request.url.path} without authentication')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="A valid token is needed")
        
