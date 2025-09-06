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
      fetch(root + "api/devices/" + id, {
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
        setDevice(data);
      })
      .catch(error => {
        console.error("Error fetching device:", error);
        setAlert({severity: "error", text: "Unable to load the data."});
      });
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
        <h2>Device states</h2>
        <div className="advise">
          <span>States of the device.</span>
        </div>
        <hr/>
        <div className="page_block_buttons_container">
          <ReactJsonView src={device.states} />
        </div>
      </div>
      <Toast alert={alert}/>
    </div>
  );
}

export default Info
