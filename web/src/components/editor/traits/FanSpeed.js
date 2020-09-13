import React from 'react';

class FanSpeed extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  render() {
    return (
      <div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
            Fan Speed
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="reversible" defaultChecked={this.props.attributes.reversible} onChange={this.updateCheckbox}/>
              <span className=""><i>reversible</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the fan supports blowing in both directions.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="supportsFanSpeedPercent" defaultChecked={this.props.attributes.supportsFanSpeedPercent} onChange={this.updateCheckbox}/>
              <span className=""><i>supportsFanSpeedPercent</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the speed can be controlled with a number from 0 to 100.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyFanSpeed" defaultChecked={this.props.attributes.commandOnlyFanSpeed} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyFanSpeed</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Google can't ask for the fan state.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            Modes <input type="text" id="availableFanSpeeds" defaultValue={this.props.attributes.availableFanSpeeds} onChange={this.updateArray} className="table_input"/>
          </div>
        </div>

      </div>
    );
  }
}

export default FanSpeed
