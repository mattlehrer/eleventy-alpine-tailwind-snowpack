module.exports = {
  purge: ['./src/**/*.html', './src/**/*.md', './src/**/*.njk'],
  darkMode: 'media',
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {
              fontWeight: '500',
            },
            h3: {
              fontWeight: '500',
            },
            a: {
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'inherit',
            },
          },
        },
        light: {
          css: [
            {
              color: theme('colors.gray.200'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.white'),
              },
              strong: {
                color: theme('colors.white'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              blockquote: {
                fontWeight: '300',
                fontStyle: 'italic',
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.600'),
                // hack - not sure why single quote is showing up on second blockquotes
                quotes: '"\\201C""\\201D""\\201C""\\2019"',
              },
              'blockquote p:first-of-type::before': {
                // content: 'open-quote',
                'font-size': '5em',
                opacity: '30%',
                'line-height': '0.1em',
                'margin-left': '-0.2em',
                'margin-right': '0.15em',
                'vertical-align': '-0.4em',
              },
              'blockquote p:last-of-type::after': {
                content: 'none',
                // 'font-size': '4em',
                // opacity: '50%',
                // 'line-height': '0.1em',
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      borderRadius: ['hover'],
      borderStyle: ['hover'],
      fontWeight: ['dark'],
      typography: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
  ],
};
