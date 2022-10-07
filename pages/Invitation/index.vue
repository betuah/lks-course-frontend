<template>
   <div class="d-flex fill-height">
      <div
         class="col-12 col-md-3 pa-0 d-flex flex-column mx-auto my-auto justify-center align-center"
      >
         <div
            v-if="validate == true && complete == true"
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-4 mt-4">
               <div class="d-flex flex-column justify-center align-center">
                  <span class="text-h5 success--text font-weight-bold mb-1">
                     Invitation Confirm
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
         <div
            v-else-if="validate && complete == false"
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-10 mt-4">
               <div class="d-flex flex-column justify-center align-center">
                  <span class="text-h5 textPrimary--text">
                     User
                     <span class="font-weight-bold accent--text"
                        >invitation</span
                     >
                  </span>
                  <span class="text-caption textPrimary--text mb-5"
                     >One more step to activate your account.</span
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
                     v-model="form.password"
                     name="password"
                     color="primary"
                     prepend-inner-icon="lock"
                     :append-icon="
                        passwordShow ? 'visibility' : 'visibility_off'
                     "
                     :rules="rules.password"
                     :type="passwordShow ? 'text' : 'password'"
                     label="New Password"
                     placeholder="New password."
                     class="rounded-lg text-caption"
                     required
                     outlined
                     hide-details="auto"
                     dense
                     @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                  <v-text-field
                     v-model="form.confirmPassword"
                     name="password"
                     color="primary"
                     prepend-inner-icon="lock"
                     :append-icon="
                        confirmPasswordShow ? 'visibility' : 'visibility_off'
                     "
                     :rules="
                        rules.confirmPassword.concat(passwordConfirmationRule)
                     "
                     :type="confirmPasswordShow ? 'text' : 'password'"
                     label="Confirm Password"
                     placeholder="Confirm password."
                     class="rounded-lg text-caption mt-3"
                     required
                     outlined
                     hide-details="auto"
                     dense
                     @click:append="confirmPasswordShow = !confirmPasswordShow"
                  ></v-text-field>
                  <v-btn
                     class="mt-5 rounded-lg text-capitalize font-weight-bold"
                     block
                     color="primary"
                     type="submit"
                     :loading="loading"
                     :depressed="loading"
                  >
                     Save and Confirm
                  </v-btn>
               </v-form>
            </div>
         </div>
         <div
            v-else-if="validate == true && expired == true"
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-4 mt-4">
               <div class="d-flex flex-column justify-center align-center">
                  <span class="text-h5 textPrimary--text mb-2">
                     invitation code
                     <span class="font-weight-bold error--text">Expired</span>
                  </span>
                  <span class="text-caption text-center textPrimary--text"
                     >Your invitation code is expired. Please contact your
                     administrator to resend new invitation.</span
                  >
               </div>
            </div>
         </div>
         <div
            v-else
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-4 mt-4">
               <div class="d-flex flex-column justify-center align-center">
                  <span
                     v-if="loadingPage"
                     class="text-caption text-center textPrimary--text"
                     >Loading...</span
                  >
                  <div
                     v-if="validate == false && loadingPage == false"
                     class="d-flex flex-column justify-center align-center"
                  >
                     <span class="text-h5 textPrimary--text mb-2">
                        <span class="font-weight-bold error--text"
                           >Invalid</span
                        >
                        Invitation Code
                     </span>
                     <span class="text-caption text-center textPrimary--text"
                        >Your invitation code is invalid. Please contact your
                        administrator!</span
                     >
                  </div>
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
   layout: "auth",
   data() {
      return {
         loading: false,
         loadingPage: false,
         valid: true,
         validate: false,
         expired: false,
         complete: false,
         code: null,
         remember: false,
         passwordShow: false,
         confirmPasswordShow: false,
         form: {
            password: "",
            confirmPassword: "",
         },
         rules: {
            password: [(v) => !!v || "Password is required!"],
            confirmPassword: [(v) => !!v || "Confirm Password is required!"],
         },
      };
   },
   async created() {
      this.loadingPage = true;
   },
   async mounted() {
      await this.validation(this.$route.query.code);
   },
   computed: {
      passwordConfirmationRule() {
         return () =>
            this.form.password === this.form.confirmPassword ||
            "Password must match";
      },
   },
   methods: {
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      async submitForm() {
         if (this.$refs.form.validate()) {
            try {
               this.loading = true;
               const body = {
                  code: this.code,
                  password: this.form.password,
               };

               const response = await this.$axios.post(
                  "/member/invitation",
                  body
               );
               const resData = response.data;
               this.loading = false;

               if (resData.success) {
                  this.showNotif("You can signin now.", resData.message);
                  this.$router.push("/invitation/success");
               } else {
                  this.showNotif("error", resData.message);
               }
            } catch (err) {
               this.loading = false;
               this.showNotif("error", "Internal Server Error.");
            }
         }
      },
      async validation(code) {
         try {
            this.loadingPage = true;
            const response = await this.$axios.post(
               "/member/invitation/validation",
               { code }
            );
            const resData = response.data;

            if (resData.success) {
               if (resData.success_code == "INVITATION_DIRECT") {
                  this.validate = true;
                  this.complete = true;
                  this.loadingPage = false;
               } else {
                  this.validate = true;
                  this.code = code;
                  this.loadingPage = false;
               }
            } else {
               if (resData.error_code == "ERR_INVITATION_EXPIRED") {
                  this.expired = true;
               }
               this.validate = false;
               this.loadingPage = false;
            }
         } catch (error) {
            this.validate = false;
            this.loadingPage = false;
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
