import React from 'react';

class StartStop extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateArray = this.updateArray.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  updateArray(event){
    this.props.update('attributes/' + event.target.id,event.target.value.split(','));
  }

  render() {
    return (
      <div>
        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="pausable" defaultChecked={this.props.attributes.pausable} onChange={this.updateCheckbox}/>
              <span className=""><i>pausable</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the device can be paused.</span>
          </div>
        </div>

        <div className="table_row">
          <div className="table_cel">

          </div>
          <div className="table_cel">
            Zones: <input type="text" id="availableThermostatModes" defaultValue={this.props.attributes.availableZones} onChange={this.updateArray} className="text_input"/>
          </div>
        </div>

        <div className="table_row">
          <div className="table_cel">

          </div>
          <div className="table_cel">
            <span className="attribute_advise">Supported zones names separeted by commas.</span>
          </div>
        </div>


      </div>
    );
  }
}

export default StartStop
