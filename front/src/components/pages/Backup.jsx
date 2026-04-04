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
    setAlert({severity: "warning", text: "Downloading the backup file."})
    fetch(root + "api/backup", {
      method: "GET",
      headers: {
        "authorization": "bearer " + getCookieValue("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "homeware " + formatTimestamp(Date.now()/1000) + ".json";
      link.href = url;
      link.click();
    })
    .catch(error => {
      console.error("Error fetching backup:", error);
      setAlert({severity: "error", text: "Something went wrong."});
    });
  }

  const restore = (e) => {
    if (e.target.files) {
      var fileReader = new FileReader();
      fileReader.onload=function(){
        setAlert({severity: "warning", text: "Uploading the file."})
        const backup = fileReader.result
        fetch(root + "api/backup", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "authorization": "bearer " + getCookieValue("token")
          },
          body: backup
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setAlert({severity: "success", text: "File uploaded."});
        })
        .catch(error => {
          console.error("Error uploading backup file:", error);
          setAlert({severity: "error", text: "Something went wrong."});
        });
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
