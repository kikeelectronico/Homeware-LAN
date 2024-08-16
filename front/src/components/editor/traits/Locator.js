import React, {forwardRef, useImperativeHandle} from 'react';

const Locator = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      
    }
  }))

  return (
    <>
      <div className="no_attributes_message">
        <span>This trait don't need to be configured.</span>
      </div>
    </>
  )
})

export default Locator
