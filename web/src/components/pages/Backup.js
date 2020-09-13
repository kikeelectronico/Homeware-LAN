import React from 'react';
import getCookieValue from '../../functions'
import { root } from '../../constants'

class Backup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  backup(){
    window.location = root + "files/buckup/homeware/" + getCookieValue('token')
  }

  render() {

    const container = {
      width: '80%',
      marginLeft: '8%',
      marginTop: '20px',
      backgroundColor: 'white',
      paddingTop: '10px',
      paddingLeft: '20px',
      paddingBottom: '20px',
      paddingRight: '20px',
      borderRadius: '20px'
    }

    const sub_container = {
      width: '80%',
      marginTop: '10px',
      marginLeft: '10%',
      fontSize: '18px',
      textAlign: 'left'
    }

    const form = {
      display: 'grid',
      gridTemplateColumns: '60% auto'
    }

    const button = {
      width: '200px'
    }

    const restore_url = root + "files/restore/file/" + getCookieValue('token') + "/";

    return (
      <div>


        <div style={ container }>
          <h2>Backup</h2>
          <hr/>
          <div style={sub_container}>
              <button type="button" style={ button } onClick={ this.backup }>Backup</button>
          </div>
          <div className="advise">
            <span>Download a backup file.</span>
          </div>
        </div>

        <div style={ container }>
          <h2>Restore</h2>
          <hr/>
          <div style={sub_container}>
            <form style={ form } method="post" encType="multipart/form-data" action={ restore_url }>
              <input type="file" name="file"/>
              <button type="submit" style={ button } onClick={ this.restart }>Restore</button>
              </form>
          </div>
          <div className="advise">
            <span>Restore a backup file.</span>
          </div>
        </div>


      </div>
    );
  }
}

export default Backup
