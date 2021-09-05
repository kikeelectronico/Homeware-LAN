#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <EEPROM.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <SPI.h>

//      This example receibes shows via serial port both the mode and the temperature setpoint of the
// a thermostat. It alse send the real temperature reading the value froma BMP280 temperature sensor.

/* Remember to cahnge
 *  #define MQTT_MAX_PACKET_SIZE 128
 *  for
 *  #define MQTT_MAX_PACKET_SIZE 256
 *  in the PubSubClient library.
 */

 //Instructins
 //Change <thermostat-id> for the id of your thermostat in the line 125
 //Change <thermostat-id> for the id of your thermostat in the line 44
 //Change network setting:

const char* ssid = "your-wifi-ssid";
const char* password = "your-wifi-password";
const char* mqtt_server = "raspberry-pi-IP";
const char* mqtt_user = "your-mqtt-user";
const char* mqtt_user = "your-mqtt-password";

//Objects
WiFiClient espClient;
PubSubClient client(espClient);
Adafruit_BMP280 bmp;

//General
long lastMsg = 0;
char msg[50];
int value = 0;
char json_c[200];
char deviceMode[30];
int temperatureSetPoint = 0;
int thermostatTemperatureAmbient = 0;
bool sendSetPoint = false;
bool showSetPoint = false;
long int tempUpdateTimeStamp = 0;
char requestA[100] = "{\"id\":\"<thermostat-id>\",\"param\":\"thermostatTemperatureAmbient\",\"value\":";
char requestB[50] = ",\"intent\":\"rules\"}";
char request[300];

void setup_wifi() {

  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(2000);

  //Connect to sensor
  Wire.begin(D1,D2);
  if (!bmp.begin()) {
    Serial.println(F("Could not find the sensor, check wiring or I2C address"));
  }  else {
    Serial.println(F("Sensor Ok"));
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    json_c[i] = payload[i];
  }
  Serial.println();
  Serial.println(json_c);

  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, json_c);

  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
  } else {

    //You can use the different values of a thermostat
    //Example of a string value
    strcpy(deviceMode, doc[F("thermostatMode")]);
    //Example of a int value
    temperatureSetPoint = doc[F("thermostatTemperatureSetpoint")];

    Serial.print(deviceMode);
    Serial.print(" - ");
    Serial.println(temperatureSetPoint);

  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_password)) {
      delay(2000);
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("hello", "hello world");
      // ... and resubscribe
      client.subscribe("device/<thermostat-id>");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  //Send temperature to Homeware
  char thermostatTemperatureAmbientBuf[2];
  //Read the rempetarure from the sensor
  int i=bmp.readTemperature()-1;
  //If the ambient temperature has change
  if(thermostatTemperatureAmbient != i){
    //Convert the int variable from the sensor into a string variable.
    sprintf(thermostatTemperatureAmbientBuf, "%d", i);
    //Prepare the MQTT request with the temperature value.
    strcpy(request, requestA);
    strcat(request, thermostatTemperatureAmbientBuf);
    strcat(request, requestB);
    //Sernd the request
    client.publish("device/control", request);
    Serial.println(request);
    thermostatTemperatureAmbient = i;
  }


  delay(1000);
}
