import os
from fastapi import FastAPI
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

# Constants
UPLOAD_FOLDER = '../'
ALLOWED_EXTENSIONS = {'json'}
FOUR_O_ONE = {
    'error': 'Bad authentication',
    'code': 401,
    'note': 'See the documentation https://homeware.enriquegomez.me/api-docs.html'
}
FOUR_O_FOUR = {
    'error': 'Not found',
    'code': 404,
    'note': 'See the documentation https://homeware.enriquegomez.me/api-docs.html'
}
FOUR_O_O = {
    'error': 'Operation not supported',
    'code': 400,
    'note': 'See the documentation https://homeware.enriquegomez.me/api-docs.html'
}
TWO_O_O = {
    'status': 'Success',
    'code': 200
}

app = FastAPI()

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