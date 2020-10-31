import React from 'react';
import Switch from "react-switch";

class Rotation extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }

  render() {
    return (
      <div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Minimum rotation
          </div>
          <div className="three_table_cel">
            <input type="number" id="rotationDegreesRange/rotationDegreesMin" defaultValue={ this.props.attributes.rotationDegreesRange ? this.props.attributes.rotationDegreesRange.rotationDegreesMin : 0} min="0" max="100" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Minimum rotation degrees that a device can rotate.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Maximum rotation
          </div>
          <div className="three_table_cel">
            <input type="number" id="rotationDegreesRange/rotationDegreesMax" defaultValue={this.props.attributes.rotationDegreesRange ? this.props.attributes.rotationDegreesRange.rotationDegreesMax : 0} min="0" max="100" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum rotation degrees that a device can rotate.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyRotation</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyRotation")}} checked={this.props.attributes.commandOnlyRotation} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the device.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>supportsContinuousRotation</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"supportsContinuousRotation")}} checked={this.props.attributes.supportsContinuousRotation} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the device supports continuous rotation.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>supportsDegrees</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"supportsDegrees")}} checked={this.props.attributes.supportsDegrees} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the device allows rotation by degree.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>supportsPercent</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"supportsPercent")}} checked={this.props.attributes.supportsPercent} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if device allows rotation by percent.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Rotation
