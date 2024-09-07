import React, {useState, useEffect} from "react";
import getCookieValue from "../../functions";
import { root } from "../../constants";
import Component from "../system/Component.js";
import ReactMarkdown from 'react-markdown'

import "./System.css"

const COMPONENTS_CHECK_INTERVAL = 3;

function System(props) {

  const [components, setComponents] = useState([])

  useEffect(() => {
    loadComponents();
    setInterval(loadComponents, COMPONENTS_CHECK_INTERVAL * 1000);
  }, [])

  const loadComponents = () => {
    var comp = new XMLHttpRequest();
    comp.onload = function (e) {
      if (comp.readyState === 4) {
        if (comp.status === 200) {
          var response = JSON.parse(comp.responseText);
          var _components = [];
          var keys = Object.keys(response);
          for (var i = 0; i < keys.length; i++) {
            _components.push(response[keys[i]]);
          }
          setComponents(_components)
        } else {
          console.error(comp.statusText);
        }
      }
    }
    comp.open("GET", root + "api/system/status/");
    comp.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    comp.send();
  }

  return (
    <div>
      <div className="page_block_container">
        <h2>System status</h2>
        <div className="advise">
          <span>These are the core components of Homeware-LAN. All must be running.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          {
            components.map((component) => (
              <Component
                title={component.title}
                status={component.status}
                enable={component.enable}
                key={component.title}
              />
            ))
          }
          </div>
      </div>
      <div className="page_block_container">
        <h2>System update</h2>
        <div className="advise">
          <span>Check for a system update.</span>
        </div>
        <hr />
        <div className="page_block_content_container text_left">
          <b>System version:</b> {props.version}
          {props.git.code !== 200 ? (
            <div>
              <br /> Unable to verify if there is a system update.
            </div>
          ) : (
            <div>
              {props.version !== props.git.version ? (
                <div>
                  <b>Available version:</b> {props.git.version}
                  <h3>
                    What's new?
                  </h3>
                  <div className="git_description">
                    <ReactMarkdown>{props.git.description}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div>
                  <br /> The system is up to date.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default System;
