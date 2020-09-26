import React from 'react';
import Information from './aux/Information'
import Edit from './aux/Edit'

class Scene extends React.Component {

  render() {

    const traits_container = {
      paddingLeft: '50px'
    }

    var color = 'white';

    const color_strip = {
      width: '100%',
      height: '20px',
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: color
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
        <div className="device_card">
          <div style={ color_strip }></div>
          <h2 className="device_card_title">Scene: { this.props.device.name.name }</h2>
          <hr className="device_card_divider"/>
          <div style={traits_container}>
            <Information id={ this.props.device.id }/>
            <Edit id={ this.props.device.id }/>
          </div>
        </div>
      </div>
    );
  }
}

export default Scene
