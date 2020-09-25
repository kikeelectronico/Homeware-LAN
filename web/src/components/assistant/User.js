import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable_next: false,
      enable_message: false,
      message: ''
    }
    this.set = this.set.bind(this);
    this.next = this.next.bind(this);
  }

  set() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          this.setState({
            enable_next: true,
            enable_message: true,
            message: http.responseText
          });
          console.error(http.responseText);
        } else {
          console.error(http.statusText);
          this.setState({
            enable_message: true,
            message: 'Some error has occurred'
          });
        }
        setTimeout(function(){
          this.setState({
            enable_message: false,
            message: ''
          });
        }.bind(this), 5000)
      }
    }.bind(this);
    var url = 'http://' + window.location.hostname + ':5001/api/user/set/';
    http.open( "POST", url, true );
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify({
      'user': document.getElementById('user').value,
      'pass': document.getElementById('password').value
    }));
  }

  next() {
    if (this.state.enable_next)
      window.location.href = '/assistant/domain/';
    else
      alert('You must create an user')
  }

  render() {

    const element = {
      margin: '10px'
    }

    var message = '';
    if (this.state.enable_message){
      message = <div className="alert_message"> { this.state.message } </div>
    }

    return (
      <div className="assistant_container">
        <h1>Homeware configuration assistant - User</h1>
        <p>In order to keep your Homeware installation secure you must create an user and a password.</p>
        <br/>
        { message }
        <span style={ element }>Username</span>
        <input type="text" name="user" id="user"/>
        <span style={ element }>Password</span>
        <input type="password" name="password" id="password"/>
        <button type="button" onClick={this.set}>Create</button>
        <br/>
        <br/>
        <button type="button" onClick={this.next}>Next</button>
      </div>
    );


  }
}

export default User
