import React from 'react';
import OnOff from './traits/OnOff'
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

const Device = (props) => {

  return (
    <div>
      <div className="device_card">
        {
            Object.keys(props.states).includes("on") ?
                <div className="device_card_color_strip" style={{backgroundColor: "#90EE90", opacity: props.states.on ? "1" : "0.4"}}></div>
            : <></>
        }
        
        <h2 className="device_card_title">{ props.device.name.name }</h2>
        <div className="device_card_status">Activo</div>
        
        <div className="device_card_buttons_row">
            {
                Object.keys(props.states).includes("on") ?
                    <OnOff id={ props.device.id } on={ props.states.on } reload={ props.reload }/>
                : <></>
            }
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
