import React from "react";
import Switch from "react-switch";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Text from "../editor/Text";
import Scene from "../editor/traits/Scene";
import OnOff from "../editor/traits/OnOff";
import Brightness from "../editor/traits/Brightness";
import FanSpeed from "../editor/traits/FanSpeed";
import ColorSetting from "../editor/traits/ColorSetting";
import TemperatureSetting from "../editor/traits/TemperatureSetting";
import Toggles from "../editor/traits/Toggles";
import Modes from "../editor/traits/Modes";
import HumiditySetting from "../editor/traits/HumiditySetting";
import OpenClose from "../editor/traits/OpenClose";
import Rotation from "../editor/traits/Rotation";
import Fill from "../editor/traits/Fill";
import ArmDisarm from "../editor/traits/ArmDisarm";
import StartStop from "../editor/traits/StartStop";
import Timer from "../editor/traits/Timer";
import TemperatureControl from "../editor/traits/TemperatureControl";
import Cook from "../editor/traits/Cook";
import SensorState from "../editor/traits/SensorState";
import getCookieValue from "../../functions";
import { root, deviceReference } from "../../constants";

import "./Editor.css";

let MANDATORY_CONTENT_LINES = 3

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split("/")[3];
    var create = false;
    if (id === "") create = true;
    this.state = {
      id: id,
      create: create,
      device: {
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
      },
      status: {
        online: true,
      },
      device_tratis: [],
      not_recomended_traits: false,
      mandatory_content: 0,
    };
    this.updateNames = this.updateNames.bind(this);
    this.update = this.update.bind(this);
    this.updateId = this.updateId.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateTraits = this.updateTraits.bind(this);
    this.notRecomendedTraits = this.notRecomendedTraits.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.renderAttrinutes = this.renderAttrinutes.bind(this);
  }

  componentDidMount() {
    if (!this.state.create) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            var recomended_tratis = deviceReference.devices[data.type].traits;
            var device_tratis = data.traits.concat(recomended_tratis);
            device_tratis = device_tratis.filter((trait, index) => {
              return device_tratis.indexOf(trait) === index;
            });
            this.setState({
              device: data,
              device_tratis: device_tratis,
              mandatory_content: 3,
            });
          } else {
            console.error(http.statusText);
            ToastsStore.error("Something went wrong");
          }
        }
      }.bind(this);
      http.open("GET", root + "api/devices/get/" + this.state.id + "/");
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
            console.log("in");
            this.setState({
              status: data,
            });
          } else {
            console.error(sta.statusText);
          }
        }
      }.bind(this);
      sta.open("GET", root + "api/status/get/" + this.state.id + "/");
      sta.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      sta.send();
    }
  }

  updateNames(dumy_key, value) {
    if(value.length > 0)
      this.setState({mandatory_content: this.state.mandatory_content + 1})
    else
      this.setState({mandatory_content: this.state.mandatory_content - 1})
    var names = value.split(",");
    var temp_device = this.state.device;
    temp_device.name = {
      defaultNames: names,
      nicknames: names,
      name: names[0],
    };
    this.setState({
      device: temp_device,
    });
  }

  update(key, value) {
    var temp_device = this.state.device;
    var keys = key.split("/");
    if (keys.length === 1) temp_device[key] = value;
    else if (keys.length === 2) temp_device[keys[0]][keys[1]] = value;
    else if (keys.length === 3) temp_device[keys[0]][keys[1]][keys[2]] = value;
    this.setState({
      device: temp_device,
    });
  }

  updateId(event) {
    if(event.target.value.length > 0)
      this.setState({mandatory_content: this.state.mandatory_content + 1})
    else
      this.setState({mandatory_content: this.state.mandatory_content - 1})
    this.update("id", event.target.value);
  }

  updateType(event) {
    if(event.target.value !== 'default')
      this.setState({mandatory_content: this.state.mandatory_content + 1})
    else
      this.setState({mandatory_content: this.state.mandatory_content - 1})
    this.update("type", event.target.value);
    this.setState({
      device_tratis: deviceReference.devices[event.target.value].traits,
    });
  }

  updateTraits(checked, trait) {
    var temp_device = this.state.device;
    var temp_status = this.state.status;
    if (checked) {
      if (this.state.device.traits.includes(trait) === false) {
        //Push the trait to the device
        temp_device.traits.push(trait);
        //Set the default attributes values
        var attributes = deviceReference.traits[trait].attributes;
        Object.keys(attributes).forEach((attribute, i) => {
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
      if (this.state.device.traits.includes(trait) === true) {
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
    this.setState({
      device: temp_device,
      status: temp_status,
    });
  }

  notRecomendedTraits() {
    this.setState({
      device_tratis: Object.keys(deviceReference.traits),
      not_recomended_traits: true,
    });
  }

  save() {
    if(this.state.mandatory_content >= MANDATORY_CONTENT_LINES) {
      ToastsStore.warning("Saving");
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            JSON.parse(http.responseText);
            ToastsStore.success("Saved correctly");
            if (this.state.create) {
              window.location.href = "/devices";
            }
          } else {
            console.error(http.statusText);
            ToastsStore.error("Error, the changes haven't been saved");
          }
        }
      }.bind(this);
      var payload = {
        device: this.state.device,
        status: this.state.status,
      };
      if (this.state.create) {
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

  delete() {
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
        root + "api/devices/delete/" + this.state.device.id + "/"
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

  renderAttrinutes(trait) {
    if (this.state.device.traits.includes(trait)) {
      if (trait === "action.devices.traits.Scene")
        return (
          <Scene
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.OnOff")
        return (
          <OnOff
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Brightness")
        return (
          <Brightness
            commandOnlyBrightness={
              this.state.device.attributes.commandOnlyBrightness
            }
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.ColorSetting")
        return (
          <ColorSetting
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.FanSpeed")
        return (
          <FanSpeed
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.TemperatureSetting")
        return (
          <TemperatureSetting
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Toggles")
        return (
          <Toggles
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Modes")
        return (
          <Modes
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.HumiditySetting")
        return (
          <HumiditySetting
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.OpenClose")
        return (
          <OpenClose
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Rotation")
        return (
          <Rotation
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Fill")
        return (
          <Fill
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.ArmDisarm")
        return (
          <ArmDisarm
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.StartStop")
        return (
          <StartStop
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Timer")
        return (
          <Timer
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.TemperatureControl")
        return (
          <TemperatureControl
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.Cook")
        return (
          <Cook
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
      else if (trait === "action.devices.traits.SensorState")
        return (
          <SensorState
            attributes={this.state.device.attributes}
            update={this.update}
          />
        );
    }
  }

  render() {
    const deleteButton = {
      backgroundColor: "red",
    };

    const deleteButtonDisabled = {
      backgroundColor: "red",
      opacity: "0.2",
    };

    const types = Object.keys(deviceReference.devices).map((type) => {
      return (
        <option key={type} value={type}>
          {deviceReference.devices[type].name}
        </option>
      );
    });

    const nicknames = this.state.device.name.nicknames.map((name) => {
      return name;
    });

    const traits = this.state.device_tratis.map((trait) => (
      <div key={trait}>
        <hr className="separator" />
        <div className="three_table_row">
          <div className="three_table_cel">
            <b>{deviceReference.traits[trait].name}</b>
          </div>
          <div className="three_table_cel">
            <Switch
              onChange={(checked) => {
                this.updateTraits(checked, trait);
              }}
              checked={this.state.device.traits.includes(trait)}
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
        {this.renderAttrinutes(trait)}
      </div>
    ));

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
                  defaultValue={this.state.device.id}
                  onChange={this.updateId}
                  disabled={this.state.create ? false : true}
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
                  value={this.state.device.type}
                  onChange={this.updateType}
                  disabled={this.state.create ? false : true}
                >
                  <option value="default">Select a device</option>
                  {types}
                </select>
              </div>
            </div>
            <Text
              name="Nick names*"
              data="nicknames"
              value={nicknames}
              update={this.updateNames}
            />
            <Text
              name="Hardware version"
              data="deviceInfo/hwVersion"
              value={
                this.state.device.deviceInfo
                  ? this.state.device.deviceInfo.hwVersion
                  : ""
              }
              update={this.update}
            />
            <Text
              name="Software version"
              data="deviceInfo/swVersion"
              value={
                this.state.device.deviceInfo
                  ? this.state.device.deviceInfo.swVersion
                  : ""
              }
              update={this.update}
            />
            <Text
              name="Manufacturer"
              data="deviceInfo/manufacturer"
              value={
                this.state.device.deviceInfo
                  ? this.state.device.deviceInfo.manufacturer
                  : ""
              }
              update={this.update}
            />
            <Text
              name="Model"
              data="deviceInfo/model"
              value={
                this.state.device.deviceInfo
                  ? this.state.device.deviceInfo.model
                  : ""
              }
              update={this.update}
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
            {traits}
            {this.state.not_recomended_traits ? (
              ""
            ) : (
              <button type="button" onClick={this.notRecomendedTraits}>
                More traits
              </button>
            )}
            <hr />
            <div className="two_table_cel">
              <button
                type="button"
                style={this.state.create ? deleteButtonDisabled : deleteButton}
                onClick={this.delete}
                disabled={this.state.create ? true : false}
              >
                Delete
              </button>
              <button type="button" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>

        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Editor;
