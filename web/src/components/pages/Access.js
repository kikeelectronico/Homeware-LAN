import React from 'react';
import getCookieValue from '../../functions'
import { root } from '../../constants'

class Access extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        apikey: ''
      }
    }
  }

  componentDidMount() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          this.setState({ data: data });
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this);
    http.open("GET", root + "api/access/get/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

  generateAPIKey(){
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          // var data = JSON.parse(http.responseText);
          window.location.href = "/access"
        } else {
          console.error(http.statusText);
        }
      }
    };
    http.open("GET", root + "api/settings/apikey/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

  render() {

    const container = {
      width: '80%',
      marginLeft: '8%',
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '20px',
      paddingRight: '20px',
      borderRadius: '20px'
    }

    const form_container = {
      width: '80%',
      marginLeft: '10%',
      marginTop: '20px',
    }

    const form_colum = {
      width: '80%',
      marginLeft: '10%',
      marginTop: '20px'
    }

    const input = {
      width: '100%'
    }

    return (
      <div>
        <div style={ container }>
          <h2>API key</h2>
          <hr/>
          <div style={form_container}>
            <div style={form_colum}>
              <input type="text" id="apikey" style={input} value={ this.state.data.apikey } disabled/>
            </div>
            <div style={form_colum}>
              <button type="button" onClick={ this.generateAPIKey }>Generate</button>
            </div>
          </div>
          <div className="advise">
            <span>The API Key gives you access to the Homeware's API. Please do not generate an API Key if you are not sure of what you are doing.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Access
