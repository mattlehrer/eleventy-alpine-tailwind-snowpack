module.exports = {
  title: 'Your Site Title',
  description: 'Your Site',
  url: 'https://www.example.com',
  author: 'You',
  metadata: {
    twitter: '@you',
    default_img: '/images/default_img.jpg',
  },
  env: process.env.ELEVENTY_ENV === 'production',
};
