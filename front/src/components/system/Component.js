import React from 'react';

import './Component.css'

const Component = (props) => (
    <div className="component">
      <div className="component_text_container">
        <span className="component_text">{ props.title }</span>
      </div>
      <div className="component_label_container">
        <span className={ props.status === 'Running' ? 'component_label component_label_runnig' : 'component_label component_label_stopped' }>{ props.status }</span>
      </div>
    </div>
);

export default Component
