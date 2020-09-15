import React from 'react';
import OnOff from './traits/OnOff'
import Information from './aux/Information'
import Edit from './aux/Edit'

class Radiator extends React.Component {

  render() {

    const device_container = {
      width: '400px',
      height: '120px',
      margin: '20px',
      borderRadius: '20px',
      backgroundColor: 'white'
    }

    const color_strip = {
      width: '100%',
      height: '20px',
      borderRadius: '20px 20px 0px 0px',
      backgroundColor: 'yellow',
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
        <div style={ device_container }>
          <div style={ color_strip }></div>
          <h2 style={ title }>{ this.props.device.name.name }</h2>
          <hr style={ devider }/>
          <OnOff id={ this.props.device.id } on={ this.props.status.on } reload={ this.props.reload }/>
          <Information id={ this.props.device.id }/>
          <Edit id={ this.props.device.id }/>
        </div>
      </div>
    );
  }
}

export default Radiator
