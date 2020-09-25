import React from 'react';

import './Assistant.css';

class Initialize extends React.Component {
  constructor(props) {
    super(props);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      console.log(xmlHttp.responseText)
    }
    var url = 'http://' + window.location.hostname + ':5001/api/settings/setAssistantDone/';
    xmlHttp.open( "GET", url, true );
    xmlHttp.send( null );

    setTimeout(function(){window.location.href = '/'}, 3000);
  }

  render() {

    return (
      <div className="assistant_container">
        <h1>Homeware configuration assistant - Last touches</h1>
        <p>Homeware is giving it self the last touches.</p>
      </div>
    );


  }
}

export default Initialize
