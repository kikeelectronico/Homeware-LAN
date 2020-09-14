import React from 'react';

class FanSpeed extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateFanSpeeds = this.updateFanSpeeds.bind(this);
    this.addFanSpeed = this.addFanSpeed.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  updateFanSpeeds(event){
    const id = event.target.id.split('_')
    const speed_id = id[1]
    //Process the attribute and value depending of the attribute
    const speed_attribute = id[0] === 'lang' ? id[0] : 'speed_synonym';
    const value = id[0] === 'lang' ? event.target.value : event.target.value.split(',')
    //Update the temporal data and update it
    var temp_availableFanSpeeds = this.props.attributes.availableFanSpeeds
    temp_availableFanSpeeds.speeds[speed_id].speed_values[0][speed_attribute] = value
    if (id[0] === 'names') temp_availableFanSpeeds.speeds[speed_id].speed_name = value[0]
    this.props.update('attributes/availableFanSpeeds', temp_availableFanSpeeds);
  }

  addFanSpeed(){
    var temp_availableFanSpeeds = this.props.attributes.availableFanSpeeds
    temp_availableFanSpeeds.speeds.push({
      "speed_name": "",
      "speed_values": [
        {
          "speed_synonym": [""],
          "lang": "en"
        }
      ]
    });
    this.props.update('attributes/availableFanSpeeds', temp_availableFanSpeeds);
  }

  render() {

    const select = {

    }

    const names = {
      marginLeft: '20px',
      width: '400px'
    }

    const speeds = this.props.attributes.availableFanSpeeds.speeds.map((speed, i) => {
      return (<div className="table_row" key={i}>
                <div className="table_cel">
                </div>
                <div className="table_cel">
                  <select name="type" id={"lang_" + i} style={select} value={speed.speed_values[0].lang} onChange={this.updateFanSpeeds}>
                    <option value="es">es</option>
                    <option value="en">en</option>
                  </select>
                  <input type="text" id={"names_" + i} style={names} defaultValue={speed.speed_values[0].speed_synonym} onChange={this.updateFanSpeeds}/>
                </div>
              </div>)
    });

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

        <div className="table_row">
          <div className="table_cel">
          </div>
          <div className="table_cel">
            Speeds names <button type="button" onClick={ this.addFanSpeed }>Add</button>
          </div>
        </div>

        {speeds}

      </div>
    );
  }
}

export default FanSpeed
