/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
          itkool: "#20C4F4",
          toidukool: "#F99D27",
          arikool: "#EF4044",
          turismikool: "#CADB36",
          ehituskool: "#0DB14B",
          tehnikakool: "#0089CF",
          ilukool: "#B41E8E",
          koolitused: "#00B89D",
          vocogray: "#F4F6F9",
          lightvocogray: "#E9ECF3"
          
      },
      fontSize: {
        'heading1': ['32px', { lineHeight: '1.5' }],
        'heading2': ['28px', { lineHeight: '1.5' }],
        'heading3': ['25px', { lineHeight: '1.5' }],
        'heading4': ['22px', { lineHeight: '1.5' }],
        'heading5': ['20px', { lineHeight: '1.5' }],
        'heading6': ['18px', { lineHeight: '1.5' }],
        'large': ['16px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'small': ['12px', { lineHeight: '1.5' }],
        'xsmall': ['11px', { lineHeight: '1.5' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
      screens: {
        'md': '768px',
        'lg': '1024px',
      },
    },
  },
  plugins: [],
}

