import React from 'react';
import {TextField} from '@mui/material';

import '../pages/Editor.css';

const Text = (props) => {

    return (
      <div className="two_table_row">
        <div className="two_table_cel">
          {props.name}
        </div>
        <div className="two_table_cel">
          <TextField
            id={props.data}
            variant="outlined"
            className="two_input"
            value={props.value}
            onChange={(event) => props.update(event.target.value)}
            disabled={props.disabled}
          />
        </div>
      </div>
    );
  
}

export default Text
