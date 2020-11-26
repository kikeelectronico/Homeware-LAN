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

    const restore_url = root + "files/restore/file/" + getCookieValue('token') + "/";

    return (
      <div>
        <div className="page_block_container">
          <h2>Backup</h2>
          <hr/>
          <div className="page_block_content_container">
              <button type="button" onClick={ this.backup }>Backup</button>
          </div>
          <div className="advise">
            <span>Download a backup file.</span>
          </div>
        </div>
        <div className="page_block_container">
          <h2>Restore</h2>
          <hr/>
          <div className="page_block_content_container">
            <form method="post" encType="multipart/form-data" action={ restore_url }>
              <input type="file" name="file"/>
              <button type="submit" onClick={ this.restart }>Restore</button>
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
