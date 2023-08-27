import React, {useState, useEffect} from "react";
import {Button, Stack} from '@mui/material';
import Switch from "react-switch";
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root, deviceReference } from "../../constants";

import ArmDisarm from "../editor/traits/ArmDisarm";
import Brightness from "../editor/traits/Brightness";
import ColorSetting from "../editor/traits/ColorSetting";
import Cook from "../editor/traits/Cook";
import EnergyStorage from "../editor/traits/EnergyStorage";
import FanSpeed from "../editor/traits/FanSpeed";
import Fill from "../editor/traits/Fill";
import HumiditySetting from "../editor/traits/HumiditySetting";
import Modes from "../editor/traits/Modes";
import OccupancySensing from "../editor/traits/OccupancySensing";
import OnOff from "../editor/traits/OnOff";
import OpenClose from "../editor/traits/OpenClose";
import Rotation from "../editor/traits/Rotation";
import Scene from "../editor/traits/Scene";
import SensorState from "../editor/traits/SensorState";
import StartStop from "../editor/traits/StartStop";
import TemperatureControl from "../editor/traits/TemperatureControl";
import TemperatureSetting from "../editor/traits/TemperatureSetting";
import Text from "../editor/Text";
import Timer from "../editor/traits/Timer";
import Toggles from "../editor/traits/Toggles";

import "./Editor.css";

let MANDATORY_CONTENT_LINES = 3

