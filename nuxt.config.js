import colors from "vuetify/es5/util/colors";
import themeColors from "./color";

export default {
   // Global page headers: https://go.nuxtjs.dev/config-head
   head: {
      // titleTemplate: "%s SMI - Ticket Apps",
      title: "SMI - CRM",
      htmlAttrs: {
         lang: "en",
      },
      meta: [
         { charset: "utf-8" },
         { name: "viewport", content: "width=device-width, initial-scale=1" },
         { hid: "description", name: "description", content: "" },
         { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
   },

   // Global CSS: https://go.nuxtjs.dev/config-css
   css: [
      "@/assets/main.css",
      "@node_modules/@fortawesome/fontawesome-svg-core/styles.css",
      "@node_modules/@fortawesome/fontawesome-free/css/all.css",
   ],

   // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
   plugins: ["~/plugins/fontawesome.js", "~/plugins/iconify.js"],

   // Auto import components: https://go.nuxtjs.dev/config-components
   components: true,

   // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
   buildModules: [
      // https://go.nuxtjs.dev/vuetify
      "@nuxtjs/vuetify",
      "@nuxt/postcss8",
      "@nuxtjs/moment",
      "@nuxtjs/svg",
      // '@nuxtjs/fontawesome'
   ],

   // Modules: https://go.nuxtjs.dev/config-modules
   modules: [
      // https://go.nuxtjs.dev/axios
      "@nuxtjs/axios",
      "@nuxtjs/auth-next",
   ],

   // Axios module configuration: https://go.nuxtjs.dev/config-axios
   axios: {
      // proxy: true,
   },

   router: {
      middleware: ["auth"],
   },

   // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
   vuetify: {
      customVariables: ["@/assets/variables.scss"],
      treeShake: true,
      theme: {
         dark: false,
         themes: {
            dark: {
               primary: colors.blue.darken2,
               accent: colors.grey.darken3,
               secondary: colors.amber.darken3,
               info: colors.teal.lighten1,
               warning: colors.amber.base,
               error: "#FF7777",
               success: "#59BC7C",
            },
            light: { ...themeColors },
         },
      },
      // icons: {
      //    iconfont: "aw",
      // },
      defaultAssets: {
         font: {
            family: "Roboto",
         },
         icons: "md",
      },
   },

   // @nuxtjs/auth-next config options
   auth: {
      strategies: {
         local: {
            scheme: "refresh",
            token: {
               property: "data.accessToken",
               data: "accessToken",
               global: true,
               maxAge: 1800,
               type: "Bearer",
               required: true,
            },
            refreshToken: {
               property: "data.refreshToken",
               data: "refreshToken",
               maxAge: 60 * 60 * 24 * 30 * 12,
               required: true,
            },
            user: {
               property: "data",
               autoFetch: true,
            },
            endpoints: {
               login: { url: "/signin", method: "post" },
               refresh: { url: "/token", method: "post" },
               logout: { url: "/signout", method: "post" },
               user: { url: "/user", method: "get" },
            },
            tokenRequired: true,
            autoLogout: false,
         },
      },
      watchLoggedIn: true,
      redirect: {
         login: "/login",
         logout: "/login",
         home: "/apps/dashboard",
         callback: false,
      },
      // cookie: {
      //    prefix: "auth.",
      //    options: {
      //       path: "/",
      //       expires: 8,
      //    },
      // },
      // token: {
      //    prefix: "_token.",
      //    global: true,
      // },
      localStorage: false,
      plugins: ["~/plugins/auth.js"],
   },

   // Build Configuration: https://go.nuxtjs.dev/config-build
   build: {
      postcss: {
         plugins: {
            tailwindcss: {},
            autoprefixer: {},
         },
      },
   },
};
