import React from 'react';

import '../pages/Manager.css';

class Assistant extends React.Component {
  constructor(props) {
    super(props);
    this.addTriggerOperation = this.addTriggerOperation.bind(this);
  }

  addTriggerOperation(){
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const week = document.getElementById('week').value;

    const value = hour + ':' + minute + ':' + week;
    this.props.addTriggerOperation('time',value);
    this.props.closeTriggerAssistant();
  }

  render() {

    return (
      <div className="trigger_assistant_container">
        <h2 className="trigger_assistant_title">Triggered by time</h2>
        <div className="three_table_row">
          <div className="three_table_cel">
            Hour*
          </div>
          <div className="three_table_cel">
            <input type="number" className="" id="hour" min="0" max="23"/>
          </div>
          <div className="three_table_cel">
            <span className="advise">24h format</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel">
            Minute*
          </div>
          <div className="three_table_cel">
            <input type="number" className="" id="minute" min="0" max="59"/>
          </div>
          <div className="three_table_cel">
            <span className="advise"></span>
          </div>
        </div>
        <div className="two_table_row">
          <div className="two_table_cel">
            Week day*
          </div>
          <div className="two_table_cel">
            <select name="type" className="" id="week">
              <option value="0">Sunday</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
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

export default Assistant
