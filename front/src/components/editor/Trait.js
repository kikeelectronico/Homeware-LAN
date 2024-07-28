import React, {useState, useEffect, useRef} from 'react';
import Switch from "react-switch";

import { deviceReference } from "../../constants";

import ArmDisarm from "./traits/ArmDisarm";
import Brightness from "./traits/Brightness";
import ColorSetting from "./traits/ColorSetting";
import Cook from "./traits/Cook";
import EnergyStorage from "./traits/EnergyStorage";
import FanSpeed from "./traits/FanSpeed";
import Fill from "./traits/Fill";
import HumiditySetting from "./traits/HumiditySetting";
import Modes from "./traits/Modes";
import OccupancySensing from "./traits/OccupancySensing";
import OnOff from "./traits/OnOff";
import OpenClose from "./traits/OpenClose";
import Rotation from "./traits/Rotation";
import Scene from "./traits/Scene";
import SensorState from "./traits/SensorState";
import StartStop from "./traits/StartStop";
import TemperatureControl from "./traits/TemperatureControl";
import TemperatureSetting from "./traits/TemperatureSetting";
import Timer from "./traits/Timer";
import Toggles from "./traits/Toggles";

const Trait = (props) => {

    const [show_attributes, setShowAttributes] = useState(false)

    useEffect(() => setShowAttributes(props.device_traits.includes(props.trait)), [props.device_traits, props.trait])

    const childRef = useRef();

    const enableTrait = (checked) => {
        if (show_attributes && !checked) childRef.current.deleteAttributes() 
        setShowAttributes(checked)
        props.updateTraits(props.trait, checked ? "insert" : "delete")
    }

    const renderAttrinutes = (trait) => {
      if (trait === "action.devices.traits.ArmDisarm") return <ArmDisarm attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Brightness") return <Brightness attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.ColorSetting") return <ColorSetting attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
    //   else if (trait === "action.devices.traits.Cook") return <Cook attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.EnergyStorage") return <EnergyStorage attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.FanSpeed") return <FanSpeed attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Fill") return <Fill attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.HumiditySetting") return <HumiditySetting attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Modes") return <Modes attributes={props.attributes} updateAttributes={props.updateAttributes} status={props.status} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.OccupancySensing") return <OccupancySensing attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.OnOff") return <OnOff attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/> 
      else if (trait === "action.devices.traits.OpenClose") return <OpenClose attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Rotation") return <Rotation attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Scene") return <Scene attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
    //   else if (trait === "action.devices.traits.SensorState") return <SensorState attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.StartStop") return <StartStop attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
    //   else if (trait === "action.devices.traits.TemperatureControl") return <TemperatureControl attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.TemperatureSetting") return <TemperatureSetting attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Timer") return <Timer attributes={props.attributes} updateAttributes={props.updateAttributes} updateStatus={props.updateStatus} ref={childRef}/>
      else if (trait === "action.devices.traits.Toggles") return <Toggles attributes={props.attributes} updateAttributes={props.updateAttributes} status={props.status} updateStatus={props.updateStatus} ref={childRef}/>
  }

    return (
        <div>
            <div className="three_table_row">
            <div className="three_table_cel">
                <b>{deviceReference.traits[props.trait].name}</b>
            </div>
            <div className="three_table_cel">
                <Switch
                    onChange={enableTrait}
                    checked={show_attributes}
                />
            </div>
            <div className="three_table_cel">
                Read Google's{" "}
                <a
                href={
                    "https://developers.google.com/assistant/smarthome/traits/" +
                    props.trait.split(".")[3].toLowerCase()
                }
                target="blanck"
                >
                documentation
                </a>
            </div>
            </div>
            {
                show_attributes ? 
                    renderAttrinutes(props.trait)
                : <></>
            }
            <hr className="separator" />
        </div>
    )

}

export default Trait