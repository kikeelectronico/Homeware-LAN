import React from 'react';

function Component(props) {

  const component = {
    marginTop: '5px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '70% 30%'
  }

  const textContainer = {
    textAlign: 'left',
    paddingTop: '4px'
  }

  const labelContainer = {
    textAlign: 'right',
    paddingTop: '4px'
  }

  const text = {
    fontSize: '18px'
  }

  const running = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'green',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '5px'
  }

  const stopped = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '5px'
  }

  return (
    <div style={ component }>
      <div style={ textContainer }>
        <span style={ text }>{ props.title }</span>
      </div>
      <div style={ labelContainer }>
        <span style={ props.status === 'Running' ? running : stopped }>{ props.status }</span>
      </div>
    </div>
  );
}

export default Component
