import React, {useState, useEffect} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from "react-router-dom";
import getCookieValue from './functions'
import { root } from './constants'

import MenuElement from './components/web/MenuElement'
import Modal from './components/web/Modal'
import Devices from "./pages/devices/Devices";
import Editor from './components/pages/Editor'
import Info from './components/pages/Info'
import Connecting from './components/pages/Connecting'
import Settings from './components/pages/Settings'
import System from './components/pages/System'
import Backup from './components/pages/Backup'
import Access from './components/pages/Access'
import Logs from './components/pages/Logs'
import Login from './components/pages/Login'

const GIT_CHECKOUT_INTERVAL = 600;
const LOG_CHECKOUT_INTERVAL = 5
const SESION_CHECKOUT_INTERVAL = 5;

function App() {

  const [session, setSession] = useState(false)
  const [alert, setAlert] = useState("clear")
  const [version, setVersion] = useState("")
  const [git, setGit] = useState({
                                  version: "",
                                  description: "",
                                  code: 0
                                })

  useEffect(() => {
    validateSession();
    const validate_sesion_interval = setInterval(validateSession,SESION_CHECKOUT_INTERVAL*1000)
    checkoutVersion();
    const checkout_version_interval = setInterval(checkoutVersion,GIT_CHECKOUT_INTERVAL*1000)
    checkoutLog();
    const checkout_log_interval = setInterval(checkoutLog,LOG_CHECKOUT_INTERVAL*1000)

    return () => {
      clearInterval(validate_sesion_interval)
      clearInterval(checkout_version_interval)
      clearInterval(checkout_log_interval)
    }
  }, [session])

  const checkoutVersion = () => {
    if (session) {
     fetch(root + "api/system/version", {
        method: "GET",
        headers: {
          'authorization': 'bearer ' + getCookieValue('token')
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(version => {
        setVersion(version.version);
      })
      .catch(error => {
        console.error("Error fetching system version:", error);
      });

      fetch('https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest', {
        method: "GET"
      })
      .then(response => {
        if (response.status === 403) {
          setGit({
            code: 403,
            version: "",
            description: ""
          });
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(latestRelease => {
        if (latestRelease) {
          setGit({
            version: latestRelease.tag_name,
            description: latestRelease.body,
            code: 200
          });
        }
      })
      .catch(error => {
        console.error("Error fetching latest GitHub release:", error);
      });
    }
  }

  const checkoutLog = () => {
    if (session) {
      fetch(root + "api/alerts", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + getCookieValue('token'),
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setAlert(data.alert);
      })
      .catch(error => {
        console.error("Unable to catch alerts:", error);
      });
    }
  }

  const validateSession = () => {
    if (getCookieValue('token') !== "") {
      fetch(root + "api/user/validateToken", {
        method: "GET",
        headers: {
          'token': getCookieValue('token')
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.valid && window.location.pathname !== '/login') {
          logout();
        } else if (data.valid) {
          setSession(true);
        }
      })
      .catch(error => {
        console.error("Error al validar token:", error);
      });
    } else {
      if (window.location.pathname !== '/login' && window.location.pathname !== '/login/google')
        window.location.href = '/login'
    }
  }

  const logout = () => {
    document.cookie = "token=; path=/";
    setSession(false)
    window.location.href = '/login'
  }

  const menu = () => {
    document.getElementById('menuIcon').classList.toggle("change_menu_icon");
    document.getElementById('menu').classList.toggle("menu_show_up");
  }
 

  if (!session && !window.location.href.includes('login'))
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
            <div className="menu_icon_container" id="menuIcon" onClick={menu}>
              <div className="menu_icon_bar_1"></div>
              <div className="menu_icon_bar_2"></div>
              <div className="menu_icon_bar_3"></div>
            </div>
            <div className="uppper_menu_title_container">
              <h1 className="uppper_menu_title">Homeware-LAN</h1>
              <div className="uppper_menua_alert">
                {
                  alert === "set"
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
                <MenuElement image="/menu/settings_icon.png" title="Settings" href="/settings"/>
                <MenuElement image="/menu/status_icon.png" title="System" href="/system"/>
                <MenuElement image="/menu/backup_icon.png" title="Backup" href="/backup"/>
                <MenuElement image="/menu/access_icon.png" title="Access" href="/access"/>
                <MenuElement image="/menu/logs_icon.png" title="Logs" href="/logs"/>
                <hr/>
                <MenuElement image="/menu/repo_icon.png" title="Repo" exec={ ()=>{window.location.href = "https://github.com/kikeelectronico/Homeware-LAN"} }/>
                <MenuElement image="/menu/help_icon.png" title="How to" exec={ ()=>{window.location.href = "https://homeware.enriquegomez.me/"} }/>
                <hr/>
                <MenuElement image="/menu/logout_icon.png" title="Logout" exec={ logout }/>
              </div>
              <div className="menu_data">
                {
                  git.version !== version && git.version !== ''
                  ?
                  <Link to="/system" className="text_decoration_none">
                    <div className="menu_data_alert">New update available</div>
                  </Link>
                  :
                  ""
                }
                <p className="menu_data_version">Version: { version }</p>
              </div>
            </div>
            <div className="page">
              <Routes>
                <Route exact={ true } path="/" element={<Devices/>}> </Route>
                <Route exact={ true } path="/devices" element={<Devices/>}> </Route>
                <Route path="/devices/editor/" element={<Editor/>}> </Route>
                <Route path="/devices/editor/:deviceId" element={<Editor/>}> </Route>
                <Route path="/devices/info/:deviceId" element={<Info/>}> </Route> 
                <Route path="/devices/connecting/:deviceId" element={<Connecting/>}> </Route>
                <Route path="/settings" element={<Settings/>}> </Route>
                <Route path="/system" element={<System git={git} version={version}/>}>  </Route>
                <Route path="/backup" element={<Backup/>}> </Route>
                <Route path="/access" element={<Access/>}> </Route>
                <Route path="/logs" element={<Logs/>}> </Route>
                <Route path="/login/google" element={<Login/>}> </Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  
}

export default App;