function Editor() {
  
  const [id, setId] = useState("")
  const [create, setCreate] = useState()
  const [device, setDevice] = useState({
    attributes: {},
    deviceInfo: {},
    id: "",
    name: {
      defaultNames: [],
      nicknames: [],
      name: "",
    },
    traits: [],
    type: "",
  })
  const [status, setStatus] = useState({online: true})
  const [device_tratis, setDeviceTraits] = useState([])
  const [not_recomended_traits, SetNonRecomendedTraits] = useState(false)
  const [mandatory_content, setMandatoryContent] = useState(0)

  useEffect(() => {
    let _id = window.location.pathname.split("/")[3]
    setId(_id)
    setCreate(_id === "")
  },[])

  useEffect(() => {
    if (!create) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            var recomended_tratis = deviceReference.devices[data.type].traits;
            var _device_tratis = data.traits.concat(recomended_tratis);
            _device_tratis = _device_tratis.filter((trait, index) => {
              return _device_tratis.indexOf(trait) === index;
            });
            setDevice(data)
            setDeviceTraits(_device_tratis)
            setMandatoryContent(3)
          } else {
            console.error(http.statusText);
            ToastsStore.error("Something went wrong");
          }
        }
      }
      http.open("GET", root + "api/devices/get/" + id + "/");
      http.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      http.send();

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
      sta.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      sta.send();
    }
  }, [id, create])

  const updateNames = (dumy_key, value) => {
    if(value.length > 0)
      setMandatoryContent(mandatory_content + 1)
    else
      setMandatoryContent(mandatory_content - 1)
    var names = value.split(",");
    var temp_device = device;
    temp_device.name = {
      defaultNames: names,
      nicknames: names,
      name: names[0],
    };
    setDevice(temp_device)
  }

  const update = (key, value) => {
    var temp_device = device;
    var keys = key.split("/");
    if (keys.length === 1) {
      if (value === "")
        delete temp_device[key]
      else
        temp_device[key] = value;
    } 
    else if (keys.length === 2) {
      if (value === "")
        delete temp_device[keys[0]][keys[1]]
      else
        temp_device[keys[0]][keys[1]] = value;
    }
    else if (keys.length === 3) {
      if (value === "")
        delete temp_device[keys[0]][keys[1]][keys[2]]
      else
        temp_device[keys[0]][keys[1]][keys[2]] = value;
    }
    setDevice(temp_device)
  }

  const updateId = (event) => {
    if(event.target.value.length > 0)
      setMandatoryContent(mandatory_content + 1)
    else
      setMandatoryContent(mandatory_content - 1)
    update("id", event.target.value);
  }

  const updateType = (event) => {
    if(event.target.value !== 'default')
      setMandatoryContent(mandatory_content + 1)
    else
      setMandatoryContent(mandatory_content - 1)
    update("type", event.target.value);
    setDeviceTraits(deviceReference.devices[event.target.value].traits)
  }

  const updateTraits = (checked, trait) => {
    var temp_device = device;
    var temp_status = status;
    if (checked) {
      if (device.traits.includes(trait) === false) {
        //Push the trait to the device
        temp_device.traits.push(trait);
        //Set the default attributes values
        var attributes = deviceReference.traits[trait].attributes;
        Object.keys(attributes).forEach((attribute, i) => {
          if (attributes[attribute].default !== "")
            temp_device.attributes[attribute] = attributes[attribute].default;
        });
        //Set the default status params
        var params = deviceReference.traits[trait].params;
        params.forEach((param, i) => {
          temp_status[param] = deviceReference.params[param].default;
        });
      }
    } else {
      //Delete the trait from the list
      if (device.traits.includes(trait) === true) {
        temp_device.traits = temp_device.traits.filter(function (
          value,
          index,
          arr
        ) {
          return value !== trait;
        });
      }
      //Delete the attributes values
      attributes = deviceReference.traits[trait].attributes;
      Object.keys(attributes).forEach((attribute, i) => {
        if (Object.keys(temp_device.attributes).includes(attribute))
          delete temp_device.attributes[attribute];
      });
      //Delete the status params
      params = deviceReference.traits[trait].params;
      params.forEach((param, i) => {
        if (Object.keys(temp_status).includes(param)) delete temp_status[param];
      });
    }
    setDevice(temp_device)
    setStatus(temp_status)
  }

  const notRecomendedTraits = () => {
    setDeviceTraits(Object.keys(deviceReference.traits))
    SetNonRecomendedTraits(true)
  }

  const saveDevice = () => {
    if(mandatory_content >= MANDATORY_CONTENT_LINES) {
      ToastsStore.warning("Saving");
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            ToastsStore.success("Saved correctly");
            if (create) {
              window.location.href = "/devices";
            }
          } else {
            console.error(http.statusText);
            ToastsStore.error("Error, the changes haven't been saved");
          }
        }
      }
      var payload = {
        device: device,
        status: status,
      };
      if (create) {
        http.open("POST", root + "api/devices/create/");
      } else {
        http.open("POST", root + "api/devices/update/");
      }
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
      http.send(JSON.stringify(payload));
    } else {
      ToastsStore.error("Verify the mandatory data");
    }
  }

  const deleteDevice = () => {
    ToastsStore.warning("Deleting");
    if (window.confirm("Do you want to delete the device?")) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            window.location.href = "/devices/";
          } else {
            console.error(http.statusText);
            ToastsStore.error("Error, the device hasn't been deleted");
          }
        } else {
          ToastsStore.error("Error, the device hasn't been deleted");
        }
      };
      http.open(
        "POST",
        root + "api/devices/delete/" + device.id + "/"
      );
      http.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      http.send();
    } else {
      ToastsStore.warning("Ok. The device is save");
    }
  }

  const renderAttrinutes = (trait) => {
    if (device.traits.includes(trait)) {
      if (trait === "action.devices.traits.Scene")
        return (
          <Scene
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.OnOff")
        return (
          <OnOff
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Brightness")
        return (
          <Brightness
            commandOnlyBrightness={
              device.attributes.commandOnlyBrightness
            }
            update={update}
          />
        );
      else if (trait === "action.devices.traits.ColorSetting")
        return (
          <ColorSetting
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.FanSpeed")
        return (
          <FanSpeed
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.TemperatureSetting")
        return (
          <TemperatureSetting
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Toggles")
        return (
          <Toggles
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Modes")
        return (
          <Modes
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.HumiditySetting")
        return (
          <HumiditySetting
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.OpenClose")
        return (
          <OpenClose
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Rotation")
        return (
          <Rotation
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Fill")
        return (
          <Fill
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.ArmDisarm")
        return (
          <ArmDisarm
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.StartStop")
        return (
          <StartStop
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Timer")
        return (
          <Timer
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.TemperatureControl")
        return (
          <TemperatureControl
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.Cook")
        return (
          <Cook
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.SensorState")
        return (
          <SensorState
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.EnergyStorage")
        return (
          <EnergyStorage
            attributes={device.attributes}
            update={update}
          />
        );
      else if (trait === "action.devices.traits.OccupancySensing")
        return (
          <OccupancySensing
            attributes={device.attributes}
            update={update}
          />
        );
    }
  }

    return (
      <div>
        <div className="page_block_container">
          <h2>Global settings</h2>
          <div className="advise">
            <span>General settings of the device.</span>
            <hr />
          </div>
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">Device ID*</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="id"
                  defaultValue={device.id}
                  onChange={updateId}
                  disabled={create ? false : true}
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Device Type*</div>
              <div className="two_table_cel">
                <select
                  name="type"
                  className="two_input"
                  id="type"
                  value={device.type}
                  onChange={updateType}
                  disabled={create ? false : true}
                >
                  <option value="default">Select a device</option>
                  {
                    Object.keys(deviceReference.devices).map((type) => {
                      return (
                        <option key={type} value={type}>
                          {deviceReference.devices[type].name}
                        </option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
            <Text
              name="Nick names*"
              data="nicknames"
              value={device.name.nicknames.map((name) => {return name})}
              update={updateNames}
            />
            <Text
              name="Hardware version"
              data="deviceInfo/hwVersion"
              value={
                device.deviceInfo
                  ? device.deviceInfo.hwVersion
                  : ""
              }
              update={update}
            />
            <Text
              name="Software version"
              data="deviceInfo/swVersion"
              value={
                device.deviceInfo
                  ? device.deviceInfo.swVersion
                  : ""
              }
              update={update}
            />
            <Text
              name="Manufacturer"
              data="deviceInfo/manufacturer"
              value={
                device.deviceInfo
                  ? device.deviceInfo.manufacturer
                  : ""
              }
              update={update}
            />
            <Text
              name="Model"
              data="deviceInfo/model"
              value={
                device.deviceInfo
                  ? device.deviceInfo.model
                  : ""
              }
              update={update}
            />
            <div className="advise">
              <span>
                Nick names must be separeted by <i>,</i> commas.
              </span>
              <br />
              <span>* data is required.</span>
            </div>
            <hr />
            <h2>Traits</h2>
            <div className="advise">
              <span>The traits define what the device can do.</span>
            </div>
            {
              device_tratis.map((trait) => (
                <div key={trait}>
                  <hr className="separator" />
                  <div className="three_table_row">
                    <div className="three_table_cel">
                      <b>{deviceReference.traits[trait].name}</b>
                    </div>
                    <div className="three_table_cel">
                      <Switch
                        onChange={(checked) => {
                          updateTraits(checked, trait);
                        }}
                        checked={device.traits.includes(trait)}
                      />
                    </div>
                    <div className="three_table_cel">
                      Read Google's{" "}
                      <a
                        href={
                          "https://developers.google.com/assistant/smarthome/traits/" +
                          trait.split(".")[3].toLowerCase()
                        }
                        target="blanck"
                      >
                        documentation
                      </a>
                    </div>
                  </div>
                  {renderAttrinutes(trait)}
                </div>
              ))
            }
            {not_recomended_traits ? <></> : 
              <Button variant="contained" onClick={notRecomendedTraits}>More traits</Button>
            }
            <hr />
            <div className="two_table_cel">
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={deleteDevice}
                  style={create ? {backgroundColor: "red", color: "white", opacity: "0.4"} : {backgroundColor: "red"}}
                  disabled={create}
                >
                  Delete
                </Button>
                <Button variant="contained" onClick={saveDevice}>Save</Button>
              </Stack>
            </div>
          </div>
        </div>

        <ToastsContainer store={ToastsStore} />
      </div>
    );
  
}

export default Editor;
