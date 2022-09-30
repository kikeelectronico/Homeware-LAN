import React from 'react';
import OnOff from './traits/OnOff'
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

class Radiator extends React.Component {

  render() {

    const traits_container = {
      paddingLeft: '50px'
    }

    const color_strip = {
      width: '100%',
      height: '20px',
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: 'red',
      opacity: this.props.status.on ? '1' : '0.4'
    }

    return (
      <div>
        <div className="device_card">
          <div style={ color_strip }></div>
          <h2 className="device_card_title">{ this.props.device.name.name }</h2>
          <hr className="device_card_divider"/>
          <div style={traits_container}>
            <OnOff id={ this.props.device.id } on={ this.props.status.on } reload={ this.props.reload }/>
            <Information id={ this.props.device.id }/>
            <Connecting id={ this.props.device.id }/>
            <Edit id={ this.props.device.id }/>
          </div>
        </div>
      </div>
    );
  }
}

export default Radiator
