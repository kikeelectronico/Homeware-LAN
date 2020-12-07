module.exports = {
  title: 'Homeware Docs',
  tagline: 'A complete ecosystem to connect your DIY devices with Google Home.',
  url: 'https://kikeelectronico.github.io',
  baseUrl: '/Homeware-LAN/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'kikeelectronico', // Usually your GitHub org/user name.
  projectName: 'Homeware-LAN', // Usually your repo name.
  themeConfig: {
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
          label: 'API',
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
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
