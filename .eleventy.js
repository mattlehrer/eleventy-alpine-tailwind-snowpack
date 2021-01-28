const fs = require('fs');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { imageShortcode } = require('./utils/imageShortcode');
const { htmlDateString, readableDate } = require('./utils/dateFormatters');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  eleventyConfig.addPassthroughCopy({ './src/static': '/' });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', htmlDateString());
  eleventyConfig.addFilter('readableDate', readableDate());

  // future default and makes intuitive sense
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // 404
  eleventyConfig.setBrowserSyncConfig({
    files: ['_site/**/*', 'src/styles/*', 'src/scripts/*'],
    open: true,
    // from https://github.com/turbolinks/turbolinks/issues/147#issuecomment-236443089
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        },
      },
    },
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
