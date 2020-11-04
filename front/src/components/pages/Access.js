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
    http.open("GET", root + "api/access/create/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

  render() {

    return (
      <div>
        <div className="page_block_container">
          <h2>API key</h2>
          <hr/>
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">
                API Key
              </div>
              <div className="two_table_cel">
                <input type="text" className="two_input" id="apikey" value={ this.state.data.apikey } disabled/>
              </div>
            </div>
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={ this.generateAPIKey }>Generate</button>

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
