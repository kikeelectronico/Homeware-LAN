import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  sceneReversible: false
}

const states = {
  enable: false
}

const Scene = forwardRef((props, ref) => {

  const [sceneReversible, setSceneReversible] = useState(attributes.sceneReversible)

  useEffect(() => {
    if ("sceneReversible" in props.attributes) {
      setSceneReversible(props.attributes.sceneReversible)
    } else {
      props.updateStates(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStates(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
    }
  }))


  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>sceneReversible</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setSceneReversible(checked)
              props.updateAttributes("sceneReversible", checked, "update")
            }}
            checked={sceneReversible}
          />
        </div>
      </div>
    </div>
  );
  
})

export default Scene
