const themeColors = require("./color");

module.exports = {
   corePlugins: {
      // preflight: false,
   },
   prefix: "tw-",
   darkMode: false, // or 'media' or 'class'
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
   ],
   theme: {
      extend: {
         colors: {
            ...themeColors,
         },
         fontFamily: {
            sans: ["Nunito Sans", "sans-serif"],
         },
         fontSize: {
            sublogo: ".55rem",
            "2xs": ".65rem",
            xs: ".75rem",
            sm: ".875rem",
            tiny: ".875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "4rem",
            "7xl": "5rem",
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [require("@tailwindcss/line-clamp")],
};
