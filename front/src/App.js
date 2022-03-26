import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import getCookieValue from './functions'
import { root } from './constants'

import MenuElement from './components/web/MenuElement'
import Modal from './components/web/Modal'
import Devices from './components/pages/Devices'
import Editor from './components/pages/Editor'
import Info from './components/pages/Info'
import Connecting from './components/pages/Connecting'
import Tasks from './components/pages/Tasks'
import Manager from './components/pages/Manager'
import Settings from './components/pages/Settings'
import System from './components/pages/System'
import Backup from './components/pages/Backup'
import Access from './components/pages/Access'
import Logs from './components/pages/Logs'
import Login from './components/pages/Login'

const GIT_CHECKOUT_INTERVAL = 600;
const LOG_CHECKOUT_INTERVAL = 5

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false,
      alert: "clear",
      version: "",
      git: {
        version: "",
        description: "",
        code: 0
      }
    }
    this.checkoutVersion = this.checkoutVersion.bind(this);
    this.checkoutLog = this.checkoutLog.bind(this);
    this.logout = this.logout.bind(this);
    this.menu = this.menu.bind(this);
  }

  componentDidMount() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          if (data.status !== 'in' && !window.location.href.includes('login'))
            window.location.href = '/login/'
          else if (data.status === 'in')
            this.setState({
              session: true
            });
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this);
    http.open("GET", root + "api/user/validateToken/");
    http.setRequestHeader('token', getCookieValue('token'))
    http.setRequestHeader('user', getCookieValue('user'))
    http.send();

    this.checkoutVersion();
    window.setInterval(this.checkoutVersion,GIT_CHECKOUT_INTERVAL*1000)
    this.checkoutLog();
    window.setInterval(this.checkoutLog,LOG_CHECKOUT_INTERVAL*1000)
  }

  checkoutVersion() {

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
          this.setState({ git: {
            version: latestRelease.tag_name,
            description: latestRelease.body,
            code: 200
            }
          });
        } else if (git.status === 403) {
        this.setState({
          git: {
            code: "",
            description: "",
            version: 403
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

  checkoutLog() {
    var vers = new XMLHttpRequest();
    vers.onload = function (e) {
      if (vers.readyState === 4) {
        if (vers.status === 200) {
          const alert = JSON.parse(vers.responseText)
          this.setState({
            "alert": alert.alert
          });
        } else {
          console.error(vers.statusText);
        }
      }
    }.bind(this);
    vers.open("GET", root + "api/log/alert/");
    vers.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    vers.send();
  }

  logout() {
    document.cookie = "user=; path=/";
    document.cookie = "token=; path=/";
    this.setState({
      session: false
    });
    window.location.href = '/'
  }

  menu() {
    document.getElementById('menuIcon').classList.toggle("change_menu_icon");
    document.getElementById('menu').classList.toggle("menu_show_up");
  }

  render() {

    if (!this.state.session && !window.location.href.includes('login'))
      return ''
    else if (window.location.href.includes('login'))
      return (
        <div className="Clear_app">
          <Login/>
        </div>
      );
    else
      return (
        <Router>
          <div className="App">
            <div className="upper-menu">
              <div className="menu_icon_container" id="menuIcon" onClick={this.menu}>
                <div className="menu_icon_bar_1"></div>
                <div className="menu_icon_bar_2"></div>
                <div className="menu_icon_bar_3"></div>
              </div>
              <div className="uppper_menu_title_container">
                <h1 className="uppper_menu_title">Homeware-LAN</h1>
                <div className="uppper_menua_alert">
                  {
                    this.state.alert === "set"
                    ?
                      <Modal trigger={<img src="/global/alert_icon.png" alt="bell" className="alert_icon"/>} title="Alert" content={<p>See the <a href="/logs">system log</a></p>} />
                    :
                    ""
                  }
                </div>
              </div>
            </div>
            <div className="main-app">
              <div className="menu" id="menu">
                <div>
                  <MenuElement image="/menu/devices_icon.png" title="Devices" href="/devices"/>
                  <MenuElement image="/menu/tasks_icon.png" title="Tasks" href="/tasks"/>
                  <MenuElement image="/menu/settings_icon.png" title="Settings" href="/settings"/>
                  <MenuElement image="/menu/status_icon.png" title="System" href="/system"/>
                  <MenuElement image="/menu/backup_icon.png" title="Backup" href="/backup"/>
                  <MenuElement image="/menu/access_icon.png" title="Access" href="/access"/>
                  <MenuElement image="/menu/logs_icon.png" title="Logs" href="/logs"/>
                  <hr/>
                  <MenuElement image="/menu/repo_icon.png" title="Repo" exec={ ()=>{window.location.href = "https://github.com/kikeelectronico/Homeware-LAN"} }/>
                  <MenuElement image="/menu/help_icon.png" title="How to" exec={ ()=>{window.location.href = "https://kikeelectronico.github.io/Homeware-LAN/"} }/>
                  <hr/>
                  <MenuElement image="/menu/logout_icon.png" title="Logout" exec={ this.logout }/>
                </div>
                <div className="menu_data">
                  {
                    this.state.git.version !== this.state.version && this.state.git.version !== ''
                    ?
                    <Link to="/system" className="text_decoration_none">
                      <div className="menu_data_alert">New update available</div>
                    </Link>
                    :
                    ""
                  }
                  <p className="menu_data_version">Version: { this.state.version }</p>
                </div>
              </div>
              <div className="page">
                <Route exact={ true } path="/"> <Devices/> </Route>
                <Route exact={ true } path="/devices"> <Devices/> </Route>
                <Route path="/devices/editor"> <Editor/> </Route>
                <Route path="/devices/info"> <Info/> </Route>
                <Route path="/devices/connecting"> <Connecting/> </Route>
                <Route exact={ true } path="/tasks"> <Tasks/> </Route>
                <Route path="/tasks/manager"> <Manager/> </Route>
                <Route path="/settings"> <Settings/> </Route>
                <Route path="/system"> <System git={this.state.git} version={this.state.version}/> </Route>
                <Route path="/backup"> <Backup/> </Route>
                <Route path="/access"> <Access/> </Route>
                <Route path="/logs"> <Logs/> </Route>
              </div>
            </div>
          </div>
        </Router>
      );
  }
}

export default App;
