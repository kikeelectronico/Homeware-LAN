import React, {useEffect} from "react";
import {Button} from '@mui/material';
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";

function Backup() {

  const backup = () => {
    ToastsStore.warning("Downloading");
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          const blob = new Blob([http.responseText], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "homeware.json";
          link.href = url;
          link.click();
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong");
        }
      }
    }
    http.open("GET", root + "api/backup/get/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
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
              ToastsStore.success("Uploaded correctly");
            } else {
              ToastsStore.error("Something went wrong");
            }
          }
        }
        http.open("PUT", root + "api/backup");
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
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
      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Backup;
