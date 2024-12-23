import React, {useState, useEffect} from "react";

import Toast from "../web/Toast";
import getCookieValue from "../../functions";
import { root } from "../../constants";
import {Button} from '@mui/material';

function Access () {

  const [data, setData] = useState({apikey: ""})
  const [current_pass, setCurrentPass] = useState("")
  const [new_pass_1, setNewPass1] = useState("")
  const [new_pass_2, setNewPass2] = useState("")
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          setData(data[0])
        } else {
          console.error(http.statusText);
          setAlert({severity: "error", text: "Unable to load the data."})
        }
      }
    }
    http.open("GET", root + "api/access");
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send();
  }, [])

  const createAPIKey = () => {
    setAlert({severity: "warning", text: "Generating API key."})
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          window.location.href = "/access";
          setAlert({severity: "success", text: "API key generated."})
        } else {
          console.error(http.statusText);
          setAlert({severity: "error", text: "Something went wrong."})
        }
      } else {
        setAlert({severity: "error", text: "Something went wrong."})
      }
    };
    http.open("PATCH", root + "api/access/");
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send();
  }

  const changePassword = () => {    
    if (new_pass_1 !== new_pass_2) {
      setAlert({severity: "warning", text: "The passwords are not equal."})
    } else {
      setAlert({severity: "warning", text: "Changing password."})
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            setAlert({severity: "success", text: "Password changed."})
          } else {
            setAlert({severity: "error", text: "The changes haven't been saved."})
          }
        } else {
          setAlert({severity: "error", text: "The changes haven't been saved."})
        }
      };
      http.open("POST", root + "api/user/password");
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.setRequestHeader(
        "authorization",
        "bearer " + getCookieValue("token")
      );
      http.send(
        JSON.stringify({
          password: current_pass,
          new_password: new_pass_1,
        })
      );
    }
  };

 
  return (
    <div>
      <div className="page_block_container">
        <h2>API key</h2>
        <div className="advise">
          <span>The API Key gives you access to the Homeware's API. Please do not generate an API Key if you are not sure of what you are doing.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">API Key</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                id="apikey"
                value={data.apikey}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="page_block_buttons_container">
          <Button variant="contained" onClick={createAPIKey}>Generate</Button>
        </div>
      </div>

      <div className="page_block_container">
        <h2>Change password</h2>
        <div className="advise">
          <span>Change the password of the admin user.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">Password</div>
            <div className="two_table_cel">
              <input
                type="password"
                className="two_input"
                id="pass"
                onChange={(event) =>
                  setCurrentPass(event.target.value)
                }
              />
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">New password</div>
            <div className="two_table_cel">
              <input
                type="password"
                className="two_input"
                id="new_pass"
                onChange={(event) => {
                  setNewPass1(event.target.value)
                }}
              />
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">New password</div>
            <div className="two_table_cel">
              <input
                type="password"
                className="two_input"
                id="new_pass_2"
                onChange={(event) => {
                  setNewPass2(event.target.value)
                }}
              />
            </div>
          </div>
        </div>

        <div className="page_block_buttons_container">
            <Button
              variant="contained"
              onClick={changePassword}
              disabled={new_pass_1.length === 0 || new_pass_2.length === 0}
            >
              Change
            </Button>
        </div>
      </div>
      <Toast alert={alert}/>
    </div>
  );
  
}

export default Access;
