import React from 'react';
import TriggerAddLogic from './TriggerAddLogic'
import Trigger from './Trigger'

class Triggers extends React.Component {
  constructor(props) {
    super(props);
    this.addOr = this.addOr.bind(this);
    this.addAnd = this.addAnd.bind(this);
    this.openTriggerAssistant = this.openTriggerAssistant.bind(this);
  }

  addOr() {
    this.props.addTriggerLogic('or','triggers')
  }

  addAnd() {
    this.props.addTriggerLogic('and','triggers')
  }

  openTriggerAssistant() {
    this.props.openTriggerAssistant('triggers')
  }

  render() {

    if (this.props.triggers.trigger) {
      var operation = this.props.triggers[this.props.id]
      const device_triggers = ['d2b','d2d','d2i','d2l','time','d2c']

      if (operation.type === 'or'){
        return <TriggerAddLogic id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic} openTriggerAssistant={this.props.openTriggerAssistant}/>
      } else if (operation.type === 'and'){
        return <TriggerAddLogic id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic} openTriggerAssistant={this.props.openTriggerAssistant}/>
      } else if (device_triggers.includes(operation.type)){
        return <Trigger id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete}/>
      }
    } else {
      return (
        <div>
        <button type="button" className="trigger_logic_button" onClick={ this.addOr }>Or</button>
        <button type="button" className="trigger_logic_button" onClick={ this.addAnd }>And</button>
        <button type="button" className="trigger_logic_button" onClick={ this.openTriggerAssistant }>Trigger</button>
        </div>
      );
    }

  }
}

export default Triggers
