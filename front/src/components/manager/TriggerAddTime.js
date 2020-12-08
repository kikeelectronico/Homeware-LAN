import React from 'react';

import '../pages/Manager.css';

class TriggerAddTime extends React.Component {
  constructor(props) {
    super(props);
    this.addTriggerOperation = this.addTriggerOperation.bind(this);
  }

  addTriggerOperation(){
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    var week = '';

    if (document.getElementById('monday').checked)
      week += '1'
    if (document.getElementById('tuesday').checked)
      week += '2'
    if (document.getElementById('wednesday').checked)
      week += '3'
    if (document.getElementById('thursday').checked)
      week += '4'
    if (document.getElementById('friday').checked)
      week += '5'
    if (document.getElementById('saturday').checked)
      week += '6'
    if (document.getElementById('sunday').checked)
      week += '0'

    const value = hour + ':' + minute + ':' + week;
    this.props.addTriggerOperation('time',value);
    this.props.closeTriggerAssistant();
  }

  render() {

    return (
      <div className="trigger_assistant_container">
        <h2 className="trigger_assistant_title">Triggered by time</h2>
        <div className="two_table_row">
          <div className="two_table_cel">
            Hour*
          </div>
          <div className="two_table_cel">
            <input type="number" className="number_input" id="hour" min="0" max="23"/>
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Minute*
          </div>
          <div className="two_table_cel">
            <input type="number" className="number_input" id="minute" min="0" max="59"/>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel">
            Week*
          </div>
          <div className="two_table_cel">
            <input type="checkbox" id="sunday"/>Sunday
            <input type="checkbox" id="monday"/>Monday
            <input type="checkbox" id="tuesday"/>Tuesday
            <input type="checkbox" id="wednesday"/>Wednesday
            <input type="checkbox" id="thursday"/>Thursday
            <input type="checkbox" id="friday"/>Friday
            <input type="checkbox" id="saturday"/>Saturday
          </div>
        </div>
        <span className="advise">24h format</span>

        <div className="trigger_assisstant_buttons_container">
          <button type="button" className="trigger_assistant_button" onClick={ this.addTriggerOperation }>Save</button>
          <button type="button" className="trigger_assistant_button red_button" onClick={ this.props.closeTriggerAssistant }>Cancel</button>
        </div>
      </div>
    );
  }
}

export default TriggerAddTime
