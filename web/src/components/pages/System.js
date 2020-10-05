import React from 'react';
import getCookieValue from '../../functions'
import { root } from '../../constants'
import Component from '../system/Component.js'
const ReactMarkdown = require('react-markdown')


class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
      git: {
        version: '',
        description: '',
        code: 0
      },
      version: '',
      upgrading: false
    }

    this.upgrade = this.upgrade.bind(this);
    this.areYouAwake = this.areYouAwake.bind(this);
  }

  componentDidMount() {
    var comp = new XMLHttpRequest();
    comp.onload = function (e) {
      if (comp.readyState === 4) {
        if (comp.status === 200) {
          var response = JSON.parse(comp.responseText);
          var components = []
          var keys = Object.keys(response);
          for (var i = 0; i < keys.length; i++) {
            components.push(response[keys[i]])
          }

          this.setState({ components: components });
        } else {
          console.error(comp.statusText);
        }
      }
    }.bind(this);
    comp.open("GET", root + "api/system/status/");
    comp.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    comp.send();

    var vers = new XMLHttpRequest();
    vers.onload = function (e) {
      if (vers.readyState === 4) {
        if (vers.status === 200) {
          var version = JSON.parse(vers.responseText);
          this.setState({ version: version.version });
        } else {
          console.error(vers.statusText);
        }
      }
    }.bind(this);
    vers.open("GET", root + "api/global/version/");
    vers.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    vers.send();

    var git = new XMLHttpRequest();
    git.onload = function (e) {
      if (git.readyState === 4) {
        if (git.status === 200) {
          const latestRelease = JSON.parse(git.responseText);
          const description = latestRelease.body
          this.setState({ git: {
            version: latestRelease.tag_name,
            description: description,
            code: 200
            }
          });
        } else if (git.status === 403) {
          this.setState({ git: {
            version: 'GitHub rate limit exceeded. You have reloaded so many times. It will reset after some time.',
            code: 403
            }
          });
        } else {
          console.error(git.statusText);
        }
      }
    }.bind(this);
    git.open("GET", 'https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest');
    git.send();
  }

  upgrade(){
    if(window.confirm('Are you sure?')){
      window.open(root + "files/buckup/homeware/" + getCookieValue('token'))
      this.setState({
        upgrading: true
      });

      var conn = new XMLHttpRequest();
      conn.onload = function (e) {
        if (conn.readyState === 4) {
          if (conn.status === 200) {
            this.areYouAwake();
          } else {
            console.error(conn.statusText);
          }
        }
      }.bind(this)
      conn.open("GET", root + "api/system/upgrade/");
      conn.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
      conn.send();
    }
  }

  areYouAwake(){
    var conn = new XMLHttpRequest();
    conn.onload = function (e) {
      if (conn.readyState === 4) {
        if (conn.status === 200) {
          window.location.href = '/'
        } else {
          console.error(conn.statusText);
          setTimeout(this.areYouAwake,2000);
        }
      }
    }.bind(this)
    conn.open("GET", root + "test/");
    conn.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    conn.send();
  }

  restart(){
    alert('WIP');
  }

  reboot(){
    alert('WIP');
  }

  shutdown(){
    alert('WIP');
  }

  render() {

    const upgrade_button = {
      width: '200px'
    }

    const git_description = {
      marginTop: '20px',
      marginLeft: '10%',
      width: '80%',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '20px',
      paddingBottom: '20px',
      borderRadius: '20px',
      border: '1px solid #aaa'
    }

    const red_text = {
      color: 'red'
    }

    const components = this.state.components.map((component) =>
      <Component title={ component.title } status={ component.status } enable={ component.enable } key={ component.title }/>
    );

    var upgrade = '';
    if(this.state.version !== this.state.git.version && this.state.git.code === 200 && !this.state.upgrading){
      upgrade = <div><b>New version:</b> { this.state.git.version} <div style={ git_description }> <ReactMarkdown source={this.state.git.description} /> <button type="button" style={ upgrade_button } onClick={ this.upgrade }>Upgrade</button></div> </div>
    } else if(this.state.git.code === 403 && !this.state.upgrading){
      upgrade = <div><b>New version:</b> { this.state.git.version}</div>
    } else if (this.state.upgrading) {
      upgrade = <div style={ git_description }><b style={ red_text }>Upgrading</b>. It will take a couple of minutes. You will be redirected to the homepage once finished.</div>
    }


    return (
      <div>
        <div className="page_block_container">
          <h2>System status</h2>
          <hr/>
          <div className="page_block_content_container">
            { components }
          </div>
          <div className="advise">
            <span>These are the core elements of Homeware-LAN. All must be running.</span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Plugins</h2>
          <hr/>
          <div className="page_block_content_container">
            WIP
          </div>
          <div className="advise">
            <span></span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Version</h2>
          <hr/>
          <div className="page_block_content_container">
            <b>System version:</b> { this.state.version }
            { upgrade }
          </div>
          <div className="advise">
            <span>Verify if there is any code update and upgrade the software if an update is available.</span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Power</h2>
          <hr/>
          <div className="page_block_buttons_container">
            <button type="button" onClick={ this.restart }>Restart Homeware</button>
            <button type="button" onClick={ this.reboot }>Reboot System</button>
            <button type="button" onClick={ this.shutdown }>Shutdown System</button>
          </div>
          <div className="advise">
            <span>Control the device and restart the Homeware-LAN installation.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default System
