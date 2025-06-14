import React, {useState, useEffect}  from 'react'

import Enable from './traits/Enable';
import LockUnlock from './traits/LockUnlock';
import OnOff from './traits/OnOff'
import Open from './traits/Open';
import TemperatureAmbient from './traits/TemperatureAmbient';
import TemperatureSetting from './traits/TemperatureSetting';
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'
import { colors } from '@mui/material';

const Device = (props) => {

    const [strip_color, setStripColor] = useState("white")
    const [strip_on, setStripOn] = useState(true)

    return (
        <div>
            <div className="device_card">
                <div className="device_card_color_strip" style={{backgroundColor: strip_color, opacity: strip_on ? "1" : "0.4"}}></div>

                <h2 className="device_card_title">{ props.device.name.name }</h2>
                <div className="device_card_status_container">
                    <LockUnlock id={ props.device.id } states={props.states} setStripColor={setStripColor} setStripOn={setStripOn}/>
                    <Open id={ props.device.id } states={props.states}/>
                    <TemperatureAmbient id={ props.device.id } device={props.device} states={props.states}/>
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

{/*  */}
{/* <Information id={ props.device.id }/>
<Connecting id={ props.device.id }/>
 */}

export default Device
