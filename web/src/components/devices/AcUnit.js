import React from 'react';
import OnOff from './traits/OnOff'
import TemperatureSetting from './traits/TemperatureSetting'
import Information from './aux/Information'
import Edit from './aux/Edit'

class AcUnit extends React.Component {

  render() {

    const traits_container = {
      paddingLeft: '50px'
    }

    var color = 'yellow';
    if (this.props.status.thermostatMode === 'off')
      color = "#666";
    else if (this.props.status.thermostatMode === 'heat')
      color = "red";
    else if (this.props.status.thermostatMode === 'cool')
      color = "lightblue";
    else if (this.props.status.thermostatMode === 'on')
      color = "yellow";
    else if (this.props.status.thermostatMode === 'heatcool')
      color = "#DC97FF";
    else if (this.props.status.thermostatMode === 'auto')
      color = "#EE357E";
    else if (this.props.status.thermostatMode === 'fan-only')
      color = "blue";
    else if (this.props.status.thermostatMode === 'purifier')
      color = "#F3882E";
    else if (this.props.status.thermostatMode === 'eco')
      color = "green";
    else if (this.props.status.thermostatMode === 'dry')
      color = "#753500";


    const color_strip = {
      width: '100%',
      height: '20px',
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: color,
      opacity: this.props.status.on ? '1' : '0.4'
    }

    const title = {
      marginTop: '5px',
      marginBottom: '5px'
    }

    const devider = {
      width: '80%'
    }

    return (
      <div>
        <div className="device_container">
          <div style={ color_strip }></div>
          <h2 style={ title }>{ this.props.device.name.name }</h2>
          <hr style={ devider }/>
          <div style={traits_container}>
            <TemperatureSetting id={ this.props.device.id } status={this.props.status} on={ this.props.status } reload={ this.props.reload }/>
            <OnOff id={ this.props.device.id } on={ this.props.status.on } reload={ this.props.reload }/>
            <Information id={ this.props.device.id }/>
            <Edit id={ this.props.device.id }/>
          </div>
        </div>
      </div>
    );
  }
}

export default AcUnit
