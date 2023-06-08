module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],
  theme: {
    colors: {
      'black': '#181818',
      'black-opacity': 'rgba(24, 24, 24, 0.8)',
      'gray-lines': '#BDBDBD',
      'gray-lines-dark': '#676767',
      'gray': '#929292',
      'white': '#FFFFFF',
      'accent': '#FBE205',
      'light-bg': '#F8F8F8',
      'light-bg-opacity': 'rgba(248, 248, 248, 0.8)',
    },
    fontSize: {
      xs: ['16px', '16px'],
      sm: ['18px', '19px'],
      base: ['20px', '24px'],
      md: ['24px', '29px'],
      lg: ['32px', '39px'],
      xl: ['40px', '49px'],
      '2xl': ['86px', '86px'],
    },
    screens: {
      'xs': '360px',
      'sm': '488px',
      'md': '870px',
      'lg': '1050px',
      'xl': '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Anonymous Pro', 'serif'],
      },
      animation: {
        'opacity': 'opacity 800ms ease-in-out forwards',
        'opacity-reverse': 'opacity-reverse 300ms ease-in-out',
        'marquee-right': 'marquee 15s linear infinite',
        'marquee-left': 'marquee 15s linear infinite reverse',
      },
      keyframes: {
        'opacity': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'opacity-reverse': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(+100% + 1rem))' },
        },
      }
    },
  },
  plugins: [],
}
