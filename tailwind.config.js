/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50:  '#f4f7f0', 100: '#e5ecde', 200: '#ccd9bf', 300: '#a9be96',
          400: '#829f6a', 500: '#638249', 600: '#4d6738', 700: '#3d522d',
          800: '#334427', 900: '#2a3920', 950: '#141f0f',
        },
        wine: {
          50:  '#fdf2f4', 100: '#fce7ea', 200: '#f8d0d6', 300: '#f3aab4',
          400: '#eb7888', 500: '#de4d60', 600: '#ca2d42', 700: '#aa2135',
          800: '#8b1f2f', 900: '#721e2c', 950: '#440c15',
        },
        gold: {
          50:  '#fdf9ed', 100: '#faf0cb', 200: '#f4de92', 300: '#edc75a',
          400: '#e6af32', 500: '#d4941a', 600: '#b87213', 700: '#955213',
          800: '#7b4016', 900: '#673518', 950: '#3b1a08',
        },
        cream: {
          50:  '#fffdf7', 100: '#fef9ec', 200: '#fdf0d0',
          300: '#fbe3a8', 400: '#f8d07a', 500: '#f4bb52',
        },
        charcoal: {
          800: '#2e2212', 900: '#221808', 950: '#191205',
        },
      },
      fontFamily: {
        display: ['"Gecko"', 'Georgia', 'Palatino', 'serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        sans:    ['"Gecko"', 'Georgia', 'Palatino', 'serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      backgroundImage: {
        'radial-gold':  'radial-gradient(ellipse at center, rgba(201,169,110,0.18) 0%, transparent 70%)',
        'radial-wine':  'radial-gradient(ellipse at center, rgba(139,38,53,0.14) 0%, transparent 70%)',
        'radial-olive': 'radial-gradient(ellipse at center, rgba(99,130,73,0.12) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':     'fadeIn 0.8s ease forwards',
        'slide-up':    'slideUp 0.7s ease forwards',
        'float':       'float 7s ease-in-out infinite',
        'pulse-slow':  'pulseSlow 4s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'breathe':     'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:    { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        float:      { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseSlow:  { '0%,100%': { opacity: 0.4 }, '50%': { opacity: 0.8 } },
        shimmer:    { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        breathe:    { '0%,100%': { transform: 'scale(1)', opacity: 0.5 }, '50%': { transform: 'scale(1.08)', opacity: 0.8 } },
      },
      boxShadow: {
        'warm':      '0 4px 24px rgba(180, 120, 60, 0.18)',
        'warm-lg':   '0 8px 48px rgba(180, 120, 60, 0.25)',
        'warm-xl':   '0 16px 64px rgba(180, 120, 60, 0.3)',
        'card':      '0 2px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)',
        'glow-gold': '0 0 40px rgba(201,169,110,0.2), 0 0 80px rgba(201,169,110,0.08)',
        'glow-wine': '0 0 40px rgba(139,38,53,0.18)',
        'inner-glow':'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
      },
      transitionTimingFunction: {
        'spring':  'cubic-bezier(0.22, 1, 0.36, 1)',
        'expo':    'cubic-bezier(0.87, 0, 0.13, 1)',
        'back':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
