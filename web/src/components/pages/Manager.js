import React from 'react';
import getCookieValue from '../../functions'
import { root, deviceReference } from '../../constants'

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
      save_status: ""
    }
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    if (!this.state.create){
      // var http = new XMLHttpRequest();
      // http.onload = function (e) {
      //   if (http.readyState === 4) {
      //     if (http.status === 200) {
      //       var data = JSON.parse(http.responseText);
      //       this.setState({
      //          device: data,
      //          posible_traits: deviceReference.devices[data.type]
      //        });
      //     } else {
      //       console.error(http.statusText);
      //     }
      //   }
      // }.bind(this);
      // http.open("GET", root + "api/devices/get/" + this.state.id + "/");
      // http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      // http.send();
    }
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

    const deleteButtonDisabled = {
      backgroundColor: 'red',
      opacity: '0.2'
    }

    const separator = {
      width: '70%'
    }


    return (
      <div>

        <div style={ container }>
          <h2>Tasks </h2>
          <div className="advise">
            <span>General settings of the device.</span>
            <hr/>
          </div>
          <div className="task_table_row">
            <div className="task_table_cel">
              Device ID*
            </div>
            <div className="task_table_cel">
              <input type="text" id="id" className="task_table_input" defaultValue="" onChange={this.updateId} />
            </div>
          </div>

          <hr/>
          <div className="task_table_cel">
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
