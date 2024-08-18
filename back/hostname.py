import os

MQTT_HOST = os.environ.get("MQTT_HOST", "localhost")
MQTT_PORT = os.environ.get("MQTT_PORT", 1883)
REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
REDIS_PORT = os.environ.get("REDIS_PORT", 6379)
MONGO_HOST = os.environ.get("MONGO_HOST", "localhost")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)