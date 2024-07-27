import React, {useState, useEffect} from "react";
import ReactJson from 'react-json-view'
import getCookieValue from '../../functions'
import { root } from '../../constants'

function Info() {

  const [id, setId] = useState("")
  const [device, setDevice] = useState({
      attributes: {},
      deviceInfo: {},
      id: "",
      name: {
        defaultnames: [],
        nicknames: [],
        name: ""
      },
      traits: [],
      type: ""
    })
  const [status, setStatus] = useState({online: true})

  useEffect(() => setId(window.location.pathname.split('/')[3]), [])

  useEffect(() => {
    if (id !== "") {
      var dev = new XMLHttpRequest();
      dev.onload = function (e) {
        if (dev.readyState === 4) {
          if (dev.status === 200) {
            var data = JSON.parse(dev.responseText);
            setDevice(data)
          } else {
            console.error(dev.statusText);
          }
        }
      }
      dev.open("GET", root + "api/devices/get/" + id + "/");
      dev.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      dev.send();

      var sta = new XMLHttpRequest();
      sta.onload = function (e) {
        if (sta.readyState === 4) {
          if (sta.status === 200) {
            var data = JSON.parse(sta.responseText);
            setStatus(data)
          } else {
            console.error(sta.statusText);
          }
        }
      }
      sta.open("GET", root + "api/status/get/" + id + "/");
      sta.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      sta.send();
    }
  }, [id])

  return (
    <div>
      <div className="page_block_container">
        <h2>Device definition</h2>
        <div className="advise">
          <span>General settings of the device.</span>
        </div>
        <hr/>
        <div className="page_block_buttons_container">
          <ReactJson src={device} />
        </div>
      </div>
      <div className="page_block_container">
        <h2>Device status</h2>
        <div className="advise">
          <span>Status of the device.</span>
        </div>
        <hr/>
        <div className="page_block_buttons_container">
          <ReactJson src={status} />
        </div>
      </div>
    </div>
  );
}

export default Info
