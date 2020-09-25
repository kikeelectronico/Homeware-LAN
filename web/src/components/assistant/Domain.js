import React from 'react';

class Domain extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }


  next() {
    window.location.href = '/assistant/confignginx/';
  }

  render() {

    return (
      <div className="assistant_container">
        <h1>Homeware configuration assistant - Domain</h1>
        <p>You must get a domain and point it to your WAN IP.</p>
        <div className="assistant_text">

          <p>There are two possibilities:</p>
            <ul>
              <li>Use a static IP and a DNS</li>
              <li>Use a dinamic IP and a DDNS</li>
            </ul>
          <p>If you have a static WAN IP, you probably know how to configure your domain name</p>
          <p>If you have a dinamic IP, you should use a DDNS provider</p>
          <p>The process depend on the provider you choose. For example, you can use <a href='https://my.noip.com' target='blanck'>no-ip</a> as the provider:</p>
          <ul>
            <li>Create an account in no-ip.</li>
            <li>Go to <i>Dynamic DNS</i> and create a new <i>Hostname</i>.
                <ul>
                  <li>Choose a unique <i>Hostname</i>.</li>
                  <li>Select <i>DNS Host (A)</i>.</li>
                  <li>Fill the <i>IPv4 Address</i> with your WAN/public IP. You can get it from <a href='https://www.whatismyip.com/what-is-my-public-ip-address/' target='blanck'>WhatsMyIp</a>.</li>
                </ul>
            </li>
            <li>When the installation will be completed you must configure the DDNS data from the <i>Settings</i> section on Homeware.</li>
          </ul>
        </div>
        <button type="button" onClick={this.next}>Next</button>

      </div>
    );


  }
}

export default Domain
