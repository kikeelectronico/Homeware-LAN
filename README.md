# Homeware-LAN
Homeware for Raspberry Pi. This is an alternative for <a href="https://github.com/kikeelectronico/Homeware" target="blanck">Homeware</a> that works in a Raspberry Pi instead of Firebase.

# Homeware-LAN is under develop.

This API creates an integration between hardware devices like ESP8266 or Arduino and the Google Assitant using a Raspberry Pi for the backend.

<img alt="Super Grover" src="https://github.com/kikeelectronico/homeware/raw/master/images/cloud.png" />

Homeware is not finished yet.

## Advice
Use only released versions: <a href="https://github.com/kikeelectronico/Homeware-LAN/releases/latest">Last released</a>

## Stay up to date
Subscribe to this Telegram channel: [https://t.me/homeware_up_to_date](https://t.me/homeware_up_to_date)

## Supported Devices and traits

All traits and devices are supported under an experimental function. If you see something wrong, please open an issue: [https://github.com/kikeelectronico/Homeware-LAN/issues/new](https://github.com/kikeelectronico/Homeware-LAN/issues/new)

## To Do list

<a href="https://github.com/kikeelectronico/Homeware-LAN/projects/1"> API Project </a>

## How to

In order to works, you need to use a Raspberry Pi and a hardware device like an ESP8266 or similar. Follow this steps:

1. Clone this repository on your Raspberry Pi.
2. Run:
```
cd Homeware-LAN
```
```
sudo sh bash/install.sh
```
```
pyhton3 homeware.py
```
2. Open a web browser and go to your Raspberry Pi IP follow by ```:50001```. For example ```192.168.1.150:5001```.
3. Follow the assistant instructions that appear on the web browser.
4. Use the example at ESP8266example to connect to Homeware using an ESP8266. It is a simple MQTT.

## Google guides

You can check the <a href="https://developers.google.com/actions/smarthome/"> Google guides </a>

## Help

Any idea will be well received!
