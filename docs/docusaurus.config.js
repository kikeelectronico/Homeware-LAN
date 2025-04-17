// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Homeware Docs',
  tagline: 'A complete ecosystem to connect your DIY devices with Google Home.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://homeware.enriquegomez.me/',
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
    }),
};

export default config;
