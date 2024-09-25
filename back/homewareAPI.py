import os
from fastapi import FastAPI, Header
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import BaseModel
import json
import time
from datetime import datetime
import paho.mqtt.publish as publish
import subprocess
from gevent import monkey

from data import Data
import hostname

# Init the data managment object
data_conector = Data()
data_conector.setup()
data_conector.migrateToMongodb()

from routers import access, backup, devices, google, log, users, settings, system

app = FastAPI()
app.include_router(access.router)
app.include_router(backup.router)
app.include_router(devices.router)
app.include_router(google.router)
app.include_router(log.router)
app.include_router(settings.router)
app.include_router(system.router)
app.include_router(users.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test", response_class=PlainTextResponse)
def testEndPoint():
    return "Load"

@app.get("/api/clock")
@app.get("/api/clock/")
def clock():
    ts = time.localtime(time.time())
    h = ts.tm_hour
    m = ts.tm_min
    return str(h) + ":" + str(m)

if __name__ == "__main__":
   import uvicorn
   uvicorn.run(
        "homewareAPI:app",
        host="0.0.0.0",
        port=5001,
        reload=True,
    )