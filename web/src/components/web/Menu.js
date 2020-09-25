import React from 'react';

function Menu(props) {

  const menu = {
    marginTop: '5px',
    display: 'grid',
    gridTemplateColumns: '40px auto'
  }

  const image = {
    width: '30px'
  }

  const textContainer = {
    paddingTop: '4px'
  }

  const text = {
    fontSize: '18px',
    cursor: 'pointer'
  }

  function go (){
    window.location.href = props.href;
  }

  return (
    <div style={ menu }>
      <div>
        <img src={ props.image } alt={ props.image } style={ image }/>
      </div>
      <div style={ textContainer }>
        <span style={ text } onClick={ props.exec ? props.exec : go}>{ props.title }</span>
      </div>
    </div>
  );
}

export default Menu
