/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: { 
    extend: { 
      fontFamily: { 
        "lato": ['Lato', 'sans-serif'] 
      } 
    }, 
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ]
,
}

