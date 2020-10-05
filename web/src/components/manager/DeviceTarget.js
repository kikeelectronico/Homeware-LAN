import React from 'react';
import { deviceReference } from '../../constants'

import '../pages/Manager.css';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: ""
    }
    this.updateDevice = this.updateDevice.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.addTarget = this.addTarget.bind(this);
  }

  updateDevice(event) {
    this.setState({
      device: event.target.value
    });
  }

  updateParam(event) {
    this.setState({
      param: event.target.value
    });
  }

  addTarget(){
    const device = document.getElementById('device').value;
    const param = document.getElementById('param').value;
    const value = document.getElementById('value').value;

    const target = {
      device: device,
      param: param,
      value: value
    }
    this.props.addTarget(target);
    document.getElementById('device').value = '';
    document.getElementById('param').value = '';
    this.setState({
      param: ''
    });
  }

  render() {

    const devices = Object.keys(this.props.devices).map((device) => {
      return <option key={device} value={device}>{this.props.devices[device]}</option>
    })

    const params = this.state.device === "" ? '' : Object.keys(this.props.status[this.state.device]).map((param) => {
      return <option key={param} value={param}>{ deviceReference.params[param] ? deviceReference.params[param].name : param + ' - Not supported yet' }</option>
    })

    var value = '';
    if (deviceReference.params[this.state.param]){
      const type = deviceReference.params[this.state.param].type;
      if(type === 'd2i'){
        value = (
          <div className="two_table_row">
            <div className="two_table_cel">
              Value*
            </div>
            <div className="two_table_cel">
              <input type="number" className="" id="value"/>
            </div>
          </div>
        )
      } else if(type === 'd2b' || type === 'd2l'){

        const options = deviceReference.params[this.state.param].select.map((option) => {
          return <option key={option} value={option}>{option}</option>
        })

        value = (
          <div className="two_table_row">
            <div className="two_table_cel">
              Value*
            </div>
            <div className="two_table_cel">
              <select name="type" className="two_input" id="value">
                {options}
              </select>
            </div>
          </div>
        )
      }

    }

    return (
      <div className="trigger_assistant_container">
        <h2 className="trigger_assistant_title">New target</h2>

        <div className="two_table_row">
          <div className="two_table_cel">
            Device*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="device" onChange={this.updateDevice}>
              <option value="">Select a device</option>
              {devices}
            </select>
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Param*
          </div>
          <div className="two_table_cel">
            <select name="type" className="two_input" id="param" onChange={this.updateParam}>
              <option value="">Select a param</option>
              {params}
            </select>
          </div>
        </div>

        {value}

        <div className="trigger_assisstant_buttons_container">
          <button type="button" className="trigger_assistant_button" onClick={ this.addTarget }>Add</button>
        </div>
      </div>
    );
  }
}

export default Device
