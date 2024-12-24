import React, {useState, useEffect, useRef} from "react";
import {Button, Stack, Select, MenuItem} from '@mui/material';

import Toast from "../web/Toast";
import getCookieValue from "../../functions";
import { root, deviceReference } from "../../constants";
import Trait from "../editor/Trait";
import Text from "../editor/Text";

import "./Editor.css";


function Editor() {
  
  const [id, setId] = useState(null)
  const [create, setCreate] = useState(true)
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState("")
  const [nicknames, setNicknames] = useState([])
  const [traits, setTraits] = useState([])
  const [device_info, setDeviceInfo] = useState({})

  const attributes = useRef({})
  const status = useRef({online: true})

  const [traits_to_show, setTraitsToShow] = useState([])
  const [not_recomended_traits, setNonRecomendedTraits] = useState(false)

  const [alert, setAlert] = useState(null)

  useEffect(() => {
    let _id = window.location.pathname.split("/")[3]
    setId(_id)
    setCreate(_id === "")
    setLoading(_id !== "")
  },[])

  useEffect(() => {
    if (!create) {
      if (id) {
        var http = new XMLHttpRequest();
        http.onload = function (e) {
          if (http.readyState === 4) {
            if (http.status === 200) {
              var data = JSON.parse(http.responseText);
              console.log(data)
              setType(data.description.type)
              setNicknames(data.description.name.nicknames)
              setTraits(data.description.traits)
              let _traits_to_show = []
              const all_traits = Object.keys(deviceReference.traits)
              for (let i = 0; i < all_traits.length; i++)
                if (data.description.traits.includes(all_traits[i]) || deviceReference.devices[data.description.type].traits.includes(all_traits[i]))
                  _traits_to_show.push(all_traits[i])
              setTraitsToShow(_traits_to_show)
              setDeviceInfo(data.description.deviceInfo)
              attributes.current = data.description.attributes
              status.current = data.status
              setLoading(false)
            } else {
              console.error(http.statusText);
              setAlert({severity: "error", text: "Unable to load the data."})
            }
          }
        }
        http.open("GET", root + "api/devices/" + id);
        http.setRequestHeader(
          "authorization",
          "bearer " + getCookieValue("token")
        );
        http.send();
      }
    }
  }, [id, create])

  const updateDeviceInfo = (_key, _value) => {
    let _device_info = {...device_info}
    _device_info[_key] = _value
    setDeviceInfo(_device_info)
  }

  const updateTraits = (_trait, _action) => {
    if (_action === "insert") {
      let _traits = [...traits]
      _traits.push(_trait)
      setTraits(_traits)
    } else if (_action === "delete") {
      let _traits = [...traits]
      _traits.splice(_traits.indexOf(_trait),1)
      setTraits(_traits)
    }
  }

  const updateAttributes = (_key, _value, _action) => {
    if (_action === "insert") {
      let _attributes_keys = Object.keys(_value)
      for(let i = 0; i < _attributes_keys.length; i++) {
        attributes.current[_attributes_keys[i]] = _value[_attributes_keys[i]]
      }
    } else if (_action === "drop") {
      let _attributes_keys = Object.keys(_value)
      for(let i = 0; i < _attributes_keys.length; i++) {
        delete attributes.current[_attributes_keys[i]]
      }
    } else if (_action === "update") {
      attributes.current[_key] = _value
    } else if (_action === "delete") {
      if (_key in attributes.current) {
        delete attributes.current[_key]
      }
    }
  }

  const updateStatus = (_key, _value, _action) => {
    if (_action === "insert") {
      let _status_keys = Object.keys(_value)
      for(let i = 0; i < _status_keys.length; i++) {
        status.current[_status_keys[i]] = _value[_status_keys[i]]
      }
    } else if (_action === "drop") {
      let _status_keys = Object.keys(_value)
      for(let i = 0; i < _status_keys.length; i++) {
        delete status.current[_status_keys[i]]
      }
    } else if (_action === "update") {
      status.current[_key] = _value
    } else if (_action === "delete") {
      if (_key in status.current) {
        delete status.current[_key]
      }
    }
  }

  const saveDevice = () => {
    if(true) {
      setAlert({severity: "warning", text: "Saving the device."})
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            setAlert({severity: "success", text: "Device saved."})
            if (create) {
              window.location.href = "/devices";
            }
          } else {
            console.error(http.statusText);
            setAlert({severity: "error", text: "Something went wrong."})
          }
        }
      }
      var payload = {
        device: {
          id: id,
          type: type,
          deviceInfo: device_info,
          traits: traits,
          attributes: attributes.current,
          name: {
            defaultNames: nicknames,
            nicknames: nicknames,
            name: nicknames[0]
          }
        },
        status: status.current,
      };
      if (create) {
        http.open("POST", root + "api/devices");
      } else {
        http.open("PUT", root + "api/devices");
      }
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
      http.send(JSON.stringify(payload));
    } else {
      setAlert({severity: "error", text: "Verify the mandatory data."})
    }
  }

  const deleteDevice = () => {
    setAlert({severity: "warning", text: "Deleting the device."})
    if (window.confirm("Do you want to delete the device?")) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            // setAlert({severity: "success", text: "Device deleted."})
            window.location.href = "/devices/";
          } else {
            console.error(http.statusText);
            setAlert({severity: "error", text: "Something went wrong."})
          }
        } else {
          setAlert({severity: "error", text: "Something went wrong."})
        }
      };
      http.open("DELETE", root + "api/devices/" + id
      );
      http.setRequestHeader(
        "authorization",
        "bearer " + getCookieValue("token")
      );
      http.send();
    } else {
      setAlert({severity: "seccess", text: "Saved."})
    }
  }

  return (
    <div>
      <div className="page_block_container">
        <h2>General settings</h2>
        <div className="advise">
            <span> Nick names must be separeted by commas.</span>
            <span> Fields with * are required.</span>
        </div>
        <hr/>
        { loading ? <></> : 
          <div className="page_block_content_container">
            <Text name="Nick names*" data="id"
              value={id}
              update={setId}
              disabled={create ? false : true}
            />
            <div className="two_table_row">
              <div className="two_table_cel">Device Type*</div>
              <div className="two_table_cel">
                <Select
                  id="type"
                  className="two_input"
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                    setTraits(deviceReference.devices[event.target.value].traits)
                    setTraitsToShow(deviceReference.devices[event.target.value].traits)
                  }}
                  disabled={!create}
                >                  
                  {
                    Object.keys(deviceReference.devices).map((type) => {
                      return (
                        <MenuItem key={type} value={type}>
                          {deviceReference.devices[type].name}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </div>
            </div>

            <Text name="Nick names*" data="nicknames"
              value={nicknames.map((name) => {return name})}
              update={(value) => setNicknames(value.split(","))}
            />
            <Text name="Hardware version" data="deviceInfo/hwVersion"
              value={device_info ? device_info.hwVersion : "" }
              update={(value) => updateDeviceInfo("hwVersion", value)}
            />
            <Text name="Software version" data="deviceInfo/swVersion"
              value={ device_info ? device_info.swVersion : "" }
              update={(value) => updateDeviceInfo("swVersion", value)}
            />
            <Text name="Manufacturer" data="deviceInfo/manufacturer" 
              value={ device_info ? device_info.manufacturer : "" }
              update={(value) => updateDeviceInfo("manufacturer", value)}
            />
            <Text name="Model" data="deviceInfo/model"
              value={ device_info ? device_info.model : "" }
              update={(value) => updateDeviceInfo("model", value)}
            />
            <div className="page_block_buttons_container">
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
        }
      </div>

      <div className="page_block_container">
        <h2>Traits</h2>
        <div className="advise">
          <span>The traits define what the device can do.</span>
        </div>
        <hr />
        { loading ? <></> : 
          <div className="page_block_content_container">
            {
              traits_to_show.map((trait) => (
                <Trait
                  trait={trait}
                  device_traits={traits}
                  attributes={attributes.current}
                  status={status.current}
                  updateTraits={updateTraits}
                  updateAttributes={updateAttributes}
                  updateStatus={updateStatus}
                  key={trait}
                />
              ))
            }
            {not_recomended_traits ? <></> : 
              <Button
                variant="contained"
                onClick={() => {
                  setNonRecomendedTraits(true)
                  setTraitsToShow(Object.keys(deviceReference.traits))
                }}
              >
                More traits
              </Button>
            }
            <div className="page_block_buttons_container">
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={saveDevice}>Save</Button>
              </Stack>
            </div>
          </div>
        }
      </div>

      <Toast alert={alert}/>
    </div>
  );
  
}

export default Editor;
