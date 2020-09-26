import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import getCookieValue from './functions'
import { root } from './constants'

import Welcome from './components/assistant/Welcome'
import User from './components/assistant/User'
import Domain from './components/assistant/Domain'
import Confignginx from './components/assistant/Confignginx'
import Change2domain from './components/assistant/Change2domain'
import Changed2domain from './components/assistant/Changed2domain'
import Ssl from './components/assistant/Ssl'
import Google from './components/assistant/Google'
import Initialize from './components/assistant/Initialize'

import Menu from './components/web/Menu'
import Devices from './components/pages/Devices'
import Editor from './components/pages/Editor'
import Info from './components/pages/Info'
import Tasks from './components/pages/Tasks'
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

  render() {

    if (!this.state.session && !window.location.href.includes('assistant') && !window.location.href.includes('login'))
      return ''
    else if (window.location.href.includes('login'))
      return (
        <div className="Clear_app">
          <Login/>
        </div>
      );
    else if (window.location.href.includes('assistant'))
      return (
        <Router>
          <div className="Clear_app">
            <Route exact={ true } path="/assistant/" component={ Welcome }/>
            <Route exact={ true } path="/assistant/welcome/" component={ Welcome }/>
            <Route exact={ true } path="/assistant/user" component={ User }/>
            <Route exact={ true } path="/assistant/domain" component={ Domain }/>
            <Route exact={ true } path="/assistant/confignginx" component={ Confignginx }/>
            <Route exact={ true } path="/assistant/change2domain" component={ Change2domain }/>
            <Route exact={ true } path="/assistant/changed2domain" component={ Changed2domain }/>
            <Route exact={ true } path="/assistant/ssl" component={ Ssl }/>
            <Route exact={ true } path="/assistant/google" component={ Google }/>
            <Route exact={ true } path="/assistant/initialize" component={ Initialize }/>
          </div>
        </Router>
      );
    else
      return (
        <Router>
          <div className="App">
            <div className="upper-menu">
              Homeware-LAN
            </div>
            <div className="main-app">
              <div className="menu">
                <div>
                  <Menu image="/menu/devices_icon.png" title="Devices" href="/devices"/>
                  <Menu image="/menu/tasks_icon.png" title="Tasks" href="/tasks"/>
                  <Menu image="/menu/settings_icon.png" title="Settings" href="/settings"/>
                  <Menu image="/menu/status_icon.png" title="System" href="/system"/>
                  <Menu image="/menu/backup_icon.png" title="Backup" href="/backup"/>
                  <Menu image="/menu/access_icon.png" title="Access" href="/access"/>
                  <Menu image="/menu/logs_icon.png" title="Logs" href="/logs"/>
                  <hr/>
                  <Menu image="/menu/repo_icon.png" title="Repo" href="/"/>
                  <Menu image="/menu/help_icon.png" title="How to" href="/"/>
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
                <Route exact={ true } path="/tasks" component={ Tasks }/>
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
