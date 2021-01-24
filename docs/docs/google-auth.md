---
id: google-auth
title: Google auth for synchronization
sidebar_label: Google auth for sync
---

Homeware can inform Google automatically when a change is made in a device. For example, if you change the name of a device, this change will be sync with Google and Google Home immediately.

## Enable the Google Homegrah API

1. Go to HomeGraph API in the Google Cloud Console: https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview

2. Click _Enable_.

## Generate a Service Account Key

1. Go to _Create service account key_ in the Google Cloud Console: https://console.cloud.google.com/apis/credentials/serviceaccountkey

2. Select _New service account_ from the _Service account_ list.

3. Type a name and an id. For example: Homeware-account-key.

4. Give the account the proper _Role_: _Service Accounts_ > _Service Account Token Creator_.

5. Select _JSON_ for the key type.

6. Click _Create_. A JSON file will be downloaded.

This JSON file gives you access to your Homeware project in Google Cloud, don't share it with anyone.

## Upload the file

1. Go to _Settings_ in the Homeware-LAN control panel.

2. Find _Automatic Sync with Google_.

3. Upload the JSON file.
