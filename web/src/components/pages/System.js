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
      upgrading: false,
      show_system_message: false,
      system_message: ''
    }

    this.loadComponents = this.loadComponents.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.areYouAwake = this.areYouAwake.bind(this);
    this.restart = this.restart.bind(this);
    this.reboot = this.reboot.bind(this);
    this.shutdown = this.shutdown.bind(this);
  }

  componentDidMount() {

    this.loadComponents();
    setInterval(this.loadComponents,3000)

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

  loadComponents() {
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
  }

  upgrade(){
    if(window.confirm('Are you sure?')){
      window.open(root + "files/buckup/homeware/" + getCookieValue('token'))
      this.setState({
        show_system_message: true,
        system_message: 'Upgrading the system. It will take a couple of minutes and then you will be redirected to the home page.'
      });
      window.setTimeout(function() {
        var upg = new XMLHttpRequest();
        upg.onload = function (e) {
          if (upg.readyState === 4) {
            if (upg.status === 200) {
              setInterval(this.areYouAwake,2000);
            } else {
              console.error(upg.statusText);
            }
          }
        }.bind(this)
        upg.open("GET", root + "api/system/upgrade/");
        upg.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
        upg.send();
      }.bind(this),2000);
    }
  }

  areYouAwake(){
    var awa = new XMLHttpRequest();
    awa.onload = function (e) {
      if (awa.readyState === 4) {
        if (awa.status === 200) {
          window.location.href = '/'
        } else {
          console.error(awa.statusText);
        }
      }
    }.bind(this)
    awa.open("GET", root + "test/");
    awa.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    awa.send();
  }

  restart(){
    this.setState({
      show_system_message: true,
      system_message: 'Restarting Homeware. It will take a couple of minutes and then you will be redirected to the home page.'
    });
    var res = new XMLHttpRequest();
    res.onload = function (e) {
      if (res.readyState === 4) {
        setInterval(this.areYouAwake,2000);
      }
    }.bind(this)
    res.open("GET", root + "api/system/restart");
    res.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    res.send();
  }

  reboot(){
    this.setState({
      show_system_message: true,
      system_message: 'Rebooting the system. It will take a couple of minutes and then you will be redirected to the home page.'
    });
    var reb = new XMLHttpRequest();
    reb.onload = function (e) {
      if (reb.readyState === 4) {
        setInterval(this.areYouAwake,2000);
      }
    }.bind(this)
    reb.open("GET", root + "api/system/reboot");
    reb.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    reb.send();
  }

  shutdown(){
    this.setState({
      show_system_message: true,
      system_message: 'The system will be shut down, you will lose the connection with Homeware.'
    });
    var shu = new XMLHttpRequest();
    shu.open("GET", root + "api/system/shutdown");
    shu.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    shu.send();
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
      border: '1px solid #aaa',
      textAlign: 'left'
    }

    const red_text = {
      color: 'red'
    }

    const components = this.state.components.map((component) =>
      <Component title={ component.title } status={ component.status } enable={ component.enable } key={ component.title }/>
    );

    return (
      <div>
        {
          this.state.show_system_message
          ?
            <div className="page_block_container">
              <h2>System message</h2>
              <hr/>
              <div className="page_block_content_container">
                { this.state.system_message }
              </div>
            </div>
          :
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
              <h2>Version</h2>
              <hr/>
              <div className="page_block_content_container">
                <b>System version:</b> { this.state.version }
                {
                  this.state.version !== this.state.git.version
                  ?
                  <div>
                    <b>New version:</b> { this.state.git.version}
                    <div style={ git_description }>
                      <ReactMarkdown source={this.state.git.description} />
                      <button type="button" style={ upgrade_button } onClick={ this.upgrade }>Upgrade</button>
                    </div>
                  </div>
                  :
                  ' - The system is up to date.'
                }

              </div>
              <div className="advise">
                <span>Verify if there is any code update and upgrade if necessary.</span>
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
        }

      </div>
    );
  }
}

export default System
