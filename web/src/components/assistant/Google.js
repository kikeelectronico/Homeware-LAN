import React from 'react';

import './Assistant.css';

class Google extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }


  next() {
    window.location.href = '/assistant/initialize/';
  }

  render() {

    return (
      <div className="assistant_container">
      <h1>Homeware configuration assistant - Google</h1>
      <p>Google needs to know where Homeware is.</p>
        <br/>
        <div className="assistant_text">
          <p>Follow the instructions on this wiki <a href="https://github.com/kikeelectronico/Homeware-LAN/wiki/Connect-Homeware-LAN-with-Google" target="blanck">https://github.com/kikeelectronico/Homeware-LAN/wiki/Connect-Homeware-LAN-with-Google</a>.</p>
          <p>During the process you will use the following Client Information. You will be able to change it from the <i>Settings</i> page in the future.</p>
          <span id="actionOnGoogleData">
            <b>Client ID:</b> 123<br/>
            <b>Client Secret:</b> 456<br/>
            <b>Authorization URL:</b> https://&lt;your.domain.com&gt;/auth/<br/>
            <b>Token URL:</b> https://&lt;your.domain.com&gt;/token/<br/>
            <b>Fulfillment URL:</b> https://&lt;your.domain.com&gt;/smarthome/<br/>
          </span>
        </div>
        <br/>
        <br/>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );


  }
}

export default Google
