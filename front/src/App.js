import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import getCookieValue from './functions'
import { root } from './constants'

import Menu from './components/web/Menu'
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: false,
      version: ''
    }
    this.logout = this.logout.bind(this);
    this.menu = this.menu.bind(this);
  }

  componentDidMount() {
    if (!window.location.href.includes('assistant')) {
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
    }
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
              <div className="uppper_menu_title">
                <h1>Homeware-LAN</h1>
              </div>
            </div>
            <div className="main-app">
              <div className="menu" id="menu">
                <div>
                  <Menu image="/menu/devices_icon.png" title="Devices" href="/devices"/>
                  <Menu image="/menu/tasks_icon.png" title="Tasks" href="/tasks"/>
                  <Menu image="/menu/settings_icon.png" title="Settings" href="/settings"/>
                  <Menu image="/menu/status_icon.png" title="System" href="/system"/>
                  <Menu image="/menu/backup_icon.png" title="Backup" href="/backup"/>
                  <Menu image="/menu/access_icon.png" title="Access" href="/access"/>
                  <Menu image="/menu/logs_icon.png" title="Logs" href="/logs"/>
                  <hr/>
                  <Menu image="/menu/repo_icon.png" title="Repo" href="https://github.com/kikeelectronico/Homeware-LAN"/>
                  <Menu image="/menu/help_icon.png" title="How to" href="https://github.com/kikeelectronico/Homeware-LAN/wiki"/>
                  <hr/>
                  <Menu image="/menu/logout_icon.png" title="Logout" exec={ this.logout }/>
                </div>
                <div className="menu-data">
                  <p>Version: { this.state.version }</p>
                </div>
              </div>
              <div className="page">
                <Route exact={ true } path="/" component={ Devices }/>
                <Route exact={ true } path="/devices" component={ Devices }/>
                <Route path="/devices/editor" component={ Editor }/>
                <Route path="/devices/info" component={ Info }/>
                <Route path="/devices/connecting" component={ Connecting }/>
                <Route exact={ true } path="/tasks" component={ Tasks }/>
                <Route path="/tasks/manager" component={ Manager }/>
                <Route path="/settings" component={ Settings }/>
                <Route path="/system" component={ System }/>
                <Route path="/backup" component={ Backup }/>
                <Route path="/access" component={ Access }/>
                <Route path="/logs" component={ Logs }/>
              </div>
            </div>
          </div>
        </Router>
      );
  }
}

export default App;
