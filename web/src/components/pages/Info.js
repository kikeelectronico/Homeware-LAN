import React from 'react';
import ReactJson from 'react-json-view'
import getCookieValue from '../../functions'
import { root, deviceReference } from '../../constants'

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split('/')[3];
    var create = false;
    if (id === "") create = true;
    this.state = {
      id: id,
      create: create,
      device: {
        attributes: {},
        deviceInfo: {},
        id: "",
        name: {
          defaultnames: [],
          nicknames: [],
          name: ""
        },
        traits: [],
        type: ""
      },
      status: {
        online: true
      },
      posible_traits: [],
      save_status: ""
    }
  }

  componentDidMount() {
    if (!this.state.create){
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            this.setState({
               device: data,
               posible_traits: deviceReference.devices[data.type]
             });
          } else {
            console.error(http.statusText);
          }
        }
      }.bind(this);
      http.open("GET", root + "api/devices/get/" + this.state.id + "/");
      http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      http.send();
    }
  }



  render() {

    const container = {
      width: '80%',
      marginLeft: '8%',
      marginTop: '20px',
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '20px',
      paddingRight: '20px',
      borderRadius: '20px'
    }

    const json_viewer = {
      textAlign: 'left',
    }

    return (
      <div>

        <div style={ container }>
          <h2>Device definition</h2>
          <div className="advise">
            <span>General settings of the device.</span>
            <hr/>
          </div>
          <div style={json_viewer}>
            <ReactJson src={this.state.device} />
          </div>
        </div>

        <div style={ container }>
          <h2>Device status</h2>
          <div className="advise">
            <span>Status of the device.</span>
            <hr/>
          </div>
          <div style={json_viewer}>
            <ReactJson src={this.state.status} />
          </div>
        </div>

      </div>
    );
  }
}

export default Editor
