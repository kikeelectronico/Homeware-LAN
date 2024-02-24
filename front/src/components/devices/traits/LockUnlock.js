import React, {useState, useEffect}  from 'react';

const LockUnlock = (props) => {

  const [icon, setIcon] = useState("lock_close")
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (props.status.isJammed) {
      setIcon('lock_alert')
      setTitle('It is jammed')
    } else if (props.status.isLocked) {
      setIcon('lock_close')
      setTitle('It is close')
    } else if (!props.status.isLocked) {
      setIcon('lock_open')
      setTitle('It is open')
    }
  }, [props.status])
    

    return (
      <div style={{float: 'left', marginLeft: '5px', height: "30px"}}>
        <img
          src={ '/devices/' + icon + '.png' }
          title={ title }
          alt={ props.image }
          style={{width: '30px'}}
        />
      </div>
    );
  
}

export default LockUnlock
