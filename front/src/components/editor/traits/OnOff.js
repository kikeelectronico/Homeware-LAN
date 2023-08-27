import React, {useEffect} from 'react';
import Switch from "react-switch";

const OnOff = (props) => {

  useEffect(() => {
    console.log("mount")
    return () => console.log("unmount")
  }, [])

  const updateCheckbox =(checked, attribute) => {
    this.props.update('attributes/' + attribute,checked);
  }

  return (
    <div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyOnOff</i>
        </div>
        <div className="three_table_cel">
          <Switch onChange={(checked) => {updateCheckbox(checked,"commandOnlyOnOff")}} checked={props.attributes.commandOnlyOnOff} />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyOnOff</i>
        </div>
        <div className="three_table_cel">
          <Switch onChange={(checked) => {updateCheckbox(checked,"queryOnlyOnOff")}} checked={props.attributes.queryOnlyOnOff} />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Google shouldn't change the device state.</span>
        </div>
      </div>
    </div>
  )
}

export default OnOff
