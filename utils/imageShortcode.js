const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, classList, sizes) {
  const isOnNetlify =
    process.env.CONTEXT === 'production' ||
    process.env.CONTEXT === 'deploy-preview' ||
    process.env.CONTEXT === 'branch-deploy';

  const metadata = await Image(src, {
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
    formats: isOnNetlify ? ['avif', 'webp', null] : [null],
    svgShortCircuit: true,
    outputDir: '_site/images/',
    urlPath: '/images/',
  });

  const imageAttributes = {
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
