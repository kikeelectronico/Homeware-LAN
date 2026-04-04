import React, {useState} from "react";
import {Button} from '@mui/material';
import { root } from '../../constants'

import './Login.css'

function Login() {

  const [enable_message, setEnableMessage] = useState(false)
  const [message, setMessage] = useState("")

  const login = () => {
    fetch(root + "api/user/login", {
      method: "GET",
      headers: {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(response => {
      if (response['valid']) {
        document.cookie = "token=" + response['token'] + "; path=/";
        window.location = '/';
      } else {
        setEnableMessage(true);
        setMessage("Incorrect User or Password");
        setTimeout(() => setEnableMessage(false), 5000);
      }
    })
    .catch(error => {
      console.error("Error logging in:", error);
      setEnableMessage(true);
      setMessage("Unable to login. Please try again.");
      setTimeout(() => setEnableMessage(false), 5000);
    });
  }

  const grantAccess = () => {
    fetch(root + "api/user/googleSync", {
      method: "GET",
      headers: {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(response => {
      if (response['valid']) {
        window.location = response['url'];
      } else {
        setEnableMessage(true);
        setMessage("Incorrect User or Password");
        setTimeout(() => setEnableMessage(false), 5000);
      }
    })
    .catch(error => {
      console.error("Error syncing Google account:", error);
      setEnableMessage(true);
      setMessage("Unable to sync. Please try again.");
      setTimeout(() => setEnableMessage(false), 5000);
    });
  }

  const submit = () => {
    if (document.getElementById('username').value.length > 0
        && document.getElementById('password').value.length > 0) {
      if(!window.location.href.includes('google')) {
        login()
      } else {
        grantAccess()
      }
    }
  }

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 13) {
      submit()
    }
  }

  return (
    <div className="login_form_container">
      { window.location.href.includes('google') ? <p>Google requests access to Homeware-Lan</p> : '' }
      <br/>
      <span className="login_element">Username</span>
      <input type="text" name="username" id="username" className="login_input"/>
      <span className="login_element">Password</span>
      <input type="password" name="password" id="password" className="login_input"/>
      <Button variant="contained" onClick={submit}>
        <span>{ !window.location.href.includes('google') ? "Login" : "Grant access" }</span>
      </Button>
      <br/>
      { enable_message ? <div className="alert_message"> { message } </div> : <></>}
    </div>
  );
}

export default Login
