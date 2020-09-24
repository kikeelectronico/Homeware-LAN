import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import getCookieValue from './functions'
import { root } from './constants'

import Menu from './components/web/Menu'
import Devices from './components/pages/Devices'
import Editor from './components/pages/Editor'
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

  logout() {
    document.cookie = "user=; path=/";
    document.cookie = "token=; path=/";
    this.setState({
      session: false
    });
    window.location.href = '/'
  }

  render() {

    if (!this.state.session && !window.location.href.includes('login'))
      return ''
    else if (window.location.href.includes('login'))
      return (
        <div className="Login_app">
          <Login/>
        </div>
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
                  <Menu image="/devices_icon.png" title="Devices" href="/devices"/>
                  <Menu image="/tasks_icon.png" title="Tasks" href="/tasks"/>
                  <Menu image="/settings_icon.png" title="Settings" href="/settings"/>
                  <Menu image="/status_icon.png" title="System" href="/system"/>
                  <Menu image="/backup_icon.png" title="Backup" href="/backup"/>
                  <Menu image="/access_icon.png" title="Access" href="/access"/>
                  <Menu image="/logs_icon.png" title="Logs" href="/logs"/>
                  <hr/>
                  <Menu image="/repo_icon.png" title="Repo" href="/"/>
                  <Menu image="/help_icon.png" title="How to" href="/"/>
                  <hr/>
                  <Menu image="/logout_icon.png" title="Logout" exec={ this.logout }/>
                </div>
                <div className="menu-data">
                  <p>Version: { this.state.version }</p>
                </div>
              </div>
              <div className="page">
                <Route exact={ true } path="/" component={ Devices }/>
                <Route path="/devices/editor" component={ Editor }/>
                <Route exact={ true } path="/devices" component={ Devices }/>
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
