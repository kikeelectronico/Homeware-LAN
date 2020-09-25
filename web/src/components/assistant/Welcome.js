import React from 'react';

import './Assistant.css';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }


  next() {
    window.location.href = '/assistant/user/';
  }

  render() {

    return (
      <div className="assistant_container">
        <h1>Homeware configuration assistant</h1><br/>
        <p>Follow this assistant in order to configure your Homeware installation.</p>
        <br/>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );


  }
}

export default Welcome
