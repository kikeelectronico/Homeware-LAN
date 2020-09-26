import React from 'react';
import Text from '../editor/Text'
import Scene from '../editor/traits/Scene'
import OnOff from '../editor/traits/OnOff'
import Brightness from '../editor/traits/Brightness'
import FanSpeed from '../editor/traits/FanSpeed'
import ColorSetting from '../editor/traits/ColorSetting'
import TemperatureSetting from '../editor/traits/TemperatureSetting'
import Toggles from '../editor/traits/Toggles'
import Modes from '../editor/traits/Modes'
import HumiditySetting from '../editor/traits/HumiditySetting'
import OpenClose from '../editor/traits/OpenClose'
import Rotation from '../editor/traits/Rotation'
import Fill from '../editor/traits/Fill'
import ArmDisarm from '../editor/traits/ArmDisarm'
import StartStop from '../editor/traits/StartStop'
import Timer from '../editor/traits/Timer'
import TemperatureControl from '../editor/traits/TemperatureControl'
import Cook from '../editor/traits/Cook'
import getCookieValue from '../../functions'
import { root, deviceReference } from '../../constants'

import './Editor.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split('/')[3];
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
          defaultnames: [],
          nicknames: [],
          name: ""
        },
        traits: [],
        type: ""
      },
      status: {
        online: true
      },
      posible_traits: [],
      save_status: ""
    }
    this.updateNames = this.updateNames.bind(this);
    this.update = this.update.bind(this);
    this.updateId = this.updateId.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateTraits = this.updateTraits.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.renderAttrinutes = this.renderAttrinutes.bind(this);
  }

  componentDidMount() {
    if (!this.state.create){
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            this.setState({
               device: data,
               posible_traits: deviceReference.devices[data.type]
             });
          } else {
            console.error(http.statusText);
          }
        }
      }.bind(this);
      http.open("GET", root + "api/devices/get/" + this.state.id + "/");
      http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      http.send();
    }
  }

  updateNames(dumy_key, value){
    var names = value.split(',');
    var temp_device = this.state.device
    temp_device.name = {
      defaultnames: names,
      nicknames: names,
      name: names[0]
    }
    this.setState({
      device: temp_device
    })
  }

  update(key, value){
    var temp_device = this.state.device
    var keys = key.split('/');
    if (keys.length === 1)
      temp_device[key] = value
    else if (keys.length === 2)
      temp_device[keys[0]][keys[1]] = value
    else if (keys.length === 3)
      temp_device[keys[0]][keys[1]][keys[2]] = value
    this.setState({
      device: temp_device
    })
  }

  updateId(event){
    this.update('id',event.target.value)
  }

  updateType(event){
    this.update('type',event.target.value)
    this.setState({
       posible_traits: deviceReference.devices[event.target.value]
     });
  }

  updateTraits(event){
    var temp_device = this.state.device
    var temp_status = this.state.status
    if (event.target.checked) {
      if (this.state.device.traits.includes(event.target.id) === false){
        //Push the trait to the device
        temp_device.traits.push(event.target.id)
        //Set the default values
        var attributes = deviceReference.traits[event.target.id].attributes;
        Object.keys(attributes).forEach((attribute, i) => {
          temp_device.attributes[attribute] = attributes[attribute].default
        });
        //Set the default status params
        var params = deviceReference.traits[event.target.id].param;
        Object.keys(params).forEach((param, i) => {
          temp_status[param] = params[param].default
        });
      }
    } else {
      if (this.state.device.traits.includes(event.target.id) === true){
        temp_device.traits = temp_device.traits.filter(function(value, index, arr){ return value !== event.target.id;});
      }
    }
    this.setState({
      device: temp_device
    })
  }

  save(){
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          JSON.parse(http.responseText);
          this.setState({
             save_status: "Saved correctly."
           });
        } else {
          console.error(http.statusText);
          this.setState({
             save_status: "Error, the changes haven't been saved."
           });
        }
        setTimeout(function(){
          this.setState({
             save_status: ""
           });
        }.bind(this), 5000)
      }
    }.bind(this);
    var payload = {
      "device": this.state.device
    }
    if (this.state.create){
      http.open("POST", root + "api/devices/create/");
      payload.status = this.state.status
    } else {
      http.open("POST", root + "api/devices/update/");
    }
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send(JSON.stringify(payload));
  }

  delete(){
    if(window.confirm('Do you want to delete the device?')){
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            window.location.href = "/devices/"
          } else {
            console.error(http.statusText);
            this.setState({
               save_status: "Error, the device hasn't been deleted."
             });
          }
          setTimeout(function(){
            this.setState({
               save_status: ""
             });
          }.bind(this), 5000)
        }
      }.bind(this);
      http.open("GET", root + "api/devices/delete/" + this.state.device.id + "/");
      http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      http.send();
    } else {
      this.setState({
         save_status: "Ok. The device is save."
       });
    }
  }

  renderAttrinutes(trait){
    if (this.state.device.traits.includes(trait)){
      if (trait === 'action.devices.traits.Scene')
        return <Scene sceneReversible={this.state.device.attributes.sceneReversible} update={this.update}/>
      else if (trait === 'action.devices.traits.OnOff')
        return <OnOff attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Brightness')
        return <Brightness commandOnlyBrightness={this.state.device.attributes.commandOnlyBrightness} update={this.update}/>
      else if (trait === 'action.devices.traits.ColorSetting')
        return <ColorSetting attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.FanSpeed')
        return <FanSpeed attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.TemperatureSetting')
        return <TemperatureSetting attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Toggles')
        return <Toggles attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Modes')
        return <Modes attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.HumiditySetting')
        return <HumiditySetting attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.OpenClose')
        return <OpenClose attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Rotation')
        return <Rotation attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Fill')
        return <Fill attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.ArmDisarm')
        return <ArmDisarm attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.StartStop')
        return <StartStop attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Timer')
        return <Timer attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.TemperatureControl')
        return <TemperatureControl attributes={this.state.device.attributes} update={this.update}/>
      else if (trait === 'action.devices.traits.Cook')
        return <Cook attributes={this.state.device.attributes} update={this.update}/>
    }
  }

  render() {

    const deleteButton = {
      backgroundColor: 'red'
    }

    const deleteButtonDisabled = {
      backgroundColor: 'red',
      opacity: '0.2'
    }

    const types = Object.keys(deviceReference.devicesCoolNames).map((type) => {
      return <option key={type} value={type}>{deviceReference.devicesCoolNames[type]}</option>
    })

    const nicknames = this.state.device.name.nicknames.map((name) => {
      return name
    });

    const traits = this.state.posible_traits.map((trait) =>
      <div key={trait}>
        <hr className="separator"/>
        <div className="three_table_row">
          <div className="three_table_cel">
            {deviceReference.traitsCoolNames[trait]}
          </div>
          <div className="three_table_cel">
            <label>
              <input type="checkbox" id={trait} defaultChecked={this.state.device.traits.includes(trait)} onChange={this.updateTraits}/>

            </label>
          </div>
          <div className="three_table_cel">
            Read Google's <a href={"https://developers.google.com/assistant/smarthome/traits/" + trait.split('.')[3].toLowerCase()} target="blanck">documentation</a>
          </div>
        </div>
        {this.renderAttrinutes(trait)}
      </div>
    );

    return (
      <div>

        <div className="page_block_container">
          <h2>Global settings</h2>
          <div className="advise">
            <span>General settings of the device.</span>
            <hr/>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">
              Device ID*
            </div>
            <div className="two_table_cel">
              <input type="text" className="two_input" id="id" defaultValue={this.state.device.id} onChange={this.updateId} disabled={ this.state.create ? false : true }/>
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">
              Device Type*
            </div>
            <div className="two_table_cel">
              <select name="type" className="two_input" id="type" value={this.state.device.type} onChange={this.updateType} disabled={ this.state.create ? false : true }>
                <option value="default">Select a device</option>
                {types}
              </select>
            </div>
          </div>
          <Text name="Nick names*" data="nicknames" value={nicknames} update={this.updateNames}/>
          <Text name="Hardware version" data="deviceInfo/hwVersion" value={this.state.device.deviceInfo ? this.state.device.deviceInfo.hwVersion : ''} update={this.update}/>
          <Text name="Software version" data="deviceInfo/swVersion" value={this.state.device.deviceInfo ? this.state.device.deviceInfo.swVersion : ''} update={this.update}/>
          <Text name="Manufacturer" data="deviceInfo/manufacturer" value={this.state.device.deviceInfo ? this.state.device.deviceInfo.manufacturer : ''} update={this.update}/>
          <Text name="Model" data="deviceInfo/model" value={this.state.device.deviceInfo ? this.state.device.deviceInfo.model : ''} update={this.update}/>
          <div className="advise">
            <span>Nick names must be separeted by <i>,</i> commas.</span><br/>
            <span>* data is required.</span>
          </div>
          <hr/>
          <h2>Traits</h2>
          <div className="advise">
            <span>The traits define what the device can do.</span>
          </div>
          {traits}
          <hr/>
          <div className="two_table_cel">
            <button type="button" style={ this.state.create ? deleteButtonDisabled : deleteButton } onClick={ this.delete } disabled={ this.state.create ? true : false}>Delete</button>
            <button type="button" onClick={ this.save }>Save</button>
            <span>{this.state.save_status}</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Editor
