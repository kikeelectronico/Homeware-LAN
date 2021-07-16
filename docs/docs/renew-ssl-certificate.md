---
id: renew-ssl-certificate
title: Renew the SSL certificate - bare metal
sidebar_label: SSL certificate
---

Remember that the SSL certificate that you have installed will be revoked 3 months after creation. When this happen renew it running Certbot again:
```
sudo certbot --nginx
```
Make sure that the 80 WAN port is forwarding to the 80 port of the Raspberry Pi.

You can find the revoke date using your web browser:

1. Go to you Homeware panel.
2. Click on the padlock that appear on the left side of the URL.
3. Click on _Certificate_.
