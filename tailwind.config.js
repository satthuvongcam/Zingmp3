/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-right2': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-right3': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left3': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right2': 'slide-right2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-right3': 'slide-right2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left3': 'slide-left3 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
      fontFamily: {
        custom: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
