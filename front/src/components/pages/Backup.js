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
    const url = root + "files/buckup/homeware/" + getCookieValue("token") + "?code=" + String(Math.random());
    window.open(url, '_blank')
  }

  return (
    <div>
      <div className="page_block_container">
        <h2>Backup</h2>
        <hr />
        <div className="page_block_content_container">
          <Button variant="contained" onClick={backup}>Backup</Button>
        </div>
        <div className="advise">
          <span>Download a backup file.</span>
        </div>
      </div>
      <div className="page_block_container">
        <h2>Restore</h2>
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
        <div className="advise">
          <span>Restore a backup file.</span>
        </div>
      </div>
      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Backup;
