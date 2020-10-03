import React from 'react';
import Triggers from '../manager/Triggers.js'
import getCookieValue from '../../functions'
import { root } from '../../constants'

import './Manager.css';

class Manager extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split('/')[3];
    var create = false;
    if (id === "") create = true;
    this.state = {
      id: id,
      create: create,
      save_status: "",
      device_assistant: 0,
      task: {},
       devices: []
    }
    this.update = this.update.bind(this);
    this.deleteTrigger = this.deleteTrigger.bind(this);
    this.addTriggerLogic = this.addTriggerLogic.bind(this);
    this.showTriggerDeviceAssistant = this.showTriggerDeviceAssistant.bind(this);
    this.addTriggerDevice = this.addTriggerDevice.bind(this);
  }

  componentDidMount() {
    if (!this.state.create){
      var tas = new XMLHttpRequest();
      tas.onload = function (e) {
        if (tas.readyState === 4) {
          if (tas.status === 200) {
            var data = JSON.parse(tas.responseText);
            console.log(data);
            this.setState({
               task: data
             });
          } else {
            console.error(tas.statusText);
          }
        }
      }.bind(this);
      tas.open("GET", root + "api/tasks/get/" + this.state.id + "/");
      tas.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      tas.send();

      var dev = new XMLHttpRequest();
      dev.onload = function (e) {
        if (dev.readyState === 4) {
          if (dev.status === 200) {
            var data = JSON.parse(dev.responseText);
            var devices_names = {}
            data.forEach((device) => {
              devices_names[device.id] = device.name.name
            })
            this.setState({
               devices: devices_names
             });
          } else {
            console.error(dev.statusText);
          }
        }
      }.bind(this);
      dev.open("GET", root + "api/devices/get/");
      dev.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      dev.send();
    }
  }

  update(key, value){
    // var temp_device = this.state.device
    // var keys = key.split('/');
    // if (keys.length === 1)
    //   temp_device[key] = value
    // else if (keys.length === 2)
    //   temp_device[keys[0]][keys[1]] = value
    // else if (keys.length === 3)
    //   temp_device[keys[0]][keys[1]][keys[2]] = value
    // this.setState({
    //   device: temp_device
    // })
  }

  save(){
    // var http = new XMLHttpRequest();
    // http.onload = function (e) {
    //   if (http.readyState === 4) {
    //     if (http.status === 200) {
    //       JSON.parse(http.responseText);
    //       this.setState({
    //          save_status: "Saved correctly."
    //        });
    //     } else {
    //       console.error(http.statusText);
    //       this.setState({
    //          save_status: "Error, the changes haven't been saved."
    //        });
    //     }
    //     setTimeout(function(){
    //       this.setState({
    //          save_status: ""
    //        });
    //     }.bind(this), 5000)
    //   }
    // }.bind(this);
    // var payload = {
    //   "device": this.state.device
    // }
    // if (this.state.create){
    //   http.open("POST", root + "api/devices/create/");
    //   payload.status = this.state.status
    // } else {
    //   http.open("POST", root + "api/devices/update/");
    // }
    // http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    // http.send(JSON.stringify(payload));
  }

  delete(){
    // if(window.confirm('Do you want to delete the device?')){
    //   var http = new XMLHttpRequest();
    //   http.onload = function (e) {
    //     if (http.readyState === 4) {
    //       if (http.status === 200) {
    //         window.location.href = "/devices/"
    //       } else {
    //         console.error(http.statusText);
    //         this.setState({
    //            save_status: "Error, the device hasn't been deleted."
    //          });
    //       }
    //       setTimeout(function(){
    //         this.setState({
    //            save_status: ""
    //          });
    //       }.bind(this), 5000)
    //     }
    //   }.bind(this);
    //   http.open("GET", root + "api/devices/delete/" + this.state.device.id + "/");
    //   http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    //   http.send();
    // } else {
    //   this.setState({
    //      save_status: "Ok. The device is save."
    //    });
    // }
  }

  deleteTrigger(id) {
    // Get the task
    var task = this.state.task;
    var triggers = task.triggers;
    // Get the the parent id
    const parent = triggers[id].parent
    if (parent !== 'triggers') {
      // Delete from the parent
      const index = triggers[parent].operation.indexOf(id);
      triggers[parent].operation.splice(index,1)
      // Delete the trigger
      delete triggers[id];
      task.triggers = triggers;
    } else {
      task.triggers = {
        trigger: {
          type: 'clear'
        }
      };
    }
    this.setState({
      task: task
    });
  }

  addTriggerLogic(type, parent) {
    // Get the triggers
    var task = this.state.task;
    if (parent !== 'triggers') {
      // Get the timestamp
      const ts = Date.now();
      // Compose and create the logic trigger
      task.triggers[ts] = {
        operation: [],
        parent, parent,
        type: type
      };
      // Register the trigger in the parent
      task.triggers[parent].operation.push(ts);
    } else {
      task.triggers['trigger'] = {
        operation: [],
        parent: 'triggers',
        type: type
      };
    }
    // Update the component state
    this.setState({
      task: task
    });
  }

  showTriggerDeviceAssistant(parent) {
    this.setState({
      device_assistant: parent
    });
  }

  addTriggerDevice(type, parent) {

  }

  render() {

    const button = {
      width: '200px'
    }

    const deleteButton = {
      backgroundColor: 'red'
    }

    const deleteButtonDisabled = {
      backgroundColor: 'red',
      opacity: '0.2'
    }

    const separator = {
      width: '70%'
    }

    return (
      <div>

      <div className="page_block_container">
        <h2>Task</h2>
        <div className="advise">
          <span>General settings of the task.</span>
          <hr/>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Name*
          </div>
          <div className="two_table_cel">
            <input type="text" className="two_input" id="title" defaultValue={this.state.task.title} onChange={this.update}/>
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Description*
          </div>
          <div className="two_table_cel">
            <input type="text" className="two_input" id="description" defaultValue={this.state.task.description} onChange={this.update}/>
          </div>
        </div>
        <hr/>
        <h2>Triggers</h2>
        <div className="advise">
          <span></span>
        </div>
        {Object.keys(this.state.task).length > 0 ? <Triggers id="trigger" triggers={this.state.task.triggers} delete={this.deleteTrigger} addTriggerLogic={this.addTriggerLogic} showTriggerDeviceAssistant={this.showTriggerDeviceAssistant} devices={this.state.devices}/> : ''}
        {this.state.device_assistant !== 0 ? 'Trigger Device Assistant at ' + this.state.device_assistant : ''}
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

export default Manager
