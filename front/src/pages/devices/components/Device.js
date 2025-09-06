import React, {useState}  from 'react'
import { Link } from "react-router-dom";

import ArmDisarm from './traits/ArmDisarm';
import Brightness from './traits/Brightness';
import Enable from './traits/Enable';
import LockUnlock from './traits/LockUnlock';
import OnOff from './traits/OnOff'
import Occupancy from './traits/Occupancy'
import Open from './traits/Open';
import StartStop from './traits/StartStop';
import TemperatureAmbient from './traits/TemperatureAmbient';
import TemperatureSetting from './traits/TemperatureSetting';
import ThermostatMode from './traits/ThermostatMode';
import Edit from './aux/Edit'

const Device = (props) => {

    const [strip_color, setStripColor] = useState("white")
    const [strip_on, setStripOn] = useState(true)
    const [contextual_menu, setContextualMenu] = useState(false)

    return (
        <div>
            <div className="device_card">
                <div className="device_card_color_strip" style={{backgroundColor: strip_color, opacity: strip_on ? "1" : "0.4"}}></div>

                <h2 className="device_card_title">{ props.device.name.name }</h2>
                <div className="device_card_status_container">
                    <ArmDisarm states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <Brightness states={props.states}/>
                    <LockUnlock states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <Occupancy device={props.device} states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <Open device={props.device} states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <StartStop device={props.device} states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <TemperatureAmbient device={props.device} states={props.states}/>
                </div>
                
                <div className="device_card_actions_container">
                    <Enable id={props.device.id} states={props.states} reload={props.reload} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <OnOff id={props.device.id} states={props.states} reload={props.reload} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <TemperatureSetting id={props.device.id} states={props.states} reload={props.reload} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <ThermostatMode id={props.device.id} device={props.device} states={props.states} reload={props.reload} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    
                    <Edit setContextualMenu={setContextualMenu}/>
                </div>

                {
                    contextual_menu ?
                        <div className="device_card_contextual_menu_container">
                            <div onClick={() => setContextualMenu(false)} className="device_card_contextual_menu_element device_card_contextual_menu_close">
                                X
                            </div>
                            <Link to={"/devices/editor/" + props.device.id + "/"} className="device_card_contextual_menu_element">
                                Edit
                            </Link>
                            <Link to={"/devices/info/" + props.device.id + "/"} className="device_card_contextual_menu_element">
                                Information
                            </Link>
                            <Link to={"/devices/connecting/" + props.device.id + "/"} className="device_card_contextual_menu_element">
                                Connections
                            </Link>
                        </div>
                    : <></>
                }
            </div>
        </div>
    );
  
}

export default Device
