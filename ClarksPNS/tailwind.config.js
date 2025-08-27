/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#263B95', // Clarks Blue
          blue: '#0084FF',    // Medium Blue
          black: '#000000',
          white: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F7F8FA',
        },
        text: {
          DEFAULT: '#111827',
          muted: '#4B5563',
          onBrand: '#FFFFFF',
        },
      },
      fontSize: {
        nav: ['1.25rem', { lineHeight: '1.25' }],
        h1: ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h2: ['2rem', { lineHeight: '1.15' }],
        h3: ['1.5rem', { lineHeight: '1.2' }],
      },
      spacing: {
        header: '5rem', // 80px
        gutter: '1rem',
        section: '4rem',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.08)',
        hard: '0 12px 24px rgba(0,0,0,0.12)',
      },
      zIndex: {
        header: '50',
        modal: '100',
      },
      letterSpacing: {
        tightish: '-0.005em',
      },
    },
    fontFamily: {
      sans: ['Oswald', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'ui-sans-serif', 'sans-serif'],
      display: ['Oswald', 'ui-sans-serif', 'system-ui'],
      body: ['Oswald', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
}
