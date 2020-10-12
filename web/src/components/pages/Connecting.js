import React from 'react';
import getCookieValue from '../../functions'
import { root, deviceReference } from '../../constants'

import './Connecting.css';

class Connecting extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split('/')[3]
    this.state = {
      id: id,
      traits: [],
      params: [],
      commands: []
    }
  }

  componentDidMount() {
    var dev = new XMLHttpRequest();
    dev.onload = function (e) {
      if (dev.readyState === 4) {
        if (dev.status === 200) {
          const data = JSON.parse(dev.responseText);
          const traits = data.traits;
          var commands = [];
          var params = []
          traits.forEach((trait) => {
            params = params.concat(deviceReference.traits[trait].params);
            commands = commands.concat(deviceReference.traits[trait].commands);
          });
          this.setState({
             traits: traits,
             params: params,
             commands: commands
           });
        } else {
          console.error(dev.statusText)
        }
      }
    }.bind(this);
    dev.open("GET", root + "api/devices/get/" + this.state.id + "/");
    dev.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    dev.send();
  }

  render() {

    const params = this.state.params.map((param, i) => {
      var type = deviceReference.params[param].type
      if (type === 'list')
        type = 'string'

      var topic = 'None - Controlled only by the device'
      if (deviceReference.params[param].commanded)
        topic = 'device/' + this.state.id + '/' + param

      return (
        <div key={i} className="param_table_row">
          <div className="param_table_cel">{param}</div>
          <div className="param_table_cel">{topic}</div>
          <div className="param_table_cel">{type}</div>
        </div>
      )
    })

    const commands = this.state.commands.map((command, i) => {
      return (
        <div key={i} className="command_table_row">
          <div className="command_table_cel">{command.command}</div>
          <div className="command_table_cel">{'device/' + this.state.id + '/command'}</div>
          <div className="command_table_cel">{command.description}</div>
        </div>
      )
    })

    return (
      <div>

        <div className="page_block_container">
          <h2>Params</h2>
          <div className="advise">
            <p>Params are data interchanged between Google and the device and stored in Homeware database. </p>
            <p>If the param has got a notification topic, Google Home can control it. A notification will be sent in this MQTT topic when Google change a param.</p>
            <p>If the param hasn't got a notification topic, the device should update the param value when necessary.</p>
            <hr/>
          </div>
          <div className="param_table_row param_table_header">
            <div className="param_table_cel"><b>Param</b></div>
            <div className="param_table_cel"><b>Notifications topic</b></div>
            <div className="param_table_cel"><b>Type</b></div>
          </div>
          {params}
          <div className="advise">
            <hr/>
            <p>The device can change the value of any param sending an execute request to device/control topic as follow</p>
            <p>&#123;"id":"light001","param":"brightness","value":"80","intent":"execute"&#125;</p>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Commands</h2>
          <div className="advise">
            <p>Commands are directs orders from Google to the device. Commands are not stored in Homeware's database.</p>
            <hr/>
          </div>
          <div className="command_table_row command_table_header">
            <div className="command_table_cel"><b>Command</b></div>
            <div className="command_table_cel"><b>Notifications topic</b></div>
            <div className="command_table_cel"><b>Description</b></div>
          </div>
          {commands}
        </div>

      </div>
    );
  }
}

export default Connecting
