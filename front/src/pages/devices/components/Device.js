import React, {useState, useEffect}  from 'react'

import Brightness from './traits/Brightness';
import Enable from './traits/Enable';
import LockUnlock from './traits/LockUnlock';
import OnOff from './traits/OnOff'
import Open from './traits/Open';
import StartStop from './traits/StartStop';
import TemperatureAmbient from './traits/TemperatureAmbient';
import TemperatureSetting from './traits/TemperatureSetting';
import Edit from './aux/Edit'

const Device = (props) => {

    const [strip_color, setStripColor] = useState("white")
    const [strip_on, setStripOn] = useState(true)

    return (
        <div>
            <div className="device_card">
                <div className="device_card_color_strip" style={{backgroundColor: strip_color, opacity: strip_on ? "1" : "0.4"}}></div>

                <h2 className="device_card_title">{ props.device.name.name }</h2>
                <div className="device_card_status_container">
                    <Brightness states={props.states}/>
                    <LockUnlock states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <Open device={props.device} states={props.states}/>
                    <StartStop device={props.device} states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <TemperatureAmbient device={props.device} states={props.states}/>
                </div>
                
                <div className="device_card_actions_row">
                    <Enable id={props.device.id} states={props.states} reload={props.reload} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <OnOff id={props.device.id} states={props.states} reload={props.reload} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <TemperatureSetting id={ props.device.id } states={props.states} reload={ props.reload }/>
                    
                    <Edit id={ props.device.id }/>
                </div>
            </div>
        </div>
    );
  
}

export default Device
