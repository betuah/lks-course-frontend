<template>
   <div class="d-flex fill-height">
      <div
         class="col-12 col-md-3 pa-0 d-flex flex-column mx-auto my-auto justify-center align-center"
      >
         <div
            v-if="validate"
            class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
         >
            <div class="col-12 mb-10 mt-4">
               <div class="d-flex justify-center align-center">
                  <span class="text-h5 textPrimary--text mb-5">
                     Create New
                     <span class="font-weight-bold accent--text">Password</span>
                  </span>
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
                     placeholder="Your new secure password."
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
                     placeholder="Retype your password."
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
                     Create Password
                  </v-btn>
               </v-form>
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
                     v-else
                     class="d-flex flex-column justify-center align-center"
                  >
                     <span class="text-h5 textPrimary--text mb-2">
                        <span class="font-weight-bold error--text"
                           >Invalid</span
                        >
                        Reset Token
                     </span>
                     <span class="text-caption text-center textPrimary--text"
                        >Your activation code is invalid or expired!</span
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
   auth: "guest",
   data() {
      return {
         loading: false,
         loadingPage: false,
         valid: true,
         validate: false,
         expired: false,
         remember: false,
         passwordShow: false,
         code: null,
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
      console.log("asdasd");
      await this.validation(this.$route.query.code);
      this.code = this.$route.query.code;
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
                  code: this.$route.query.code,
                  password: this.form.password,
               };

               const response = await this.$axios.post("/reset", body);
               const resData = response.data;
               this.loading = false;

               if (resData.success) {
                  this.showNotif("success", resData.message);
                  this.$router.push("/login");
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
            const response = await this.$axios.post("/reset/validation", {
               code,
            });
            const resData = response.data;

            if (resData.success) {
               this.validate = true;
            } else {
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
