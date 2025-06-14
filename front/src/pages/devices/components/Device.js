import React from 'react';
import OnOff from './traits/OnOff'
import Open from './traits/Open';
import TemperatureAmbient from './traits/TemperatureAmbient';
import TemperatureSetting from './traits/TemperatureSetting';
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

const Device = (props) => {

  return (
    <div>
      <div className="device_card">
      <div className="device_card_color_strip" style={{backgroundColor: Object.keys(props.states).includes("on") ? "#90EE90" : "white", opacity: props.states.on ? "1" : "0.4"}}></div>

        <h2 className="device_card_title">{ props.device.name.name }</h2>
        <div className="device_card_status">
            <TemperatureAmbient id={ props.device.id } device={props.device} states={props.states}/>
            <Open id={ props.device.id } states={props.states}/>
        </div>
        
        <div className="device_card_actions_row">
            <OnOff id={ props.device.id } states={props.states} reload={ props.reload }/>
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
