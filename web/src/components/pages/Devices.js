import React from 'react';
import Light from '../devices/Light'
import Outlet from '../devices/Outlet'
import AcUnit from '../devices/AcUnit'
import getCookieValue from '../../functions'
import { root } from '../../constants'

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      devices: []
    }
    this.loadData = this.loadData.bind(this);
    this.newDevice = this.newDevice.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(){
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          console.log(data)
          this.setState({
             data: data,
             devices: data.devices
           });
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this);
    http.open("GET", root + "api/global/get/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

  newDevice(){
    window.location.href = '/devices/editor/'
  }

  render() {

    const title = {
      width: '80%',
      marginLeft: '8%',
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '10px',
      paddingRight: '20px',
      borderRadius: '20px'
    }

    const container = {
      width: '80%',
      marginLeft: '8%',
      marginTop: '10px',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '10px',
      paddingRight: '20px',
      display: 'grid',
      gridTemplateColumns: '33% 33% 33%'
    }

    const devices = this.state.devices.map((device) => {
      if(device.type === 'action.devices.types.LIGHT')
        return <Light key={device.id} device={device} status={ this.state.data.status[device.id] } reload={ this.loadData }/>
      else if(device.type === 'action.devices.types.OUTLET')
        return <Outlet key={device.id} device={device} status={ this.state.data.status[device.id] } reload={ this.loadData }/>
      else if(device.type === 'action.devices.types.AC_UNIT')
        return <AcUnit key={device.id} device={device} status={ this.state.data.status[device.id] } reload={ this.loadData }/>

    });

    return (
      <div>
        <div style={ title }>
          <h2>Devices</h2>
        </div>

        <div style={ container }>
          <button type="button" onClick={ this.newDevice }>New</button>
        </div>

        <div style={ container }>
          { devices }
        </div>
      </div>
    );
  }
}

export default Devices
