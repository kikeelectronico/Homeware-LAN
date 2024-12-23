import React, {useState} from "react";
import {Button} from '@mui/material';

import Toast from "../web/Toast";
import getCookieValue from "../../functions";
import { root } from "../../constants";

function Backup() {

  const [alert, setAlert] = useState(null)

  const formatTimestamp = (timestamp) => {
    let a = new Date(timestamp * 1000);
    return a.getDate() + '-' + a.getMonth() + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds() ;
  }

  const backup = () => {
    setAlert({severity: "warning", text: "Downloading backup."})
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          const blob = new Blob([http.responseText], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "homeware " + formatTimestamp(Date.now()/1000) + ".json";
          link.href = url;
          link.click();
        } else {
          console.error(http.statusText);
          setAlert({severity: "error", text: "Something went wrong."})
        }
      }
    }
    http.open("GET", root + "api/backup");
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send();
  }

  const restore = (e) => {
    if (e.target.files) {
      var fileReader = new FileReader();
      fileReader.onload=function(){
        const backup = fileReader.result
        var http = new XMLHttpRequest();
        http.onload = function (e) {
          if (http.readyState === 4) {
            if (http.status === 200) {
              setAlert({severity: "success", text: "Uploaded correctly."})
            } else {
              setAlert({severity: "error", text: "Something went wrong."})
            }
          }
        }
        http.open("PUT", root + "api/backup");
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
        http.send(backup);
      }
      fileReader.readAsText(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className="page_block_container">
        <h2>Backup</h2>
        <div className="advise">
          <span>Download a backup file.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <Button variant="contained" onClick={backup}>Backup</Button>
        </div>
      </div>
      <div className="page_block_container">
        <h2>Restore</h2>
        <div className="advise">
          <span>Restore a backup file.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <input id="file" type="file" onChange={restore} />
        </div>
      </div>
      <Toast alert={alert}/>
    </div>
  );
  
}

export default Backup;
