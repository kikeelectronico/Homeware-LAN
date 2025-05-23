import React, {useState, useEffect} from "react";
import ReactJsonView from '@microlink/react-json-view'

import Toast from "../web/Toast";
import getCookieValue from '../../functions'
import { root, deviceReference } from '../../constants'

import './Connecting.css';

function Connecting() {

  const [id, setId] = useState(null)
  const [params, setParams] = useState([])
  const [commands, setCommands] = useState([])
  const [alert, setAlert] = useState(null)
  
  useEffect(() => {
    setId(window.location.pathname.split('/')[3])
  }, [])

  useEffect(() => {
    if (id) {
      var dev = new XMLHttpRequest();
      dev.onload = function (e) {
        if (dev.readyState === 4) {
          if (dev.status === 200) {
            const data = JSON.parse(dev.responseText);
            var _params = []
            var _commands = []
            data.description.traits.forEach((trait) => {
              _params = _params.concat(deviceReference.traits[trait].params);
              _commands = _commands.concat(deviceReference.traits[trait].commands);
            });
            setParams(_params)
            setCommands(_commands)
          } else {
            console.error(dev.statusText)
            setAlert({severity: "error", text: "Unable to load the data."})
          }
        }
      }
      dev.open("GET", root + "api/devices/" + id);
      dev.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
      dev.send();
    }
  }, [id])

  return (
    <div>
      <div className="page_block_container">
        <h2>Params</h2>
        <div className="advise">
          <span>Params are data interchanged between Google and the device and stored in Homeware database. A notification will be sent in this MQTT topic when Google change a param.</span>
        </div>
        <hr/>
        {
          params.length === 0 ? 
            <div className="info">
              There are no params for this device.
            </div>
          :
            <>
              <div className="param_table_row param_table_header">
                <div className="param_table_cel"><b>Param</b></div>
                <div className="param_table_cel"><b>Notifications topic</b></div>
                <div className="param_table_cel"><b>Type</b></div>
              </div>
              {
                params.map((param, i) => {
                  var type = deviceReference.params[param].type
                  if (type === 'list')
                    type = 'string'
            
                  var topic = 'None - Controlled only by the device'
                  if (deviceReference.params[param].commanded)
                    topic = 'device/' + id + '/' + param
            
                  return (
                    <div key={i} className="param_table_row">
                      <div className="param_table_cel">{param}</div>
                      <div className="param_table_cel">{topic}</div>
                      <div className="param_table_cel">{type}</div>
                    </div>
                  )
                })
              }
              <div className="advise" style={{textAlign: "left"}}>
                <hr/>
                <p>The device can change the value of any param sending an execute request to "device/control" topic as follow</p>
                <ReactJsonView src={{"id":"light001","param":"brightness","value":"80","intent":"execute"}}/>
              </div>
            </>
        }
        
      </div>

      <div className="page_block_container">
        <h2>Commands</h2>
        <div className="advise">
          <span>Commands are directs orders from Google to the device. Commands are not stored in Homeware's database.</span>
        </div>
        <hr/>
        {
          commands.length === 0 ? 
            <div className="info">
              There are no commands for this device.
            </div>
          :
            <>
              <div className="command_table_row command_table_header">
                <div className="command_table_cel"><b>Command</b></div>
                <div className="command_table_cel"><b>Notifications topic</b></div>
                <div className="command_table_cel"><b>Description</b></div>
              </div>
              {
                commands.map((command, i) => {
                  return (
                    <div key={i} className="command_table_row">
                      <div className="command_table_cel">{command.command}</div>
                      <div className="command_table_cel">{'device/' + id + '/command'}</div>
                      <div className="command_table_cel">{command.description}</div>
                    </div>
                  )
                })
              }
            </>
        }
      </div>
      <Toast alert={alert}/>
    </div>
  )  
}

export default Connecting
