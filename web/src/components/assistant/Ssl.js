import React from 'react';

import './Assistant.css';

class Ssl extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }


  next() {
    window.location.href = '/assistant/google/';
  }

  render() {

    return (
      <div className="assistant_container">
        <h1>Homeware configuration assistant - SSL certificate</h1>
        <p>Google needs to comunicate with the Raspberry Pi via HTTPS, so we need a SSL certicate for Homeware.</p>
        <br/>
        <div className="assistant_text">
        <p>Open a terminal on your Raspberry Pi or connect to the Raspberry Pi using SSH and run:</p>
        <br/>
        <span className="code">$ sudo certbot --nginx</span><br/><br/>
        <p>Follow the Certbot instructions. When Certbot ask you about redirecting http to https, enable it.</p>
        </div>
        <br/>
        <br/>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );


  }
}

export default Ssl
