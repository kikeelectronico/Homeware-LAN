---
id: reset-user
title: Change username or password
sidebar_label: Change username or password
---

## If you remember your old password

You can change your password from the Homeware control panel. Go to _Access_ > _Change password_.

The username can't be change in a fashion way.

## If you forgot your username or password

You can change your username and password resetting the user.

1. SSH your Raspberry Pi.

2. Open the Redis client.

```
redis-cli
```

3. Find the secure data and copy it into a text editor.

```
get secure
```

4. Find your username in the text.

```
 ... \"user\": \"<your-username>\" ...
```

5. Erase the username.

```
 ... \"user\": \"\" ...
```

6. Copy all the text to the clipboard and set it using the Redis client.

```
set secure <the-content-of-your-clipboard>
```

7. Close the Redis client

```
exit
```

8. Restart Homeware.

```
sudo systemctl restart homeware
```

9. Set the new username and password.

```
curl -d '{"user":"<your-username>", "pass":"<your-password>"}' -H "Content-Type: application/json" -X POST http://localhost:5001/api/user/set/
```
