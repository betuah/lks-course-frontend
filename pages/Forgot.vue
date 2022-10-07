<template>
   <div class="d-flex fill-height">
      <div
         class="col-12 col-md-4 pa-0 d-flex flex-column mx-auto my-auto justify-center align-center"
      >
         <div
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-10 mt-6">
               <div class="d-flex justify-center align-center">
                  <span class="text-h5 textPrimary--text">
                     Forgot Password
                  </span>
               </div>
               <div class="d-flex flex-row justify-center align-center my-4">
                  <span class="text-caption font-weight-light text-center"
                     >Enter your registered email and we'll send you
                     instructions on how to reset your password.</span
                  >
               </div>
               <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="submitForm"
                  class="d-flex flex-column flex-grow-1"
               >
                  <v-text-field
                     v-model="email"
                     name="email"
                     color="primary"
                     prepend-inner-icon="email"
                     label="Email"
                     :rules="emailRules"
                     class="rounded-lg text-caption"
                     placeholder="example@domain.com"
                     required
                     hide-details="auto"
                     dense
                     outlined
                  ></v-text-field>
                  <v-btn
                     class="mt-5 rounded-lg text-capitalize font-weight-bold"
                     block
                     :color="loading ? 'grey lighten-2' : 'primary'"
                     type="submit"
                     :loading="loading"
                     :depressed="loading"
                  >
                     Send
                  </v-btn>
               </v-form>
            </div>
         </div>
         <div class="my-5">
            <span class="text-caption font-weight-light"
               >Build with Love from
               <span class="font-weight-bold accent--text">Commetech</span>
               &copy; Copyright {{ new Date().getFullYear() }}</span
            >
         </div>
      </div>
   </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
   layout: "auth",
   components: {
      Icon,
   },
   auth: false,
   data() {
      return {
         loading: false,
         valid: true,
         remember: false,
         email: "",
         emailRules: [
            (v) => !!v || "E-mail is required!",
            (v) => /.+@.+\..+/.test(v) || "Email format is not valid!",
         ],
      };
   },
   mounted() {
      if (this.$auth.loggedIn) {
         this.$router.push("/course");
      }
   },
   methods: {
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      async submitForm() {
         if (this.$refs.form.validate()) {
            this.loading = true;
            try {
               const response = await this.$axios.post("/forgot", {
                  email: this.email,
               });
               if (response.data.success) {
                  this.showNotif(
                     "success",
                     "Reset mail was sent. Please check your email!"
                  );
                  this.$router.push("/login");
               } else {
                  this.showNotif("error", `${response.data.message}`);
               }

               this.loading = false;
            } catch (err) {
               this.loading = false;
               this.showNotif("error", `Internal Server Error!`);
            }
         }
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
</style>
