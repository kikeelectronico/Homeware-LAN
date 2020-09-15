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
import getCookieValue from '../../functions'
import { root, deviceReference } from '../../constants'

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
  }

  componentDidMount() {
    if (!this.state.create){
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            console.log(data);
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
    console.log(this.state.device)
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
        temp_device.traits = temp_device.traits.filter(function(value, index, arr){ return value != event.target.id;});
      }
    }
    this.setState({
      device: temp_device
    })
    console.log(this.state.device)
  }

  save(){
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
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

  render() {

    const container = {
      width: '80%',
      marginLeft: '8%',
      marginTop: '20px',
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '20px',
      paddingRight: '20px',
      borderRadius: '20px'
    }

    const button = {
      width: '200px'
    }

    const deleteButton = {
      backgroundColor: 'red'
    }

    const types = Object.keys(deviceReference.devicesCoolNames).map((type) => {
      return <option key={type} value={type}>{deviceReference.devicesCoolNames[type]}</option>
    })

    const nicknames = this.state.device.name.nicknames.map((name) => {
      return name
    });

    const traits = this.state.posible_traits.map((trait) =>
      <div key={trait} className="attribute_table_row">
        <div className="attribute_table_cel">
          {deviceReference.traitsCoolNames[trait]}
        </div>
        <div className="attribute_table_cel">
          <label>
            <input type="checkbox" id={trait} defaultChecked={this.state.device.traits.includes(trait)} onChange={this.updateTraits}/>

          </label>
        </div>
        <div className="attribute_table_cel">
          <span className="attribute_advise"></span>
        </div>
      </div>
    );

    const attributes = this.state.device.traits.map((attribute) => {
      if (attribute === 'action.devices.traits.Scene')
        return <Scene key={attribute} sceneReversible={this.state.device.attributes.sceneReversible} update={this.update}/>
      else if (attribute === 'action.devices.traits.OnOff')
        return <OnOff key={attribute} commandOnlyOnOff={this.state.device.attributes.commandOnlyOnOff} queryOnlyOnOff={this.state.device.attributes.queryOnlyOnOff} update={this.update}/>
      else if (attribute === 'action.devices.traits.Brightness')
        return <Brightness key={attribute} commandOnlyBrightness={this.state.device.attributes.commandOnlyBrightness} update={this.update}/>
      else if (attribute === 'action.devices.traits.ColorSetting')
        return <ColorSetting key={attribute} commandOnlyColorSetting={this.state.device.attributes.commandOnlyColorSetting} colorModel={this.state.device.attributes.colorModel} colorTemperatureRange={this.state.device.attributes.colorTemperatureRange} update={this.update}/>
      else if (attribute === 'action.devices.traits.FanSpeed')
        return <FanSpeed key={attribute} attributes={this.state.device.attributes} update={this.update}/>
      else if (attribute === 'action.devices.traits.TemperatureSetting')
        return <TemperatureSetting key={attribute} attributes={this.state.device.attributes} update={this.update}/>
      else if (attribute === 'action.devices.traits.Toggles')
        return <Toggles key={attribute} attributes={this.state.device.attributes} update={this.update}/>
      else if (attribute === 'action.devices.traits.Modes')
        return <Modes key={attribute} attributes={this.state.device.attributes} update={this.update}/>
    });

    const modes = {
      "availableModes": [{
        "name": "mode",
        "name_values": [
          {
            "name_synonym": ["mode","mode test"],
            "lang": "en"
          }
        ],
        "settings": [
          {
            "setting_name": "full",
              "setting_values": [{
                "setting_synonym": ["max"],
                "lang": "en"
               }]
          },
          {
            "setting_name": "empty",
              "setting_values": [{
                "setting_synonym": ["min"],
                "lang": "en"
               }]
          }
        ]
      },{
        "name": "mode",
        "name_values": [
          {
            "name_synonym": ["mode","mode test"],
            "lang": "en"
          }
        ],
        "settings": [
          {
            "setting_name": "full",
              "setting_values": [{
                "setting_synonym": ["max"],
                "lang": "en"
               }]
          },
          {
            "setting_name": "empty",
              "setting_values": [{
                "setting_synonym": ["min"],
                "lang": "en"
               }]
          }
        ]
      }]
    }

    return (
      <div>

        <div style={ container }>
          <h2>Global settings</h2>
          <div className="advise">
            <span>General settings of the device.</span>
            <hr/>
          </div>
          <div className="table_row">
            <div className="table_cel">
              Device ID*
            </div>
            <div className="table_cel">
              <input type="text" id="id" className="table_input" defaultValue={this.state.device.id} onChange={this.updateId} disabled={ this.state.create ? false : true }/>
            </div>
          </div>
          <div className="table_row">
            <div className="table_cel">
              Device Type*
            </div>
            <div className="table_cel">
              <select name="type" id="type" className="table_input" value={this.state.device.type} onChange={this.updateType} disabled={ this.state.create ? false : true }>
                <option value="default">Select a device</option>
                {types}
              </select>
            </div>
          </div>
          <Text name="Hardware version" data="deviceInfo/hwVersion" value={this.state.device.deviceInfo.hwVersion} update={this.update}/>
          <Text name="Software version" data="deviceInfo/swVersion" value={this.state.device.deviceInfo.swVersion} update={this.update}/>
          <Text name="Manufacturer" data="deviceInfo/manufacturer" value={this.state.device.deviceInfo.manufacturer} update={this.update}/>
          <Text name="Model" data="deviceInfo/model" value={this.state.device.deviceInfo.model} update={this.update}/>
          <Text name="Nick names*" data="nicknames" value={nicknames} update={this.updateNames}/>
          <div className="advise">
            <span>Nick names must be separeted by <i>,</i> commas.</span><br/>
            <span>* data is required.</span>
          </div>
          <hr/>
          <h2>Traits</h2>
          <div className="advise">
            <span>The traits define what the device can do.</span>
            <hr/>
          </div>
          {traits}
          <hr/>
          <h2>Attributes</h2>
          <div className="advise">
            <span>The attributes configure the traits.</span>
            <hr/>
          </div>
          {attributes}
          <hr/>
          <div className="table_cel">
            <button type="button" style={deleteButton} onClick={ this.delete }>Delete</button>
            <button type="button" onClick={ this.save }>Save</button>
            <span>{this.state.save_status}</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Editor
