module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ['IBM Plex Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        "et-dark": {
          100: "#151D2B"
        },
        "et-light": {
          100: "#1C273C"
        },
        "et-purple": {
          100: "#C19AFF"
        },
        "et-info": {
          100: "#586982"
        }
      }
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
  // daisyUI config (optional)
  // for full config docs: https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    // for theme customization: https://daisyui.com/docs/themes/
    themes: [{
      dark: {
        ...require('daisyui/src/colors/themes')["[data-theme=dark]"],
        "base-100": "#151D2B"
      }
    }],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
