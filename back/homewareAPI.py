import os
from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
import json
import time
from datetime import datetime
import random
import paho.mqtt.publish as publish
import subprocess
from gevent import monkey

from data import Data
from commands import Commands
import hostname

from routers import devices, log, users, system

# Constants
UPLOAD_FOLDER = '../'
ALLOWED_EXTENSIONS = {'json'}

app = FastAPI()
app.include_router(devices.router)
app.include_router(log.router)
app.include_router(users.router)
app.include_router(system.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
responseURL = ''

# Init the data managment object
data_conector = Data()

# Init command executor
commands = Commands(data_conector)

@app.get("/test")
def testEndPoint():
    return "Load"

if __name__ == "__main__":
   import uvicorn
   uvicorn.run(
        "homewareAPI:app",
        host="0.0.0.0",
        port=5001,
        reload=True,
    )