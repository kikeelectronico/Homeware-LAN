import React from 'react';
import Switch from "react-switch";

class FanSpeed extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateFanSpeeds = this.updateFanSpeeds.bind(this);
    this.addFanSpeed = this.addFanSpeed.bind(this);
  }


  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
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

    const names_box = {
      width: '150px'
    }

    const speeds = this.props.attributes.availableFanSpeeds.speeds.map((speed, i) => {
      return (
              <div key={i}>
                <div className="two_table_row" key={i}>
                  <div className="two_table_cel">
                  </div>
                  <div className="two_table_cel">
                    <label>
                      <span>Languaje: </span>
                      <select name="type" id={"lang_" + i} value={speed.speed_values[0].lang} onChange={this.updateFanSpeeds}>
                        <option value="es">es</option>
                        <option value="en">en</option>
                      </select>
                    </label>
                    <label>
                      <span>Speed name: </span>
                      <input type="text" id={"names_" + i} style={names_box} defaultValue={speed.speed_values[0].speed_synonym} placeholder="Speed name" onChange={this.updateFanSpeeds}/>
                    </label>
                  </div>
                </div>
              </div>
              )
    });

    return (
      <div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>reversible</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"reversible")}} checked={this.props.attributes.reversible} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the fan supports blowing in both directions.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>supportsFanSpeedPercent</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"supportsFanSpeedPercent")}} checked={this.props.attributes.supportsFanSpeedPercent} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the speed can be controlled with a number from 0 to 100.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyFanSpeed</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyFanSpeed")}} checked={this.props.attributes.commandOnlyFanSpeed} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the fan speed.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Add a speed
          </div>
          <div className="three_table_cel">
            <button type="button" className="add_attribute_button" onClick={ this.addFanSpeed }>Add</button>
          </div>
        </div>

        {speeds}

      </div>
    );
  }
}

export default FanSpeed
