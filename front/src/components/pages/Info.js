import React, {useState, useEffect} from "react";
import ReactJsonView from '@microlink/react-json-view'

import Toast from "../web/Toast";
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
  const [alert, setAlert] = useState(null)

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
            setAlert({severity: "error", text: "Unable to load the data."})
          }
        }
      }
      dev.open("GET", root + "api/devices/" + id);
      dev.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
      dev.send();
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
          <ReactJsonView src={device.description} />
        </div>
      </div>
      <div className="page_block_container">
        <h2>Device status</h2>
        <div className="advise">
          <span>Status of the device.</span>
        </div>
        <hr/>
        <div className="page_block_buttons_container">
          <ReactJsonView src={device.status} />
        </div>
      </div>
      <Toast alert={alert}/>
    </div>
  );
}

export default Info
