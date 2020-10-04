import React from 'react';
import { deviceReference } from '../../constants'

import '../pages/Manager.css';

class Trigger extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.renderTriggerText = this.renderTriggerText.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  renderTriggerText() {
    const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const device_triggers = ['d2b','d2i','d2l']

    const type = this.props.triggers[this.props.id].type;
    const operation = this.props.triggers[this.props.id].operation.split(':');
    if (device_triggers.includes(type)) {
      return this.props.devices[operation[0]] + ' (' + (deviceReference.params[operation[1]] ? deviceReference.params[operation[1]].name : operation[1]) + ') ' +  operation[2] + ' ' +  operation[3];
    } else if (type === 'd2d') {
      return this.props.devices[operation[0]] + ' (' + (deviceReference.params[operation[1]] ? deviceReference.params[operation[1]].name : operation[1]) + ') ' +  operation[2] + ' ' +  this.props.devices[operation[3]] + ' (' + (deviceReference.paramCoolName[operation[4]] ? deviceReference.paramCoolName[operation[4]] : operation[4]) + ') ';
    } else if (type === 'd2c') {
      return this.props.devices[operation[0]] + ' (' + (deviceReference.params[operation[1]] ? deviceReference.params[operation[1]].name : operation[1]) + ') ' +  operation[2] + ' ' +  operation[3];
    } else if (type === 'time') {
      var days = '';
      for( var i = 2; i < operation.length; i++){
        days += week[operation[i]];
        if (i !== operation.length - 1)
          days += ', ';
      }
      return operation[0] + ':'  + operation[1] + ' on ' + days

    } else {
      return this.props.triggers[this.props.id].operation
    }
  }

  render() {

    return (
      <div className="trigger_device_container">
        <span>{this.renderTriggerText()}</span>
        <img src="/global/bin_icon.png" alt="Delete icon" className="trigger_delete" onClick={this.delete}/>
      </div>
    );
  }
}

export default Trigger
