import React from 'react';
import { deviceReference } from '../../constants'

import '../pages/Manager.css';

class DeviceToDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device_a: "",
      device_b: ""
    }
    this.updateDependencies = this.updateDependencies.bind(this);
    this.addTriggerOperation = this.addTriggerOperation.bind(this);
  }

  updateDependencies(event) {
    var state = this.state;
    state[event.target.id] = event.target.value;
    this.setState(state);
  }


  addTriggerOperation(){
    const device_a = document.getElementById('device_a').value;
    const param_a = document.getElementById('param_a').value;
    const comparator = document.getElementById('comparator').value;
    const device_b = document.getElementById('device_b').value;
    const param_b = document.getElementById('param_b').value;

    const operation = device_a + ':' + param_a + ':' + comparator + ':' + device_b + ':' + param_b;
    this.props.addTriggerOperation('d2d',operation);
    this.props.closeTriggerAssistant();
  }

  render() {

    const devices = Object.keys(this.props.devices).map((device) => {
      return <option key={device} value={device}>{this.props.devices[device]}</option>
    })

    const params_a = this.state.device_a === "" ? '' : Object.keys(this.props.status[this.state.device_a]).map((param) => {
      return <option key={param} value={param}>{ deviceReference.params[param] ? deviceReference.params[param].name : param + ' - Not supported yet' }</option>
    })

    const params_b = this.state.device_b === "" ? '' : Object.keys(this.props.status[this.state.device_b]).map((param) => {
      return <option key={param} value={param}>{ deviceReference.params[param] ? deviceReference.params[param].name : param + ' - Not supported yet' }</option>
    })

    return (
      <div className="trigger_assistant_container">
        <h2 className="trigger_assistant_title">Compare two devices</h2>

        <div className="two_table_row">
          <div className="two_table_cel">
            Device A*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="device_a" onChange={this.updateDependencies}>
              <option value="">Select a device</option>
              {devices}
            </select>
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Param A*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="param_a" onChange={this.updateDependencies}>
              <option value="">Select a param</option>
              {params_a}
            </select>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel">
            Comparator*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="comparator">
              <option>=</option>
              <option>&lt;</option>
              <option>&gt;</option>
              <option>&lt;=</option>
              <option>&gt;=</option>
            </select>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel">
            Device B*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="device_b" onChange={this.updateDependencies}>
              <option value="">Select a device</option>
              {devices}
            </select>
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Param B*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="param_b" onChange={this.updateDependencies}>
              <option value="">Select a param</option>
              {params_b}
            </select>
          </div>
        </div>

        <div className="trigger_assisstant_buttons_container">
          <button type="button" className="trigger_assistant_button" onClick={ this.addTriggerOperation }>Save</button>
          <button type="button" className="trigger_assistant_button red_button" onClick={ this.props.closeTriggerAssistant }>Cancel</button>
        </div>
      </div>
    );
  }
}

export default DeviceToDevice
