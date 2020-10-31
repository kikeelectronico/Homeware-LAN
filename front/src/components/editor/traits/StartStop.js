import React from 'react';
import Switch from "react-switch";

class StartStop extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateArray = this.updateArray.bind(this);
  }


  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }

  updateArray(event){
    this.props.update('attributes/' + event.target.id,event.target.value.split(','));
  }

  render() {
    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>pausable</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"pausable")}} checked={this.props.attributes.pausable} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the device can be paused.</span>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel align_right">
            Zones
          </div>
          <div className="two_table_cel">
            <input type="text" id="availableThermostatModes" defaultValue={this.props.attributes.availableZones} onChange={this.updateArray} className="text_input"/>
          </div>
        </div>

        <div className="two_table_row">
          <div className="two_table_cel">

          </div>
          <div className="two_table_cel">
            <span className="attribute_advise">Supported zones names separeted by commas.</span>
          </div>
        </div>


      </div>
    );
  }
}

export default StartStop
