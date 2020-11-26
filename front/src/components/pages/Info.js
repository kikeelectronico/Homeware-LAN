import React from 'react';
import ReactJson from 'react-json-view'
import getCookieValue from '../../functions'
import { root } from '../../constants'

import './Info.css'

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split('/')[3];
    this.state = {
      id: id,
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
      }
    }
  }

  componentDidMount() {
    var dev = new XMLHttpRequest();
    dev.onload = function (e) {
      if (dev.readyState === 4) {
        if (dev.status === 200) {
          var data = JSON.parse(dev.responseText);
          this.setState({
             device: data
           });
        } else {
          console.error(dev.statusText);
        }
      }
    }.bind(this);
    dev.open("GET", root + "api/devices/get/" + this.state.id + "/");
    dev.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    dev.send();

    var sta = new XMLHttpRequest();
    sta.onload = function (e) {
      if (sta.readyState === 4) {
        if (sta.status === 200) {
          var data = JSON.parse(sta.responseText);
          this.setState({
             status: data
           });
        } else {
          console.error(sta.statusText);
        }
      }
    }.bind(this);
    sta.open("GET", root + "api/status/get/" + this.state.id + "/");
    sta.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    sta.send();
  }

  render() {
    return (
      <div>
        <div className="page_block_container">
          <h2>Device definition</h2>
          <div className="advise">
            <span>General settings of the device.</span>
            <hr/>
          </div>
          <div className="json_viewer">
            <ReactJson src={this.state.device} />
          </div>
        </div>
        <div className="page_block_container">
          <h2>Device status</h2>
          <div className="advise">
            <span>Status of the device.</span>
            <hr/>
          </div>
          <div className="json_viewer">
            <ReactJson src={this.state.status} />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor
