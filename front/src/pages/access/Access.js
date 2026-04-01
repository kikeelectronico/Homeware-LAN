import React, {useState, useEffect} from "react";

import Toast from "../../components/web/Toast";
import getCookieValue from "../../functions";
import { root } from "../../constants";
import {Button, IconButton, TextField} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./Access.css";

function Access () {

  const [data, setData] = useState([])
  const [current_pass, setCurrentPass] = useState("")
  const [new_pass_1, setNewPass1] = useState("")
  const [new_pass_2, setNewPass2] = useState("")
  const [alert, setAlert] = useState(null)
  const [visibleKeys, setVisibleKeys] = useState(new Set())

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
      setData(Array.isArray(data) ? data : []);
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

  const deleteAPIKey = (id) => {
    if (!window.confirm("Do you want to delete the API key?")) {
      return;
    }
    fetch(root + "api/access/" + id, {
      method: "DELETE",
      headers: {
        "authorization": "bearer " + getCookieValue("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setData((prev) => prev.filter((item) => item._id !== id));
      setAlert({severity: "success", text: "API key deleted."});
    })
    .catch(error => {
      console.error("Error deleting API key:", error);
      setAlert({severity: "error", text: "The API key could not be deleted."});
    });
  }

  const toggleKeyVisibility = (index) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  const getMaskedKey = (apikey) => {
    const _apikey = apikey || "";
    return "•".repeat(_apikey.length);
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
    <>
      <div className="page_block_container">
        <h2>API key</h2>
        <div className="advise">
          <span>The API Key gives you access to the Homeware's API. Please do not generate an API Key if you are not sure of what you are doing.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          {data.length === 0 ? (
            <div className="advise">
              <span>No API keys found.</span>
            </div>
          ) : (
            <div className="access_key_list">
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="access_key_item">
                  <div className="access_key_row">
                    <span className="access_key_label">Agent</span>
                    <span className="access_key_value">{item.agent || "-"}</span>
                    <IconButton
                      aria-label="Delete API key"
                      size="small"
                      className="access_key_delete"
                      color="inherit"
                      onClick={() => deleteAPIKey(item["_id"])}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <div className="access_key_row">
                    <span className="access_key_label">API Key</span>
                    <span className="access_key_value">
                      {visibleKeys.has(index) ? (item.apikey || "-") : getMaskedKey(item.apikey)}
                    </span>
                    <IconButton
                      aria-label={visibleKeys.has(index) ? "Hide API key" : "Show API key"}
                      size="small"
                      className="access_key_toggle"
                      color="inherit"
                      onClick={() => toggleKeyVisibility(index)}
                    >
                      {visibleKeys.has(index) ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </div>
                </div>
                  <hr className="separator"/>
                </React.Fragment>
              ))}
            </div>
          )}
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
      <Toast alert={alert}/>
    </>
  );
  
}

export default Access;
