import React from 'react';
import TriggerAddTime from './TriggerAddTime'
import TriggerAddDevice from './TriggerAddDevice'
import TriggerAddDeviceToDevice from './TriggerAddDeviceToDevice'

import '../pages/Manager.css';

class AddTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    }
    this.timeTigger = this.timeTigger.bind(this);
    this.deiceTrigger = this.deiceTrigger.bind(this);
    this.deviceToDeviceTrigger = this.deviceToDeviceTrigger.bind(this);
  }

  timeTigger() {
    this.setState({
      type: 'time'
    });
  }

  deiceTrigger() {
    this.setState({
      type: 'device'
    });
  }

  deviceToDeviceTrigger() {
    this.setState({
      type: 'device2device'
    });
  }

  render() {

    if (this.state.type === '')
      return (
        <div className="trigger_assistant_container">
          <h2 className="trigger_assistant_title">New trigger</h2>
          <div className="trigger_assisstant_buttons_container">
            <button type="button" className="trigger_assistant_button" onClick={ this.timeTigger }>Time</button>
            <button type="button" className="trigger_assistant_button" onClick={ this.deiceTrigger }>Device</button>
            <button type="button" className="trigger_assistant_button" onClick={ this.deviceToDeviceTrigger }>Device to device</button>
            <button type="button" className="trigger_assistant_button red_button" onClick={ this.props.closeTriggerAssistant }>Cancel</button>
          </div>
        </div>
      );
    else if (this.state.type === 'time')
      return <TriggerAddTime closeTriggerAssistant={this.props.closeTriggerAssistant} addTriggerOperation={this.props.addTriggerOperation}/>
    else if (this.state.type === 'device')
      return <TriggerAddDevice devices={this.props.devices} status={this.props.status} closeTriggerAssistant={this.props.closeTriggerAssistant} addTriggerOperation={this.props.addTriggerOperation}/>
    else if (this.state.type === 'device2device')
      return <TriggerAddDeviceToDevice devices={this.props.devices} status={this.props.status} closeTriggerAssistant={this.props.closeTriggerAssistant} addTriggerOperation={this.props.addTriggerOperation}/>
  }
}

export default AddTrigger
