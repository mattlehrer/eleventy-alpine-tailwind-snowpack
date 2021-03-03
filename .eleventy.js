const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { imageShortcode } = require('./utils/imageShortcode');
const {
  htmlDateString,
  readableDate,
  readableUTCDate,
} = require('./utils/dateFormatters');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  eleventyConfig.addPassthroughCopy({ './src/static': '/' });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', htmlDateString());
  eleventyConfig.addFilter('readableDate', readableDate());
  eleventyConfig.addFilter('readableUTCDate', readableUTCDate());

  eleventyConfig.addCollection('faveCategories', function (collectionApi) {
    const allFavorites = collectionApi.getFilteredByTag('favorites');
    let categories = allFavorites.filter((fave) => {
      return fave.data.tags.filter((tag) => tag !== 'posts').length === 1;
    });
    categories = categories
      .map((category) => {
        // replace category date with latest category element date
        // the category title -> toLowerCase is the tag
        category.date = collectionApi
          .getFilteredByTag(category.data.title.toLowerCase())
          .reduce(
            (acc, curr) => (acc > curr.data.date ? acc : curr.data.date),
            category.date,
          );
        return category;
      })
      .sort((a, b) => a.date - b.date);
    return categories;
  });

  // future default and makes intuitive sense
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // 404
  eleventyConfig.setBrowserSyncConfig({
    files: ['_site/**/*', 'src/styles/*', 'src/scripts/*'],
    // from https://github.com/turbolinks/turbolinks/issues/147#issuecomment-236443089
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        },
      },
    },
    // 404 redirects don't seem to work with snowpack
    // callbacks: {
    //   ready: function (err, browserSync) {
    //     const content_404 = fs.readFileSync('_site/404.html');

    //     browserSync.addMiddleware('*', (req, res) => {
    //       // Provides the 404 content without redirect.
    //       res.write(content_404);
    //       res.end();
    //     });
    //   },
    // },
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    // passthroughFileCopy: true,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
