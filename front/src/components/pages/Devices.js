import React from "react";
import { Link } from "react-router-dom";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Light from "../devices/Light";
import Outlet from "../devices/Outlet";
import AcUnit from "../devices/AcUnit";
import AirFreshener from "../devices/AirFreshener";
import AirPurifier from "../devices/AirPurifier";
import Bed from "../devices/Bed";
import Fan from "../devices/Fan";
import Fireplace from "../devices/Fireplace";
import Radiator from "../devices/Radiator";
import Switch from "../devices/Switch";
import Thermostat from "../devices/Thermostat";
import AirCooler from "../devices/AirCooler";
import Bathtub from "../devices/Bathtub";
import Awing from "../devices/Awing";
import Blinds from "../devices/Blinds";
import Closet from "../devices/Closet";
import Curtain from "../devices/Curtain";
import Door from "../devices/Door";
import Drawer from "../devices/Drawer";
import Garage from "../devices/Garage";
import Pergola from "../devices/Pergola";
import Shutter from "../devices/Shutter";
import Valve from "../devices/Valve";
import Window from "../devices/Window";
import Lock from "../devices/Lock";
import Gate from "../devices/Gate";
import Heater from "../devices/Heater";
import Hood from "../devices/Hood";
import SecuritySystem from "../devices/SecuritySystem";
import Blender from "../devices/Blender";
import Global from "../devices/Global";
import Scene from "../devices/Scene";
import getCookieValue from "../../functions";
import { root } from "../../constants";

import "./Devices.css";

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ordered_devices: [],
      processed_devices: [],
      order_by: "az",
      search_phrase: "",
    };
    this.loadData = this.loadData.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 3000);
  }

  loadData() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          this.setState({
            data: data,
          });
          this.orderBy(this.state.order_by)
          this.search(this.state.search_phrase)
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong");
        }
      }
    }.bind(this);
    http.open("GET", root + "api/global/get/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }

  orderBy(by) {
    var devices_list = this.state.data.devices;
    devices_list.sort(function(a, b){
      if(a.name.name.toLowerCase() < b.name.name.toLowerCase()) { return -1; }
      if(a.name.name.toLowerCase() > b.name.name.toLowerCase()) { return 1; }
      return 0;
    })
    
    this.setState({
      ordered_devices: devices_list,
    })
  }

  search(search_phrase) {
    this.setState({search_phrase})
    if (search_phrase === "") {
      this.setState({
        processed_devices: this.state.ordered_devices,
      })
    } else {
      var filtered_devices = []
      this.state.ordered_devices.forEach(device => {
        if (device.name.name.toLowerCase().includes(search_phrase)) {
          if (!filtered_devices.includes(device)) {
            filtered_devices.push(device)
          }
        }
      })
      this.setState({
        processed_devices: filtered_devices,
      })
    }
  }

  render() {
    const devices = this.state.processed_devices.map((device) => {
      if (device.type === "action.devices.types.LIGHT")
        return (
          <Light
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.OUTLET")
        return (
          <Outlet
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.AC_UNIT")
        return (
          <AcUnit
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.AIRFRESHENER")
        return (
          <AirFreshener
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.AIRPURIFIER")
        return (
          <AirPurifier
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.BED")
        return (
          <Bed
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.FAN")
        return (
          <Fan
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.FIREPLACE")
        return (
          <Fireplace
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.RADIATOR")
        return (
          <Radiator
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.SWITCH")
        return (
          <Switch
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.THERMOSTAT")
        return (
          <Thermostat
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.AIRCOOLER")
        return (
          <AirCooler
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.BATHTUB")
        return (
          <Bathtub
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.AWING")
        return (
          <Awing
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.AIRCOOLER")
        return (
          <AirCooler
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.BLINDS")
        return (
          <Blinds
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.CLOSET")
        return (
          <Closet
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.CURTAIN")
        return (
          <Curtain
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.DOOR")
        return (
          <Door
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.DRAWER")
        return (
          <Drawer
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.GARAGE")
        return (
          <Garage
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.GATE")
        return (
          <Gate
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.PERGOLA")
        return (
          <Pergola
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.SHUTTER")
        return (
          <Shutter
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.VALVE")
        return (
          <Valve
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.WINDOW")
        return (
          <Window
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.LOCK")
        return (
          <Lock
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.HEATER")
        return (
          <Heater
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.HOOD")
        return (
          <Hood
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.SECURITYSYSTEM")
        return (
          <SecuritySystem
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type === "action.devices.types.BLENDER")
        return (
          <Blender
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else if (device.type !== "action.devices.types.SCENE")
        return (
          <Global
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else
        return (<></>)
    });

    const scenes = this.state.processed_devices.map((device) => {
      if (device.type === "action.devices.types.SCENE")
        return (
          <Scene
            key={device.id}
            device={device}
            status={this.state.data.status[device.id]}
            reload={this.loadData}
          />
        );
      else
        return (<></>)
    });

    return (
      <div>
        <div className="page_search_containter">
          <input
            type="text"
            className="page_search_bar"
            placeholder="Type to search"
            id="search_bar"
            value={this.state.search_phrase}
            onChange={(event) => {
              this.search(event.target.value.toLowerCase());
            }}
          />
          <div
            className="page_search_x"
            onClick={
              () => {
                this.setState({search_phrase: ""});
                this.orderBy(this.state.order_by);
              }
            }
          >
            <span>X</span>
          </div>
        </div>

        <div className="page_cards_container">{devices}</div>
        <div className="page_cards_container">{scenes}</div>

        <div className="page_buttons_containter">
          <Link to="/devices/editor/">
            <button type="button">New</button>
          </Link>
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Devices;
