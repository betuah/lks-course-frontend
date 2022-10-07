<template>
   <div class="d-flex fill-height">
      <div
         class="col-12 col-md-3 pa-0 d-flex flex-column mx-auto my-auto justify-center align-center"
      >
         <div
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-4 mt-4">
               <div class="d-flex flex-column justify-center align-center">
                  <span class="text-h5 success--text font-weight-bold mb-1">
                     Activation Success
                  </span>
                  <span class="text-caption text-center textPrimary--text mb-4"
                     >Your account is active. You can sign in now.</span
                  >
                  <v-btn
                     depressed
                     color="primary"
                     class="textPrimary--text text-capitalize text-body-2 font-weight-bold"
                     @click="$router.push('/login')"
                  >
                     Sign In
                  </v-btn>
               </div>
            </div>
         </div>

         <div class="my-5">
            <span class="text-caption font-weight-light"
               >Build with Love from
               <span class="font-weight-bold accent--text">Millenial Dev</span>
               &copy; Copyright {{ new Date().getFullYear() }}</span
            >
         </div>
      </div>
   </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
   components: {
      Icon,
   },
   auth: "guest",
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
</style>
