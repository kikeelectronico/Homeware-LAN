import React, {useState, useEffect} from "react";
import {Button} from '@mui/material';
import { Link } from "react-router-dom";

import Toast from "../web/Toast";
import getCookieValue from "../../functions";
import { root } from "../../constants";

import AcUnit from "../devices/AcUnit";
import AirCooler from "../devices/AirCooler";
import AirFreshener from "../devices/AirFreshener";
import AirPurifier from "../devices/AirPurifier";
import Awing from "../devices/Awing";
import Bathtub from "../devices/Bathtub";
import Bed from "../devices/Bed";
import Blender from "../devices/Blender";
import Blinds from "../devices/Blinds";
import Closet from "../devices/Closet";
import Curtain from "../devices/Curtain";
import Door from "../devices/Door";
import Drawer from "../devices/Drawer";
import Fan from "../devices/Fan";
import Fireplace from "../devices/Fireplace";
import Garage from "../devices/Garage";
import Gate from "../devices/Gate";
// import Global from "../devices/Global";
import Heater from "../devices/Heater";
import Hood from "../devices/Hood";
import Light from "../devices/Light";
import Lock from "../devices/Lock";
import Outlet from "../devices/Outlet";
import Pergola from "../devices/Pergola";
import Radiator from "../devices/Radiator";
import Scene from "../devices/Scene";
import SecuritySystem from "../devices/SecuritySystem";
import Sensor from "../devices/Sensor";
import Shutter from "../devices/Shutter";
import Switch from "../devices/Switch";
import Thermostat from "../devices/Thermostat";
import Valve from "../devices/Valve";
import WaterHeater from "../devices/WaterHeater";
import Window from "../devices/Window";

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
            <div className="device_room_container">
              <div className="device_romm_title">
                <h2>{room}</h2>
              </div>
              <div className="device_room_cards">
                {
                  processed_devices[room].map((device) => {
                    if (device.description.type === "action.devices.types.AC_UNIT") return <AcUnit key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.AIRCOOLER") return <AirCooler key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.AIRCOOLER") return <AirCooler key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.AIRFRESHENER") return <AirFreshener key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.AIRPURIFIER") return <AirPurifier key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.AWING") return <Awing key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.BATHTUB") return <Bathtub key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.BED") return <Bed key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.BLENDER") return <Blender key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.BLINDS") return <Blinds key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.CLOSET") return <Closet key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.CURTAIN") return <Curtain key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.DOOR") return <Door key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.DRAWER") return <Drawer key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.FAN") return <Fan key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.FIREPLACE") return <Fireplace key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.GARAGE") return <Garage key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.GATE") return <Gate key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.HEATER") return <Heater key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.HOOD") return <Hood key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.LOCK") return <Lock key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.OUTLET") return <Outlet key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.PERGOLA") return <Pergola key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.RADIATOR") return <Radiator key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.SECURITYSYSTEM") return <SecuritySystem key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.SENSOR") return <Sensor key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.SHUTTER") return <Shutter key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.SWITCH") return <Switch key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.THERMOSTAT") return <Thermostat key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.VALVE") return <Valve key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.WATERHEATER") return <WaterHeater key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.WINDOW") return <Window key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.LIGHT")  return <Light key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else if (device.description.type === "action.devices.types.SCENE")  return <Scene key={device.description.id} device={device.description} states={device["states"]} reload={loadData}/>
                    else return <></>
                  })
                }
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
