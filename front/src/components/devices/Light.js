import React from 'react';
import OnOff from './traits/OnOff'
import Brightness from './traits/Brightness'
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

class Light extends React.Component {

  render() {

    const traits_container = {
      paddingLeft: '50px'
    }

    var color = 'yellow';
    if (this.props.device.traits.includes("action.devices.traits.ColorSetting" && Object.keys(this.props.status).includes("color"))){
      if (Object.keys(this.props.status.color).includes("spectrumRgb"))
        color = "#" + this.props.status.color.spectrumRgb.toString(16);
      else
        color = "#" + this.props.status.color.spectrumRGB.toString(16);
    }

    const color_strip = {
      width: '100%',
      height: '20px',
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: color,
      opacity: this.props.status.on ? '1' : '0.4'
    }

    return (
      <div>
        <div className="device_card">
          <div style={ color_strip }></div>
          <h2 className="device_card_title">{ this.props.device.name.name }</h2>
          <hr className="device_card_divider"/>
          <div style={traits_container}>
            {
              Object.keys(this.props.status).includes("on") ?
                <OnOff id={ this.props.device.id } on={ this.props.status.on } reload={ this.props.reload }/>
              :
              <></>
            }
            {
              Object.keys(this.props.status).includes("brightness") ?
                <Brightness id={ this.props.device.id } brightness={ this.props.status.brightness }/>
              :
              <></>
            }
            <Information id={ this.props.device.id }/>
            <Connecting id={ this.props.device.id }/>
            <Edit id={ this.props.device.id }/>
          </div>
        </div>
      </div>
    );
  }
}

export default Light
