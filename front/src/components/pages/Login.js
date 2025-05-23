import React, {useState} from "react";
import {Button} from '@mui/material';
import { root } from '../../constants'

import './Login.css'

function Login() {

  const [enable_message, setEnableMessage] = useState(false)
  const [message, setMessage] = useState("")

  const login = () => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      var response = JSON.parse(http.responseText);
      if(response['valid']){
        // document.cookie = "user=" + response['user'] + "; path=/";
        document.cookie = "token=" + response['token'] + "; path=/";
        window.location = '/';
      } else {
        setEnableMessage(true)
        setMessage("Incorrect User or Password")
        setTimeout(() => setEnableMessage(false), 5000)
      }
    }
    http.open("GET", root + "api/user/login");
    http.setRequestHeader('username', document.getElementById('username').value)
    http.setRequestHeader('password', document.getElementById('password').value)
    http.send();
  }

  const grantAccess = () => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      var response = JSON.parse(http.responseText);
      if(response['valid']) {
        window.location = response['url']
      } else {
        setEnableMessage(true)
        setMessage("Incorrect User or Password")
        setTimeout(() => setEnableMessage(false), 5000)
      }
    }
    http.open("GET", root + "api/user/googleSync");
    http.setRequestHeader('username', document.getElementById('username').value)
    http.setRequestHeader('password', document.getElementById('password').value)
    http.send();
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
