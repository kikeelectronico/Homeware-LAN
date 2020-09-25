import React from 'react';

class Change2domain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable_next: false,
      enable_message: false,
      message: ''
    }
    this.set = this.set.bind(this);
  }

  set() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      console.log(xmlHttp.responseText)
    }
    var url = 'http://' + window.location.hostname + ':5001/api/settings/domain/' + document.getElementById('domain').value;
    xmlHttp.open( "GET", url, true );
    xmlHttp.send( null );

    window.location.href = 'http://' + document.getElementById('domain').value + '/assistant/changed2domain/';
  }

  render() {

    var message = '';
    if (this.state.enable_message){
      message = <div className="alert_message"> { this.state.message } </div>
    }

    return (
      <div className="assistant_container">
      <h1>Homeware configuration assistant - Change to domain</h1><br/>
      <p>Open your router config web page, look for <i>Port Forwarding</i> and create the following rules.</p>
        { message }
        <div className="assistant_text">
        <ul>
          <li>80 port:
            <ul>
              <li>Protocol: TCP</li>
              <li>WAN start port: 80</li>
              <li>WAN end port: 80</li>
              <li>LAN start port: 80</li>
              <li>LAN end port: 80</li>
              <li>LAN host IP: The Raspberry Pi IP</li>
            </ul>
          </li>
          <li>443 port:
            <ul>
              <li>Protocol: TCP</li>
              <li>WAN start port: 443</li>
              <li>WAN end port: 443</li>
              <li>LAN start port: 443</li>
              <li>LAN end port: 443</li>
              <li>LAN host IP: The Raspberry Pi IP</li>
            </ul>
          </li>
        </ul>
        <p>Now we must change to your domain.</p>
        <input type="text" id="domain" placeholder="Your domain"/>
        <button type="button" onClick={this.set}>Next</button>
        </div>
      </div>
    );


  }
}

export default Change2domain
