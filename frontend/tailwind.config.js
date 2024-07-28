/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}',  './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', './components/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require('daisyui'),
  ],
}

