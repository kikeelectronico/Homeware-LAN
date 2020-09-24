import React from 'react';
import downloadjs from 'downloadjs';
import getCookieValue from '../../functions'
import { root } from '../../constants'

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0
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
          this.setState({ data: data });
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
    if (this.state.page > 0)
      this.setState({ page: this.state.page - 1 });
  }

  nextPage() {
    if (this.state.page < this.state.data.length/10-1)
      this.setState({ page: this.state.page + 1 });
  }

  downloadLog() {
    window.location = root + "files/log/homeware/" + getCookieValue('token')
  }

  render() {

    const container = {
      width: '80%',
      marginLeft: '8%',
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '20px',
      paddingRight: '20px',
      borderRadius: '20px'
    }

    const line = {
      width: '80%',
      marginLeft: '8%',
      marginTop: '10px',
      borderBottom: '1px solid #eee',
      paddingLeft: '20px',
      paddingBottom: '10px',
      paddingRight: '20px',
      textAlign: 'left'
    }

    const yellow = {
      color: 'orange'
    }

    const red = {
      color: 'red'
    }

    const button_container = {
      width: '100%',
      marginTop: '10px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 200px)',
      gridGap: '20px'
    }

    const sus = this.state.page === 0 ? 0 : 1
    const homeware_lan_log_data = this.state.data.reverse().slice(this.state.page * 10, this.state.page * 10 + 10 - sus);
    const homeware_lan_log = homeware_lan_log_data.map((register) =>
      <div style={ line } key={ register.time }>
        { register.severity === 'Log' ? <b>{ register.severity }</b> : '' }
        { register.severity === 'Warning' ? <b style={ yellow }>{ register.severity }</b> : '' }
        { register.severity === 'Alert' ? <b style={ red }>{ register.severity }</b> : '' }
         - { register.time }<br/>
        { register.message }
      </div>
    );

    return (
      <div>
        <div style={ container }>
          <h2>Homeware-LAN log</h2>
          <hr/>
          <div>
            { homeware_lan_log }
          </div>
          <div style={ button_container }>
            <button type="button" onClick={ this.previousPage }>Previous page</button>
            <button type="button" onClick={ this.nextPage }>Next page</button>
            <button type="button" onClick={ this.downloadLog }>Download</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Logs
