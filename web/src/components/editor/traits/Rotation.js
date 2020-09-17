import React from 'react';

class Rotation extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  render() {
    return (
      <div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Minimum rotation <input type="number" id="rotationDegreesRange/rotationDegreesMin" defaultValue={ this.props.attributes.rotationDegreesRange ? this.props.attributes.rotationDegreesRange.rotationDegreesMin : 0} min="0" max="100" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Minimum rotation degrees that a device can rotate.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Maximum rotation <input type="number" id="rotationDegreesRange/rotationDegreesMax" defaultValue={this.props.attributes.rotationDegreesRange ? this.props.attributes.rotationDegreesRange.rotationDegreesMax : 0} min="0" max="100" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Maximum rotation degrees that a device can rotate.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyRotation" defaultChecked={this.props.attributes.commandOnlyRotation} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyRotation</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the device.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="supportsContinuousRotation" defaultChecked={this.props.attributes.supportsContinuousRotation} onChange={this.updateCheckbox}/>
              <span className=""><i>supportsContinuousRotation</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the device supports continuous rotation.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="supportsDegrees" defaultChecked={this.props.attributes.supportsDegrees} onChange={this.updateCheckbox}/>
              <span className=""><i>supportsDegrees</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the device allows rotation by degree.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="supportsPercent" defaultChecked={this.props.attributes.supportsPercent} onChange={this.updateCheckbox}/>
              <span className=""><i>supportsPercent</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if device allows rotation by percent.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Rotation
