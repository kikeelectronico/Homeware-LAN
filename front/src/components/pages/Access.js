import React, {useState, useEffect} from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";
import {Button} from '@mui/material';

function Access () {

  const [data, setData] = useState({apikey: ""})
  const [current_pass, setCurrentPass] = useState("")
  const [new_pass_1, setNewPass1] = useState("")
  const [new_pass_2, setNewPass2] = useState("")

  useEffect(() => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          setData(data)
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong. Unable to load the data.");
        }
      }
    }
    http.open("GET", root + "api/access/get/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }, [])

  const generateAPIKey = () => {
    ToastsStore.warning("Generating API key");
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          window.location.href = "/access";
          ToastsStore.success("Generated");
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong.");
        }
      } else {
        ToastsStore.error("Something went wrong");
      }
    };
    http.open("GET", root + "api/access/create/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }

  const changePassword = () => {    
    if (new_pass_1 !== new_pass_2) {
      ToastsStore.warning("The passwords are not equal");
    } else {
      ToastsStore.warning("Changing");
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            ToastsStore.success("Changed");
          } else {
            ToastsStore.success("Error, the changes haven't been saved.");
          }
        } else {
          ToastsStore.success("Error, the changes haven't been saved.");
        }
      };
      http.open("POST", root + "api/user/password/");
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      http.send(
        JSON.stringify({
          pass: current_pass,
          new_pass: new_pass_1,
        })
      );
    }
  };

 
  return (
    <div>
      <div className="page_block_container">
        <h2>API key</h2>
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
          <Button variant="contained" onClick={generateAPIKey}>Generate</Button>
        </div>
        <div className="advise">
          <span>
            The API Key gives you access to the Homeware's API. Please do not
            generate an API Key if you are not sure of what you are doing.
          </span>
        </div>
      </div>

      <div className="page_block_container">
        <h2>Change password</h2>
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
      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Access;
