---
id: homewaremqttpy
title: HomewareMQTT.py file
sidebar_label: Back - homewareMQTT.py
---

This file contain functions that connect to the MQTT broker and subscribe to some topics.

## on_message

Runs when the connection with the broker is established.

## on_message

Runs when a message is received from the broker. It filters by topic and take actions.

## mqttReader

It is the entry point, set up the MQTT client and connects with the broker.

## control

Analyse the data received on _devices/control_ topic.