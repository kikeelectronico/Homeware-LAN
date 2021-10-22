---
id: homegraphpy
title: HomeGraph.py file
sidebar_label: Back - homeGraph.py
---

This file contains a class that do requests to Google HomeGraph when needed. There are two types of requests.

*Sync* is used to inform HomeGraph that a definition of a device has changed.

*Report State* is used to inform HomeGraph that the status of a device has changed.

These methods can be called only from data.py file when something changes in the database in order to keep Google HomeGraph informed about the changes.