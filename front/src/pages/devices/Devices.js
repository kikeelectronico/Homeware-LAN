import React, {useState, useEffect} from "react";
import {Button} from '@mui/material';
import { Link } from "react-router-dom";

import Toast from "../../components/web/Toast";
import getCookieValue from "../../functions";
import { root } from "../../constants";

import Device from "./components/Device";

import "./Devices.css";

function Devices() {

  const [data, setData] = useState({})
  const [loading_data, setLoadingData] = useState(true)
  const [processed_devices, setProcesedDevices] = useState({})
  const [order_by, setOrderBy] = useState("az")
  const [search_phrase, setSearchPhrase] = useState("")
  const [alert, setAlert] = useState(null)


  useEffect(() => {
    loadData();
    const get_devices_interval = setInterval(loadData, 1000);

    return () => {
      clearInterval(get_devices_interval)
    }
  }, [])

  const loadData = () => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var _data = JSON.parse(http.responseText)
          setData(_data)
          setLoadingData(false)
          setOrderBy("az")
        } else {
          console.error(http.statusText);
          setAlert({severity: "error", text: "Unable to load the data."})
        }
      }
    }
    http.open("GET", root + "api/devices");
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send();
  }

  useEffect(() => {
    if (!loading_data) {
      var _processed_devices = {};
      var _ordered_devices = orderBy(data, order_by)
      var _filtered_devices = search(_ordered_devices, search_phrase)
      let temp_processed_devices = {};
      _filtered_devices.forEach(device => {
        const roomKey = device.description.type === "action.devices.types.SCENE" ? "Scene" : (device.description.room !== undefined ? device.description.room : '');
        if (!temp_processed_devices[roomKey]) {
          temp_processed_devices[roomKey] = [];
        }
        temp_processed_devices[roomKey].push(device);
      });
      const sortedKeys = Object.keys(temp_processed_devices).sort((a, b) => {
        if (a === "Scene" && b !== "Scene") { return 1; }
        if (b === "Scene" && a !== "Scene") { return -1; }
        return a.localeCompare(b);
      });
      sortedKeys.forEach(key => {
        _processed_devices[key] = temp_processed_devices[key];
      });
      setProcesedDevices(_processed_devices)
    }
  }, [data, order_by, search_phrase, loading_data])

  const orderBy = (_devices_list, by) => {
    _devices_list.sort(function(a, b){
      if(a.description.name.name.toLowerCase() < b.description.name.name.toLowerCase()) { return -1; }
      if(a.description.name.name.toLowerCase() > b.description.name.name.toLowerCase()) { return 1; }
      return 0;
    })
    return _devices_list
  }

  const search = (_devices_list, _search_phrase) => {
    if (_search_phrase === "") {
      return _devices_list
    } else {
      var filtered_devices = []
      _devices_list.forEach(device => {
        if (device.description.name.name.toLowerCase().includes(_search_phrase)) {
          if (!filtered_devices.includes(device)) {
            filtered_devices.push(device)
          }
        }
      })
      return filtered_devices      
    }
  }

  return (
    <div>
      <div className="page_search_containter">
        <input
          type="text"
          className="page_search_bar"
          placeholder="Type to search"
          id="search_bar"
          value={search_phrase}
          onChange={(event) => setSearchPhrase(event.target.value.toLowerCase())}
        />
        <div
          className="page_search_x"
          onClick={() => setSearchPhrase("")}
        >
          <span>X</span>
        </div>
      </div>

      <div className="page_cards_container">
        {
          Object.keys(processed_devices).map((room) => {
            return (
            <div className="devices_room_container">
              <div className="devices_romm_title">
                <h2>{room}</h2>
              </div>
              <div class="devices_cards_outer_container">
                <div className="devices_cards_container">
                  {
                    processed_devices[room].map((device) => {
                      return <Device key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    })
                  }
                </div>
              </div>
            </div>
            )
          })
        }
      </div>

      <div className="page_buttons_containter">
        <Link to="/devices/editor/">
          <Button variant="contained">New</Button>
        </Link>
      </div>

      <Toast alert={alert}/>
    </div>
  );
  
}

export default Devices;
