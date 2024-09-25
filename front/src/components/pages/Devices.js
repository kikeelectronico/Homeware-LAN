import React, {useState, useEffect} from "react";
import {Button} from '@mui/material';
import { Link } from "react-router-dom";
import { ToastsContainer, ToastsStore } from "react-toasts";
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
  const [processed_devices, setProcesedDevices] = useState([])
  const [processed_scenes, setProcesedScenes] = useState([])
  const [order_by, setOrderBy] = useState("az")
  const [search_phrase, setSearchPhrase] = useState("")


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
          ToastsStore.error("Something went wrong");
        }
      }
    }
    http.open("GET", root + "api/global/get/");
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send();
  }

  useEffect(() => {
    if (!loading_data) {
      var _ordered_devices = orderBy(data.devices, order_by)
      var _processed_devices = search(_ordered_devices, search_phrase)
      setProcesedDevices(_processed_devices)
      separeteScenes(_processed_devices)
    }
  }, [data, order_by, search_phrase, loading_data])

  const orderBy = (_devices_list, by) => {
    _devices_list.sort(function(a, b){
      if(a.name.name.toLowerCase() < b.name.name.toLowerCase()) { return -1; }
      if(a.name.name.toLowerCase() > b.name.name.toLowerCase()) { return 1; }
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
        if (device.name.name.toLowerCase().includes(_search_phrase)) {
          if (!filtered_devices.includes(device)) {
            filtered_devices.push(device)
          }
        }
      })
      return filtered_devices      
    }
  }

  const separeteScenes = (_devices_list) => {
    var _scenes = []
    _devices_list.forEach(device => {
      if (device.type === "action.devices.types.SCENE") {
        if (!_scenes.includes(device)) {
          _scenes.push(device)
        }
      }
    })
    setProcesedScenes(_scenes)
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
          processed_devices.map((device) => {
            if (device.type === "action.devices.types.AC_UNIT") return <AcUnit key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.AIRCOOLER") return <AirCooler key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.AIRCOOLER") return <AirCooler key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.AIRFRESHENER") return <AirFreshener key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.AIRPURIFIER") return <AirPurifier key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.AWING") return <Awing key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.BATHTUB") return <Bathtub key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.BED") return <Bed key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.BLENDER") return <Blender key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.BLINDS") return <Blinds key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.CLOSET") return <Closet key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.CURTAIN") return <Curtain key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.DOOR") return <Door key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.DRAWER") return <Drawer key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.FAN") return <Fan key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.FIREPLACE") return <Fireplace key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.GARAGE") return <Garage key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.GATE") return <Gate key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.HEATER") return <Heater key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.HOOD") return <Hood key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.LOCK") return <Lock key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.OUTLET") return <Outlet key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.PERGOLA") return <Pergola key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.RADIATOR") return <Radiator key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.SECURITYSYSTEM") return <SecuritySystem key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.SENSOR") return <Sensor key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.SHUTTER") return <Shutter key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.SWITCH") return <Switch key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.THERMOSTAT") return <Thermostat key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.VALVE") return <Valve key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.WATERHEATER") return <WaterHeater key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.WINDOW") return <Window key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else if (device.type === "action.devices.types.LIGHT")  return <Light key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
            else return <></>
          })
        }
      </div>
      <div className="page_cards_container">
        {
          processed_scenes.map((device) => {
            return <Scene key={device.id} device={device} status={data.status[device.id]} reload={loadData}/>
          })
        }
      </div>

      <div className="page_buttons_containter">
        <Link to="/devices/editor/">
          <Button variant="contained">New</Button>
        </Link>
      </div>
      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Devices;
