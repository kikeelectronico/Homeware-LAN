import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Redocusaurus from 'redocusaurus';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Homeware Docs',
  tagline: 'A complete ecosystem to connect your DIY devices with Google Home.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kikeelectronico', // Usually your GitHub org/user name.
  projectName: 'Homeware', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          // Pass it a path to a local OpenAPI YAML file
          {
            // Redocusaurus will automatically bundle your spec into a single file during the build
            spec: 'https://raw.githubusercontent.com/kikeelectronico/Homeware-LAN/refs/heads/dev/docs/static/openapi.json',
            route: '/api/',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
    ] satisfies Redocusaurus.PresetEntry,
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Homeware Docs',
      logo: {
        alt: 'Homeware Logo',
        src: 'img/Homeware.png',
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'install',
          label: 'Docs',
        },
        {
          to: 'api/',
          label: 'API REST',
          position: 'left',
        },
        {
          to: 'docs/unsupported-devices/',
          label: 'Unsopported devices',
          position: 'left',
        },
        {
          to: 'libs/',
          label: 'Libs',
          position: 'left',
        },
        {
          to: 'docs/code-of-conduct/',
          label: 'Code of conduct',
          position: 'left',
        },
        {
          to: 'docs/contributing/',
          label: 'Contributing',
          position: 'left',
        },
        {
          href: 'https://github.com/kikeelectronico/Homeware-LAN',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Homeware Docs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
