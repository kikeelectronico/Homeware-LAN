# Backend developmnet

## Install

Install Python3.

`sudo apt-get update`
`sudo apt-get install python3.7 python3-pip`

Install Redis.

`sudo apt install redis-server`

Install Mosquitto.

`sudo apt install mosquitto mosquitto-clients`


Create a virtual enviroment.

`cd back`

`virtualenv env`

Activate the virtual enviroment (Run it always before start developing).

`source env/bin/activate`

Install all dependencies.

`pip3 install install -r requirements.txt`

Install and run the backend following the backend README.

## Run Redis

`redis-server`

## Run the API developemt server

Make sure that the Redis server is running.

`python3 homeware.py`

## Running the Task manager

Make sure that the Redis server is running.

`python3 homewareTasks.py`

## Running the MQTT manager

Make sure that the Redis server is running.

`python3 homewareMQTT.py`
