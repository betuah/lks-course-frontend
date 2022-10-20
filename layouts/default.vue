<template>
   <v-app class="tw-overflow-hidden fill-height">
      <Notif />
      <v-main class="tw-overflow-hidden fill-height">
         <div
            class="tw-bg-[url('/pattern/motpath.svg')] fill-height tw-w-full tw-bg-cover tw-bg-repeat tw-bg-center"
         >
            <div class="tw-bg-black/30 tw-h-full">
               <div
                  class="col-12 col-md-8 pa-0 d-flex flex-column mx-auto py-10"
               >
                  <Header />
                  <Nuxt />
               </div>
            </div>
         </div>
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: "DefaultLayout",
   data() {
      return {
         clipped: false,
         fixed: false,
         zIndex: 0,
         items: [
            {
               icon: "mdi-apps",
               title: "Welcome",
               to: "/",
            },
            {
               icon: "mdi-chart-bubble",
               title: "Inspire",
               to: "/inspire",
            },
         ],
         miniVariant: false,
         right: true,
         rightDrawer: false,
         title: "Vuetify.js",
      };
   },
};
</script>

<style>
/* Works on Firefox */
html {
   overflow-y: auto;
}

* {
   scrollbar-width: thin;
   scrollbar-color: rgba(197, 156, 122, 0.3) transparent;
   -ms-overflow-style: none;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
   width: 3px;
}

*::-webkit-scrollbar-track {
   background: transparent;
}

*::-webkit-scrollbar-thumb {
   background-color: rgba(139, 136, 134, 0.3);
   border-radius: 20px;
}
</style>
