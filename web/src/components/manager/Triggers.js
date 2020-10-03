import React from 'react';
import Logic from './Logic'
import Device from './Device'

class Triggers extends React.Component {
  constructor(props) {
    super(props);
    this.addOr = this.addOr.bind(this);
    this.addAnd = this.addAnd.bind(this);
    this.showTriggerDeviceAssistant = this.showTriggerDeviceAssistant.bind(this);
  }

  addOr() {
    this.props.addTriggerLogic('or','triggers')
  }

  addAnd() {
    this.props.addTriggerLogic('and','triggers')
  }

  showTriggerDeviceAssistant() {
    this.props.showTriggerDeviceAssistant('triggers')
  }

  render() {

    var operation = this.props.triggers[this.props.id]
    const device_triggers = ['d2b','d2d','d2i','d2l','time']

    if (operation.type === 'or'){
      return <Logic id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic} showTriggerDeviceAssistant={this.props.showTriggerDeviceAssistant}/>
    } else if (operation.type === 'and'){
      return <Logic id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic} showTriggerDeviceAssistant={this.props.showTriggerDeviceAssistant}/>
    } else if (device_triggers.includes(operation.type)){
      return <Device id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete}/>
    } else {
      return (
        <div>
        <button type="button" className="trigger_logic_button" onClick={ this.addOr }>Or</button>
        <button type="button" className="trigger_logic_button" onClick={ this.addAnd }>And</button>
        <button type="button" className="trigger_logic_button" onClick={ this.showTriggerDeviceAssistant }>Trigger</button>
        </div>
      );
    }

  }
}

export default Triggers
