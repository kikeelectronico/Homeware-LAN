import React from 'react';
import Triggers from './Triggers'

import '../pages/Manager.css';

class TriggerAddLogic extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.addOr = this.addOr.bind(this);
    this.addAnd = this.addAnd.bind(this);
    this.openTriggerAssistant = this.openTriggerAssistant.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  addOr() {
    this.props.addTriggerLogic('or',this.props.id)
  }

  addAnd() {
    this.props.addTriggerLogic('and',this.props.id)
  }

  openTriggerAssistant() {
    this.props.openTriggerAssistant(this.props.id)
  }

  render() {

    const num_operations = this.props.triggers[this.props.id].operation.length-1;
    const operations = this.props.triggers[this.props.id].operation.map((op, i) => {
      return (
        <div key={op + i }>
          <Triggers id={op} triggers={this.props.triggers} devices={this.props.devices} delete={this.props.delete} addTriggerLogic={this.props.addTriggerLogic}  openTriggerAssistant={this.props.openTriggerAssistant}/>
          {i < num_operations ? <h2 className="trigger_logic_title">{this.props.triggers[this.props.id].type}</h2> : '' }
        </div>
      );
    });

    return (
      <div className="trigger_logic_container">
          {operations}
          <div className="trigger_logic_buttons_container">
            <button type="button" className="trigger_logic_button" onClick={ this.addOr }>Or</button>
            <button type="button" className="trigger_logic_button" onClick={ this.addAnd }>And</button>
            <button type="button" className="trigger_logic_button" onClick={ this.openTriggerAssistant }>Trigger</button>
            <button type="button" className="trigger_logic_button red_button" onClick={ this.delete }>Delete</button>
          </div>
      </div>
    );
  }
}

export default TriggerAddLogic
