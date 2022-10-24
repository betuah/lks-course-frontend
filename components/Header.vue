<template>
   <div>
      <div
         class="col-12 pa-0 tw-bg-calmBlue/90 tw-h-full tw-rounded-2xl tw-shadow-lg"
      >
         <div
            class="tw-bg-[url('/pattern/building.png')] fill-height tw-w-full tw-bg-cover tw-bg-center tw-rounded-2xl"
         >
            <div class="col-12 pa-0 tw-bg-calmBlue/50 tw-h-full tw-rounded-2xl">
               <div class="d-flex col-12 pa-10">
                  <div class="col-8 d-flex flex-column">
                     <h5 class="white--text font-weight-bold text-h4 mb-3">
                        Welcome and Congratulation
                     </h5>
                     <p class="white--text text-body-2">
                        If Your see this page you have been success to complete
                        stage 1 of 3 stage to making this
                        <span class="font-weight-bold font-italic"
                           >Course App</span
                        >
                        completely works. This application is an example course
                        app that uses microservices using the rest API to be
                        able to communicate with the other backend services like
                        <a
                           href="https://github.com/betuah/lks-course-catalog"
                           target="_blank"
                           ><span class="font-weight-bold font-italic"
                              >course catalog service</span
                           ></a
                        >
                        and
                        <a
                           href="https://github.com/betuah/lks-course-order"
                           target="_blank"
                           ><span class="font-weight-bold font-italic"
                              >course order service</span
                           ></a
                        >.
                     </p>
                     <div class="col-4 pa-0 mt-3">
                        <div
                           @click="lksdoc()"
                           class="tw-rounded-3xl tw-shadow-md tw-bg-yellow-400 py-2 px-4 d-flex flex-column align-center justify-center hover:tw-bg-gray-500 hover:tw-text-white tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer"
                        >
                           <span class="text-subtitle-2 font-weight-bold"
                              >LKS Document 2</span
                           >
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div class="col-12 pa-0 tw-bg-gray-600/100 tw-h-full tw-rounded-2xl">
         <!-- <div
            class="tw-bg-[url('/pattern/gaming.svg')] tw-bg-opacity-10 fill-height tw-w-full tw-bg-cover tw-bg-center tw-rounded-2xl"
         > -->
         <div
            class="col-12 pa-0 mt-7 mb-1 tw-rounded-2xl tw-shadow-xl px-6 py-0"
         >
            <div class="col-12 pa-0 px-2 col-md-6 d-flex flex-row">
               <NuxtLink
                  to="/"
                  :class="`col-6 col-md-4 px-2 pa-0 d-flex flex-row justify-center align-center tw-transition-all tw-duration-200 tw-ease-in-out ${
                     $nuxt.$route.path == '/' &&
                     'tw-border-b-2 tw-border-yellow-400'
                  }`"
               >
                  <div
                     :class="`py-4 tw-text-md tw-cursor-pointer hover:tw-text-yellow-400 hover:tw-font-bold tw-transition-all tw-duration-200 tw-ease-in-out ${
                        $nuxt.$route.path == '/'
                           ? 'tw-text-yellow-400 tw-font-bold'
                           : 'tw-text-white'
                     }`"
                  >
                     Course Catalog
                  </div>
               </NuxtLink>
               <NuxtLink
                  to="/addCourse"
                  :class="`col-6 col-md-4 px-2 pa-0 d-flex flex-row justify-center align-center tw-transition-all tw-duration-200 tw-ease-in-out ${
                     $nuxt.$route.path == '/addCourse' &&
                     'tw-border-b-2 tw-border-yellow-400'
                  }`"
               >
                  <div
                     :class="`py-4 tw-text-md tw-cursor-pointer hover:tw-text-yellow-400 hover:tw-font-bold tw-transition-all tw-duration-200 tw-ease-in-out ${
                        $nuxt.$route.path == '/addCourse'
                           ? 'tw-text-yellow-400 tw-font-bold'
                           : 'tw-text-white'
                     }`"
                  >
                     Add Catalog
                  </div>
               </NuxtLink>
               <NuxtLink
                  to="/order"
                  :class="`col-6 col-md-4 px-2 pa-0 d-flex flex-row justify-center align-center tw-transition-all tw-duration-200 tw-ease-in-out ${
                     $nuxt.$route.path == '/order' &&
                     'tw-border-b-2 tw-border-yellow-400'
                  }`"
               >
                  <div
                     :class="`py-4 tw-text-md tw-cursor-pointer hover:tw-text-yellow-400 hover:tw-font-bold tw-transition-all tw-duration-200 tw-ease-in-out ${
                        $nuxt.$route.path == '/order'
                           ? 'tw-text-yellow-500 tw-font-bold'
                           : 'tw-text-white'
                     }`"
                  >
                     Order Data
                  </div>
               </NuxtLink>
            </div>
         </div>
         <!-- </div> -->
      </div>
   </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
   components: {
      Icon,
   },
   data() {
      return {
         tab: null,
         alert: {
            visible: false,
            type: "",
            massage: "",
         },
         loading: false,
         valid: true,
         remember: false,
         email: "",
         emailRules: [
            (v) => !!v || "E-mail is required!",
            (v) => /.+@.+\..+/.test(v) || "Email format is not valid!",
         ],
         password: "",
         passwordShow: false,
         passwordRules: [(v) => !!v || "Password is required!"],
      };
   },
   compute: {
      route_path() {
         console.log($nuxt.$route.path);
         return $nuxt.$route.path;
      },
   },
   methods: {
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      showAlert(type, message) {
         this.alert.visible = true;
         this.alert.type = type;
         this.alert.message = message;
      },
      clearAlert() {
         this.alert = {
            visible: false,
            type: "",
            massage: "",
         };
      },
      lksdoc: () => {
         window.open("https://pusatprestasinasional.kemdikbud.go.id/");
      },
   },
};
</script>

<style>
.v-text-field--outlined .v-label,
.v-input__slot {
   font-size: 14px !important;

   /* color: blueviolet; */
}

.v-text-field--outlined .v-icon {
   font-size: 16px !important;
}

.v-application--is-ltr .v-text-field .v-input__prepend-inner {
   padding-right: 7px !important;
}

#custom-tab-items {
   background-color: transparent !important;
}
</style>
