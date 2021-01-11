import React from 'react';
import getCookieValue from '../../functions'
import { root } from '../../constants'

import './Logs.css'

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.downloadLog = this.downloadLog.bind(this);
  }

  componentDidMount() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          this.setState({ data: data.reverse() });
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this);
    http.open("GET", root + "api/log/get/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

  previousPage() {
    if (this.state.page > 1)
      this.setState({ page: this.state.page - 1 });
  }

  nextPage() {
    if (this.state.page < this.state.data.length/10-1)
      this.setState({ page: this.state.page + 1 });
  }

  downloadLog() {
    window.location = root + "files/download/log/" + getCookieValue('token')
  }

  render() {

    const homeware_lan_log_data = this.state.data.slice(0, this.state.page * 10);
    const homeware_lan_log = homeware_lan_log_data.map((register, i) =>
      <div className="logs_line" key={ i }>
        { register.severity === 'Log' ? <b>{ register.severity }</b> : '' }
        { register.severity === 'Warning' ? <b className="logs_yellow">{ register.severity }</b> : '' }
        { register.severity === 'Alert' ? <b className="logs_red">{ register.severity }</b> : '' }
         - { register.time }<br/>
        { register.message }
      </div>
    );

    return (
      <div>
        <div className="page_block_container">
          <h2>Homeware-LAN log</h2>
          <hr/>
          <div>
            { homeware_lan_log }
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={ this.nextPage }>Load more</button>
            <button type="button" onClick={ this.downloadLog }>Download</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Logs
