# Back end developmnet

## Install

Install Python3.

`sudo apt-get update`
`sudo apt-get install python3.7 python3-pip`

Install Redis.

`sudo apt install redis-server`

Install Mosquitto.

`sudo apt install mosquitto mosquitto-clients`

Install CURL.

`sudo apt install curl`

Create a virtual enviroment.

`virtualenv env`

Activate the virtual enviroment (Run it always before start developing).

`source env/bin/activate`

Install all dependencies.

`cd back`

`pip3 install install -r requirements.txt`

Install and run the back end following the back end README.

## Run Redis

`redis-server`

## Run the API developemt server

Make sure that the Redis server is running.

`python3 homeware.py`

If it is the first time you run the API you must set an user and a hostname.

`curl -d '{"user":"user", "pass":"password"}' -H "Content-Type: application/json" -X POST http://localhost:5001/api/user/set/`

`curl -X GET http://localhost:5001/api/settings/domain/localhost:5001/`

`curl -X GET http://localhost:5001/api/settings/setAssistantDone/`

## Running the Task manager

Make sure that the Redis server is running.

`python3 homewareTasks.py`

## Running the MQTT manager

Make sure that the Redis server is running.

`python3 homewareMQTT.py`
