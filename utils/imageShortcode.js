const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, classList, sizes) {
  let metadata = await Image(src, {
    widths: [
      25,
      80,
      128,
      213,
      320,
      480,
      640,
      768,
      960,
      1024,
      1366,
      1440,
      1600,
      1920,
    ],
    formats: ['avif', 'webp', null],
    svgShortCircuit: true,
    outputDir: '_site/images/',
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
exports.imageShortcode = imageShortcode;
