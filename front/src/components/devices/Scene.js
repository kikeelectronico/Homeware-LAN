import React from 'react';
import Enable from './traits/Enable'
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

class Scene extends React.Component {

  render() {

    const traits_container = {
      paddingLeft: '50px'
    }

    var color = 'lightsalmon';

    const color_strip = {
      width: '100%',
      height: '20px',
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: color,
      opacity: this.props.status.enable ? '1' : '0.4'
    }

    return (
      <div>
        <div className="device_card">
          <div style={ color_strip }></div>
          <h2 className="device_card_title">{ this.props.device.name.name }</h2>
          <hr className="device_card_divider"/>
          <div style={traits_container}>
            <Enable id={ this.props.device.id } status={ this.props.status } reload={ this.props.reload }/>
            <Information id={ this.props.device.id }/>
            <Connecting id={ this.props.device.id }/>
            <Edit id={ this.props.device.id }/>
          </div>
        </div>
      </div>
    );
  }
}

export default Scene
