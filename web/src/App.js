import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Menu from './components/web/Menu'
import Devices from './components/pages/Devices'
import Editor from './components/pages/Editor'
import Settings from './components/pages/Settings'
import System from './components/pages/System'
import Backup from './components/pages/Backup'
import Access from './components/pages/Access'
import Logs from './components/pages/Logs'

function App() {
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
            </div>
            <div className="menu-data">
              <p>Version: v1.0</p>
            </div>
          </div>
          <div className="page">
            <Route exact={ true } path="/" render={() => (<h1>Home</h1>)}/>
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

export default App;
