import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.update = this.update.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  render() {
    return (
      <div>
        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyTimer" defaultChecked={this.props.attributes.commandOnlyTimer} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyTimer</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
          </div>
        </div>

        <div className="table_row">
          <div className="table_cel">

          </div>
          <div className="table_cel">
            Max time <input type="text" id="availableThermostatModes" defaultValue={this.props.attributes.maxTimerLimitSec} onChange={this.update} className="text_input"/>
          </div>
        </div>

        <div className="table_row">
          <div className="table_cel">

          </div>
          <div className="table_cel">
            <span className="attribute_advise">Indicates the longest timer setting in seconds available on the device.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer
