import React, {useState} from "react";

import getCookieValue from "../../../functions";
import { root } from "../../../constants";
import {Button, TextField} from '@mui/material';

function Password({ setAlert }) {
  const [current_pass, setCurrentPass] = useState("")
  const [new_pass_1, setNewPass1] = useState("")
  const [new_pass_2, setNewPass2] = useState("")

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
    <div className="page_block_container">
      <h2>Change password</h2>
      <div className="advise">
        <span>Change the password of the admin user.</span>
      </div>
      <hr />
      <div className="page_block_content_container">
        <div className="two_table_row">
          <div className="two_table_cel two_table_label">Password</div>
          <div className="two_table_cel">
             <TextField
                type="password"
                id="pass"
                variant="outlined"
                className="two_input"
                onChange={(event) => setCurrentPass(event.target.value)}
              />
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel two_table_label">New password</div>
          <div className="two_table_cel">
            <TextField
                type="password"
                id="new_pass"
                variant="outlined"
                className="two_input"
                onChange={(event) => setNewPass1(event.target.value)}
              />
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel two_table_label">New password</div>
          <div className="two_table_cel">
            <TextField
                type="password"
                id="new_pass_2"
                variant="outlined"
                className="two_input"
                onChange={(event) => setNewPass2(event.target.value)}
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
  );
}

export default Password;
