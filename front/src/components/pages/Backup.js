import React from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";

class Backup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }

  componentDidMount() {
    var url = new URL(window.location);
    var status = url.searchParams.get("status");
    this.setState({ status });
  }

  backup() {
    ToastsStore.warning("Downloading");
    window.location =
      root +
      "files/buckup/homeware/" +
      getCookieValue("token") +
      "?code=" +
      String(Math.random());
  }

  render() {
    const restore_url =
      root + "files/restore/homeware/" + getCookieValue("token") + "/";

    return (
      <div>
        <div className="page_block_container">
          <h2>Backup</h2>
          <hr />
          <div className="page_block_content_container">
            <button type="button" onClick={this.backup}>
              Backup
            </button>
          </div>
          <div className="advise">
            <span>Download a backup file.</span>
          </div>
        </div>
        <div className="page_block_container">
          <h2>Restore</h2>
          <hr />
          {this.state.status}
          <div className="page_block_content_container">
            <form
              method="post"
              encType="multipart/form-data"
              action={restore_url}
            >
              <input type="file" name="file" />
              <button type="submit">Restore</button>
            </form>
          </div>
          <div className="advise">
            <span>Restore a backup file.</span>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Backup;
