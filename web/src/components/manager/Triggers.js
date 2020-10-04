import React from 'react';
import Logic from './Logic'
import Trigger from './Trigger'

class Triggers extends React.Component {
  constructor(props) {
    super(props);
    this.addOr = this.addOr.bind(this);
    this.addAnd = this.addAnd.bind(this);
    this.showTriggerAssistant = this.showTriggerAssistant.bind(this);
  }

  addOr() {
    this.props.addTriggerLogic('or','triggers')
  }

  addAnd() {
    this.props.addTriggerLogic('and','triggers')
  }

  showTriggerAssistant() {
    this.props.showTriggerAssistant('triggers')
  }

  render() {

    if (this.props.triggers.trigger) {
      var operation = this.props.triggers[this.props.id]
      const device_triggers = ['d2b','d2d','d2i','d2l','time','d2c']

      if (operation.type === 'or'){
        return <Logic id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic} showTriggerAssistant={this.props.showTriggerAssistant}/>
      } else if (operation.type === 'and'){
        return <Logic id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic} showTriggerAssistant={this.props.showTriggerAssistant}/>
      } else if (device_triggers.includes(operation.type)){
        return <Trigger id={this.props.id} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete}/>
      }
    } else {
      return (
        <div>
        <button type="button" className="trigger_logic_button" onClick={ this.addOr }>Or</button>
        <button type="button" className="trigger_logic_button" onClick={ this.addAnd }>And</button>
        <button type="button" className="trigger_logic_button" onClick={ this.showTriggerAssistant }>Trigger</button>
        </div>
      );
    }

  }
}

export default Triggers
