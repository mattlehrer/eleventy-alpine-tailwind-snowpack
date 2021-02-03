module.exports = {
  mount: {
    _site: { url: '/', static: true, resolve: false },
    'src/scripts': { url: '/scripts' },
    'src/styles': { url: '/styles' },
  },
  plugins: [
    '@snowpack/plugin-postcss',
    [
      '@snowpack/plugin-run-script',
      {
        cmd: 'eleventy',
        watch: '$1 --watch',
      },
    ],
    [
      'snowpack-plugin-minify-html',
      {
        htmlMinifierOptions: {
          /**
           * config options https://github.com/kangax/html-minifier#readme
           */
          collapseWhitespace: true,
          removeComments: true,
          removeEmptyAttributes: true,
          sortAttributes: true,
        },
      },
    ],
  ],
  packageOptions: {
    NODE_ENV: true,
    source: 'remote',
  },
  buildOptions: {
    clean: true,
    out: 'dist',
  },
  devOptions: {
    open: 'none', // set to '**Default**' to open browser on run
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2020',
  },
};
