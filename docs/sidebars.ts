import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  someSidebar: {
    Installation: ["install", "connect-with-google", "google-auth"],
    API: ["mqtt-api"],
    Guides: ["create-device"],
    Maintenance: ["update-homeware"],
    "4 Homeware devs": ["directories", "datapy", "commandspy", "homegraphpy", "homewarepy", "homewaremqttpy", "homewaretaskpy"], 
  },
};

export default sidebars;
