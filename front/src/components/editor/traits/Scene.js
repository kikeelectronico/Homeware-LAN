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
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>sceneReversible</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setSceneReversible(checked)
              props.updateAttributes("sceneReversible", checked, "update")
            }}
            checked={sceneReversible}
          />
        </div>
      </div>
    </>
  );
  
})

export default Scene
