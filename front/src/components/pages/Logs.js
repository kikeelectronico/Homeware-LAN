import React, {useState, useEffect} from "react";
import {Button, Stack} from '@mui/material';

import Toast from "../web/Toast";
import getCookieValue from "../../functions";
import { root } from "../../constants";


import "./Logs.css";

function Logs () {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    fetch(root + "api/logs", {
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
      setData(data.reverse());
    })
    .catch(error => {
      console.error("Error fetching logs:", error);
      setAlert({severity: "error", text: "Unable to load the data."});
    });
  }, [])

  const loadMore = () => {
    if (page < data.length/10 - 1) setPage(page + 1)
  }

  const deleteLog = () => {
    setAlert({severity: "warning", text: "Deleting the old registers."})
    fetch(root + "api/logs", {
      method: "DELETE",
      headers: {
        "authorization": "bearer " + getCookieValue("token")
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setAlert({severity: "success", text: "Old logs deleted."});
    })
    .catch(error => {
      console.error("Error deleting logs:", error);
      setAlert({severity: "error", text: "Something went wrong"});
    });
  }

  const downloadLog = () => {
    setAlert({severity: "warning", text: "Downloading the log file."})
    let log_str = ""
    for(let i = 0; i < data.length; i++)
      log_str += formatTimestamp(data[i]["timestamp"]) + "\t" + data[i]["severity"] + "\t" + data[i]["message"] + "\n"
    const blob = new Blob([log_str], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "homeware " + formatTimestamp(Date.now()/1000) + ".log";
    link.href = url;
    link.click();
  }

  const formatTimestamp = (timestamp) => {
    let a = new Date(timestamp * 1000);
    return a.getDate() + '-' + a.getMonth() + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds() ;
  }

  return (
    <div>
      <div className="page_block_container">
        <h2>Homeware-LAN log</h2>
        <div className="advise">
          <span>Main log of Homeware.</span>
        </div>
        <hr />
        <div>
          {
            data.slice(0,page*10).map((register, i) => (
              <div className="logs_line" key={i}>
                {register.severity === "Log" ? <b>{register.severity}</b> : <></>}
                {register.severity === "Warning" ? <b className="logs_yellow">{register.severity}</b> : <></>}
                {register.severity === "Alert" ? <b className="logs_red">{register.severity}</b> : <></>}
                - {formatTimestamp(register.timestamp)}
                <br />
                {register.message}
              </div>
            ))
          }
        </div>
        <div className="page_block_buttons_container">
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={loadMore}>Load more</Button>
            <Button variant="contained" onClick={downloadLog}>Download</Button>
            <Button variant="contained" onClick={deleteLog}>Delete</Button>
          </Stack>
        </div>
      </div>
      
      <Toast alert={alert}/>
    </div>
  );
  
}

export default Logs;
