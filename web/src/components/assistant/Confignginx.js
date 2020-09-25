import React from 'react';

class Confignginx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable_next: false,
      enable_message: false,
      message: ''
    }
    this.set = this.set.bind(this);
    this.next = this.next.bind(this);
  }

  set() {

  }

  next() {
    window.location.href = '/assistant/change2domain/';
  }

  render() {

    var message = '';
    if (this.state.enable_message){
      message = <div className="alert_message"> { this.state.message } </div>
    }

    return (
      <div className="assistant_container">
        <h1>Homeware configuration assistant - Configuration of Nginx</h1>
        <p>Configure Nginx with the initial settings</p>
        { message }
        <br/>
        <div className="assistant_text">
          <p>Open a terminal on your Raspberry Pi or connect to the Raspberry Pi using SSH and run:</p>
          <br/>
          <span className="code">$ cd /usr/share/Homeware-LAN/bash</span><br/><br/><br/>
          <span className="code">$ sudo sh confignginx.sh your.domain.com</span>
        </div>
        <br/>
        <br/>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );


  }
}

export default Confignginx
