import React, {useState, useEffect} from 'react';
import {Alert} from '@mui/material';

import './Toast.css'

let timer_id = null

const Toast = (props) => {

    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (timer_id)
            clearTimeout(timer_id)
        setAlert(props.alert)
        timer_id = setTimeout(() => {
            setAlert(null)
        }, 5000)
    }, [props])

    return (
        <>
            {
                alert ?
                <div  className="alert-container">
                    <Alert severity={alert.severity}>{alert.text}</Alert>
                </div>
                : <></>
            }
        </>
    )
};

export default Toast
