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
    fetch(root + "api/access", {
      method: "GET",
      headers: {
        "authorization": "bearer " + getCookieValue("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setData(data[0]);
    })
    .catch(error => {
      console.error("Error fetching access data:", error);
      setAlert({severity: "error", text: "Unable to load the data."});
    });
  }, [])

  const createAPIKey = () => {
    setAlert({severity: "warning", text: "Generating API key."})
    fetch(root + "api/access/", {
      method: "PATCH",
      headers: {
        "authorization": "bearer " + getCookieValue("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.location.href = "/access";
      setAlert({severity: "success", text: "API key generated."});
    })
    .catch(error => {
      console.error("Error generating API key:", error);
      setAlert({severity: "error", text: "Something went wrong."});
    });
  }

  const changePassword = () => {    
    if (new_pass_1 !== new_pass_2) {
      setAlert({severity: "warning", text: "The passwords are not equal."})
    } else {
      setAlert({severity: "warning", text: "Changing password."})
      fetch(root + "api/user/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "authorization": "bearer " + getCookieValue("token")
        },
        body: JSON.stringify({
          password: current_pass,
          new_password: new_pass_1
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setAlert({severity: "success", text: "Password changed."});
      })
      .catch(error => {
        console.error("Error changing password:", error);
        setAlert({severity: "error", text: "The changes haven't been saved."});
      });
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
