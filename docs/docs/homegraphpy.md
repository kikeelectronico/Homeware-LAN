---
id: homegraphpy
title: HomeGraph.py file
sidebar_label: Back - homeGraph.py
---

This file contains a class that do requests to Google HomeGraph when needed.

The methods can only be called from data.py file when something changes in the database in order to keep Google HomeGraph informed about the changes.

## requestSync

This method is used to inform HomeGraph that a definition of a device has changed.

## repostState

This method is used to inform HomeGraph that the status of a device has changed.

