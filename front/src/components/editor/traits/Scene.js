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
      props.updateStatus(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStatus(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
    }
  }))


  return (
    <div>
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
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if the scene can be desabled.</span>
        </div>
      </div>
    </div>
  );
  
})

export default Scene
