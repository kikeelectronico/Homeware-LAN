import React from 'react';
import getCookieValue from '../../functions'
import { root } from '../../constants'

import './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        google: {},
        ddns: {},
        mqtt: {},
        apikey: ""
      },
      save_status: "",
      url: {
        auth: "",
        token: "",
        fulfillment: ""
      }
    }
    this.update = this.update.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    if (!this.state.create){
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            this.setState({
               settings: data,
               url: {
                 auth: "https://" + data.ddns.hostname + "/auth/",
                 token: "https://" + data.ddns.hostname + "/token/",
                 fulfillment: "https://" + data.ddns.hostname + "/smarthome/"
               }
             });
          } else {
            console.error(http.statusText);
          }
        }
      }.bind(this);
      http.open("GET", root + "api/settings/get/");
      http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      http.send();
    }
  }

  update(event){
    // this.props.update('attributes/' + event.target.id,event.target.value);
    const id = event.target.id.split("/");
    var settings = this.state.settings;
    if (id.length === 1){
      settings[id[0]] = event.target.value;
    } else if (id.length === 2){
      settings[id[0]][id[1]] = event.target.value;
    }
    this.setState({
       settings: settings
     });
  }

  updateCheckbox(event){
    // this.props.update('attributes/' + event.target.id,event.target.value);
    const id = event.target.id.split("/");
    var settings = this.state.settings;
    if (id.length === 1){
      settings[id[0]] = event.target.checked;
    } else if (id.length === 2){
      settings[id[0]][id[1]] = event.target.checked;
    }
    this.setState({
       settings: settings
     });
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
    http.open("POST", root + "api/settings/update/");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send(JSON.stringify(this.state.settings));
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

    const sub_container = {
      width: '80%',
      marginTop: '10px',
      marginLeft: '10%',
      fontSize: '18px',
      textAlign: 'left'
    }

    const button = {
      width: '200px'
    }

    return (
      <div>


        <div style={ container }>
          <h2>Actions on Google</h2>
          <hr/>
          <div style={sub_container}>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Client ID
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="google/client_id" defaultValue={this.state.settings.google.client_id} onChange={this.update}/>
              </div>
              <div className="settings_table_cel">
                <span className="advise"></span>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Client Secret
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="google/client_secret" defaultValue={this.state.settings.google.client_secret} onChange={this.update}/>
              </div>
              <div className="settings_table_cel">
                <span className="advise"></span>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Authorization URL
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" defaultValue={this.state.url.auth} disabled/>
              </div>
              <div className="settings_table_cel">
                <span className="advise"></span>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Token URL
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" defaultValue={this.state.url.token} disabled/>
              </div>
              <div className="settings_table_cel">
                <span className="advise"></span>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Fulfillment URL
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" defaultValue={this.state.url.fulfillment} disabled/>
              </div>
              <div className="settings_table_cel">
                <span className="advise"></span>
              </div>
            </div>
          </div>
          <div className="save_container">
            <button type="button" style={ button } onClick={ this.save }>Save</button>
            <span>{this.state.save_status}</span>
          </div>
          <div className="advise">
            <span>Actions on Google settings. It is used to authenticate with Google. If you change it here, you must change it on the Actions Console &#62; Develop &#62; Account Linking.</span>
          </div>
        </div>


        <div style={ container }>
          <h2>MQTT</h2>
          <hr/>
          <div style={sub_container}>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                User
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="mqtt/user" defaultValue={this.state.settings.mqtt.user} onChange={this.update}/>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Password
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="mqtt/password" defaultValue={this.state.settings.mqtt.password} onChange={this.update}/>
              </div>
            </div>
          </div>
          <div className="save_container">
            <button type="button" style={ button } onClick={ this.save }>Save</button>
            <span>{this.state.save_status}</span>
          </div>
          <div className="advise">
            <span>Important. You must configure the username and password into Mosquitto manually from a terminal. This is only for telling Homeware its credentials. Clear both if you don't use credentials.</span>
          </div>
        </div>

        <div style={ container }>
          <h2>DDNS provider</h2>
          <hr/>
          <div style={sub_container}>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Status:
              </div>
              <div className="settings_table_cel">
                { this.state.settings.ddns.status }
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                IP and time:
              </div>
              <div className="settings_table_cel">
                { this.state.settings.ddns.ip + " updated at " + this.state.settings.ddns.last}
              </div>
            </div>
          </div>
          <hr/>
          <div style={sub_container}>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Enable
              </div>
              <div className="settings_table_cel">
                <input type="checkbox" id="ddns/enabled" defaultChecked={this.state.settings.ddns.enabled} onChange={this.updateCheckbox}/>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Provider
              </div>
              <div className="settings_table_cel">
                <select name="type" className="settings_select" id="ddns/provider" value={this.state.settings.ddns.provider} onChange={this.update}>
                  <option value="noip">Noip</option>
                </select>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Username
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="ddns/username" defaultValue={this.state.settings.ddns.username} onChange={this.update}/>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Password
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="ddns/password" defaultValue={this.state.settings.ddns.password} onChange={this.update}/>
              </div>
            </div>
            <div className="settings_table_row">
              <div className="settings_table_cel">
                Hostname
              </div>
              <div className="settings_table_cel">
                <input type="text" className="settings_input" id="ddns/hostname" defaultValue={this.state.settings.ddns.hostname} onChange={this.update}/>
              </div>
            </div>
          </div>
          <div className="save_container">
            <button type="button" style={ button } onClick={ this.save }>Save</button>
            <span>{this.state.save_status}</span>
          </div>
          <div className="advise">
            <span>Set up the access data to the DDNS provider account. Open an issue on Github if you want a DDNS provider that is not listed.</span>
          </div>
        </div>


      </div>
    );
  }
}

export default Settings
