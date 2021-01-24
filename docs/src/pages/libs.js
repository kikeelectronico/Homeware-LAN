import React from "react";
import Layout from "@theme/Layout";

function Libs() {
  return (
    <Layout title="Libs">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          marginLeft: "20%",
          paddingTop: 50,
          fontSize: "20px",
        }}
      >
        <h1>Homeware libs</h1>
        <p>
          Homeware is possible thanks to a lot of open source software, modules
          and resources. Thank you all.
        </p>

        <h2>Backend</h2>
        <ul>
          <li>
            <a href="https://github.com/pallets/flask" target="_blanck">
              Flask
            </a>
          </li>
          <li>
            <a href="https://github.com/benoitc/gunicorn" target="_blanck">
              gunicorn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/eclipse/paho.mqtt.python"
              target="_blanck"
            >
              paho-mqtt
            </a>
          </li>
          <li>
            <a href="https://github.com/andymccurdy/redis-py" target="_blanck">
              redis
            </a>
          </li>
          <li>
            <a href="https://github.com/psf/requests" target="_blanck">
              requests
            </a>
          </li>
          <li>
            <a
              href="https://github.com/corydolphin/flask-cors"
              target="_blanck"
            >
              flask_cors
            </a>
          </li>
          <li>
            <a href="https://github.com/pyca/bcrypt" target="_blanck">
              bcrypt
            </a>
          </li>
          <li>
            <a
              href="https://github.com/googleapis/google-auth-library-python"
              target="_blanck"
            >
              google-auth
            </a>
          </li>
        </ul>
        <h2>Frontend</h2>
        <ul>
          <li>
            <a
              href="https://github.com/testing-library/react-testing-library"
              target="_blanck"
            >
              @testing-library/react
            </a>
          </li>
          <li>
            <a
              href="https://github.com/testing-library/jest-dom"
              target="_blanck"
            >
              @testing-library/jest-dom
            </a>
          </li>
          <li>
            <a
              href="https://github.com/testing-library/user-event"
              target="_blanck"
            >
              @testing-library/user-event
            </a>
          </li>
          <li>
            <a href="https://github.com/facebook/react" target="_blanck">
              react
            </a>
          </li>
          <li>
            <a href="https://github.com/schiehll/react-alert" target="_blanck">
              react-alert
            </a>
          </li>
          <li>
            <a
              href="https://github.com/schiehll/react-alert-template-basic"
              target="_blanck"
            >
              react-alert-template-basic
            </a>
          </li>
          <li>
            <a href="https://github.com/facebook/react" target="_blanck">
              react-dom
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mac-s-g/react-json-view"
              target="_blanck"
            >
              react-json-view
            </a>
          </li>
          <li>
            <a
              href="https://github.com/remarkjs/react-markdown"
              target="_blanck"
            >
              react-markdown
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ReactTraining/react-router"
              target="_blanck"
            >
              react-router
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ReactTraining/react-router"
              target="_blanck"
            >
              react-router-dom
            </a>
          </li>
          <li>
            <a
              href="https://github.com/facebook/create-react-app"
              target="_blanck"
            >
              react-scripts
            </a>
          </li>
          <li>
            <a
              href="https://github.com/markusenglund/react-switch"
              target="_blanck"
            >
              react-switch
            </a>
          </li>
          <li>
            <a href="https://github.com/Vashnak/react-toasts" target="_blanck">
              react-toasts
            </a>
          </li>
          <li>
            <a href="https://github.com/yjose/reactjs-popup" target="_blanck">
              reactjs-popup
            </a>
          </li>
        </ul>
        <h2>Documentation</h2>
        <ul>
          <li>
            <a href="https://github.com/facebook/docusaurus" target="_blanck">
              Docusaurus
            </a>
          </li>
          <li>
            <a
              href="https://github.com/swagger-api/swagger-ui"
              target="_blanck"
            >
              swagger-ui
            </a>
          </li>
        </ul>
        <p>Let me know if I have forgot something.</p>
      </div>
    </Layout>
  );
}

export default Libs;
