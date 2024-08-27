import React, {useEffect} from "react";
import {Button} from '@mui/material';
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";

function Backup() {

  useEffect(() => {
    var url = new URL(window.location);
    var _status = url.searchParams.get("status");
    if(_status === "Success")
      ToastsStore.success("Uploaded correctly");
  }, [])

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
          <form
            id="restore-form"
            method="post"
            encType="multipart/form-data"
            action={root + "files/restore/homeware/" + getCookieValue("token") + "/"}
          >
            <input type="file" name="file" />
            <Button variant="contained" onClick={() => {document.getElementById("restore-form").submit()}}>Restore</Button>
          </form>
        </div>
      </div>
      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Backup;
