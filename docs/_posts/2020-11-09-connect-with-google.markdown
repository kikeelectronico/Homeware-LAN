---
layout: post
title: Connect Homeware with Google
date: 2020-11-09 12:40:00 +0200
img: post/connect-with-google.jpg
tags: intall begin connect google
---

Once you have installed Homeware in your server, you must tell Google where your server is. Follow this instrucctions:

This is **important**.
- Follow this steps one by one and in order.
- Be patient
- Use the same Google account in all steps

## Activity Controls

Go to <a href="https://myaccount.google.com/activitycontrols" target="blanck">Activity Control</a> by Google and enable:

- Web & App Activity
- Device Iformation
- Voice & Audio Activity


<kbd>
<img src="https://github.com/kikeelectronico/homeware/raw/master/images/B1C1.png" width="400"/>
</kbd>
<kbd>
<img src="https://github.com/kikeelectronico/homeware/raw/master/images/B1C2.png" width="400"/>  <img src="https://github.com/kikeelectronico/homeware/raw/master/images/B1C3.png" width="400"/>
</kbd>

## Actions on Google Project

Go to <a href="https://console.actions.google.com/" target="blanck">Actions on Google console</a>.

1. Select `New project`.
2. Write a name for the project.

<kbd>
<img src="https://github.com/kikeelectronico/homeware/raw/master/images/B2C2.png"/>
</kbd>

3. Select `Home control`.

<kbd>
<img src="https://github.com/kikeelectronico/homeware/raw/master/images/B2C3.png"/>
</kbd>

4. Select `Smart home`.

<kbd>
<img src="https://github.com/kikeelectronico/homeware/raw/master/images/B2C4.png"/>
</kbd>

5. Go to `Develop` from the top menu and select `Invocation` in the left side menu.

6. Write `Home` as Display Name and click `Save`.

7. Select `Develop` from the top menu and then select `Actions` in the left side menu.

8. Add the fullfillment URL using your domain.

```Markdown
https://<your.domain.com>/smarthome/
```
9. Select `Save`.

10. Go to `Account Linking` in the left side menu.

11. Enter the Client Information that the Homeware assistant gives you and click `Next`:

12. Enable `Google to transmit clientID and secret via HTTP basic auth header` in Configure your Client and clicking 'Save'.

13. Go to the `Test` section in the top menu.

14. Select `START TESTING`.

## Link your Account

Use your smartphone to link the project. The Home App changes frequently, so it is possible that this steps are not correct.

1. Open Google Home App.

2. Select the `+` button at the top left corner.

3. Select 'Set a device'.

4. Select `Works with Google`.

5. Select the options that looks like:

```Markdown
[test] Home
```

Up & running

Now we should see a light called Bulb in our Google Home App.

Note: If you open the Bulb in the Home App and the Bulb it is not online (there isn't any hardware bulb) the app will say `Not responding` and the `online` will change to false in the database. This is normal, it is part of the API.

...

Image credit: [Myriams-Fotos](https://pixabay.com/es/photos/fideos-espagueti-pasta-anudado-4851996/)
