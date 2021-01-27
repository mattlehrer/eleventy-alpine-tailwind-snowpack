const fs = require('fs');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, classList, sizes) {
  let metadata = await Image(src, {
    widths: [25, 213, 320, 480, 640, 768, 960, 1024, 1366, 1440, 1600, 1920],
    formats: ['avif', 'webp', null],
    svgShortCircuit: true,
    outputDir: 'src/_site/images/',
    urlPath: '/images/',
  });

  let imageAttributes = {
    alt,
    sizes,
    class: classList,
    loading: 'lazy',
    decoding: 'auto',
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  // Static assets to pass through
  eleventyConfig.addPassthroughCopy({ './src/static': '/' });
  eleventyConfig.addPassthroughCopy('./src/fonts');
  // eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/manifest.json');
  // eleventyConfig.addPassthroughCopy('./src/robots.txt');

  const { DateTime } = require('luxon');

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toFormat('yy-MM-dd');
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    }).toLocaleString(DateTime.DATE_MED);
  });

  // future default and makes intuitive sense
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // 404
  eleventyConfig.setBrowserSyncConfig({
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
      output: 'src/_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'md', 'njk'],
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
