import React from 'react';

import './Assistant.css';

class Changed2domain extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }


  next() {
    window.location.href = '/assistant/ssl/';
  }

  render() {

    return (
      <div className="assistant_container">
      <h1>Homeware configuration assistant - Change to domain</h1>
      <p>Congrats, now you are accessing your Homeware from the Internet. See the URL in the top bar :-) </p>
        <br/>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );


  }
}

export default Changed2domain
