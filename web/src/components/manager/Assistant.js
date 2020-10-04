import React from 'react';
import Time from './Time'
import Device from './Device'

import '../pages/Manager.css';

class Assistant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    }
    this.timeTigger = this.timeTigger.bind(this);
    this.deiceTrigger = this.deiceTrigger.bind(this);
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

  render() {

    if (this.state.type === '')
      return (
        <div className="trigger_assistant_container">
          <h2 className="trigger_assistant_title">Add a new trigger</h2>
          <div className="trigger_assisstant_buttons_container">
            <button type="button" className="trigger_assistant_button" onClick={ this.timeTigger }>Time</button>
            <button type="button" className="trigger_assistant_button" onClick={ this.deiceTrigger }>Device</button>
            <button type="button" className="trigger_assistant_button" onClick={ this.deviceToDeviceTrigger }>Device to device</button>
            <button type="button" className="trigger_assistant_button red_button" onClick={ this.props.closeTriggerAssistant }>Cancel</button>
          </div>
        </div>
      );
    else if (this.state.type === 'time')
      return <Time closeTriggerAssistant={this.props.closeTriggerAssistant} updateTriggerOperation={this.props.updateTriggerOperation}/>
    else if (this.state.type === 'device')
      return <Device devices={this.props.devices} status={this.props.status} closeTriggerAssistant={this.props.closeTriggerAssistant} updateTriggerOperation={this.props.updateTriggerOperation}/>
  }
}

export default Assistant
