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
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      console.log(http.status)
      if (http.status === 200) {
        var data = JSON.parse(http.responseText);
        console.log(data);
        if (data.code === 200 )
          window.location.href = 'http://' + document.getElementById('domain').value + '/assistant/changed2domain/';
        else
          this.setState({
            enable_message: true,
            message: data.error
          });
      } else {
        console.error(http.statusText);
        this.setState({
          enable_message: true,
          message: 'Some error has occurred'
        });
      }
    }.bind(this);
    var url = 'http://' + window.location.hostname + ':5001/api/settings/domain/' + document.getElementById('domain').value;
    http.open( "GET", url, true );
    http.send( null );
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
