import React from 'react';
import Switch from "react-switch";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.update = this.update.bind(this);
  }


  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  render() {
    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyTimer</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyTimer")}} checked={this.props.attributes.commandOnlyTimer} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel align_right">
            Max time
          </div>
          <div className="two_table_cel">
            <input type="text" id="maxTimerLimitSec" defaultValue={this.props.attributes.maxTimerLimitSec} onChange={this.update} className="text_input"/>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel">

          </div>
          <div className="two_table_cel">
            <span className="attribute_advise">Indicates the longest timer setting in seconds available on the device.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer
