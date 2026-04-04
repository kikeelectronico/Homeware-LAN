import React, {forwardRef, useImperativeHandle} from 'react';

const Locator = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      
    }
  }))

  return (
    <>
      <div className="no_attributes_message">
        <span>This trait does not need to be configured.</span>
      </div>
    </>
  )
})

export default Locator
