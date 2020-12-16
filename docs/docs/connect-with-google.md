---
id: connect-with-google
title: Connect Homeware with Google
sidebar_label: Connect with Google
---

Once you have installed Homeware in your server, you must tell Google where your server is. Follow this instrucctions:

This is **important**.
- Follow this steps one by one and in order.
- Be patient
- Use the same Google account in all steps

## Actions on Google Project

Go to <a href="https://console.actions.google.com/" target="blanck">Actions on Google console</a>.

1. Select `New project`.
2. Write a name for the project.

<img src="/Homeware-LAN/img/connect-with-google/S2C1.png"/>

3. Select `Smart Home` and then click `Start Building`.

<img src="/Homeware-LAN/img/connect-with-google/S2C2.png"/>

4. Go to `Develop` from the top menu, select `Invocation` in the left side menu, write `Home` as *Display Name* and click `Save`.

<img src="/Homeware-LAN/img/connect-with-google/S2C3.png"/>

5. Select `Actions` in the left side menu, add the *Fulfillment URL* using your domain and click `Save`

> - Fulfillment URL: `https://<your.domain.com>/smarthome/`


<img src="/Homeware-LAN/img/connect-with-google/S2C4.png"/>

6. Go to `Account Linking` in the left side menu. Enter the client information that the Homeware assistant gives you and click `Next`.

> - Client ID: `123`
- Client Secret: `456`
- Authorization URL: `https://<your.domain.com>/auth/`
- Token URL: `https://<your.domain.com>/token/`

<img src="/Homeware-LAN/img/connect-with-google/S2C5.png"/>

7. Skip this step by clicking `Next`.

<img src="/Homeware-LAN/img/connect-with-google/S2C6.png"/>

8. Enable *Google to transmit clientID and secret via HTTP basic auth header*, click `Next` and the click `Save`.

<img src="/Homeware-LAN/img/connect-with-google/S2C7.png"/>

## Link your Account

Use your smartphone to link the project.

1. Open Google Home App.

2. Select the `+` button at the top left corner.

3. Select `Set a device`.

4. Select `Works with Google`.

5. Select the options that looks like: *[test] Home*

Up & running

Now you should see a light called Bulb in our Google Home App.
