import React, {useState, useEffect} from "react";
import {Button, Stack} from '@mui/material';
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";


import "./Logs.css";

function Logs () {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          setData(data.reverse())
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong");
        }
      }
    }
    http.open("GET", root + "api/log/get/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }, [])

  const loadMore = () => {
    if (page < data.length/10 - 1) setPage(page + 1)
  }

  const downloadLog = () => {
    ToastsStore.warning("Downloading");
    const url = root + "files/download/log/" + getCookieValue("token");
    window.open(url, '_blank')
  }

  const deleteLog = () => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          ToastsStore.success("Deleted");
        } else {
          ToastsStore.error("Something went wrong");
        }
      }
    }
    http.open("GET", root + "api/log/delete/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
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
      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Logs;
