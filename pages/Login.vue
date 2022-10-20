<template>
   <!-- <div class="d-flex fill-height"> -->
   <div
      class="tw-bg-[url('https://satucloud.com/patterns/motpath.svg')] fill-height tw-w-full tw-bg-cover tw-bg-repeat tw-bg-center"
   >
      <div class="d-flex tw-bg-black/5 tw-h-full">
         <div
            class="col-12 col-md-3 pa-0 d-flex flex-column mx-auto my-auto justify-center align-center"
         >
            <div
               class="col-12 pa-0 d-flex flex-column justify-center align-center justify-start tw-rounded-2xl tw-shadow-lg px-4 white"
            >
               <div class="col-12 mb-10 mt-6">
                  <div class="d-flex justify-center align-center">
                     <span class="text-h5 font-weight-medium textPrimary--text">
                        <span class="font-weight-bold accent--text">Hey</span>,
                        Welcome Back!
                     </span>
                  </div>
                  <div class="d-flex flex-row justify-center align-center">
                     <span
                        class="text-caption textPrimary--text font-weight-bold"
                        >Sign In</span
                     >
                     <span class="text-caption font-weight-light text-center"
                        >&nbsp;to your account and enjoy the services.</span
                     >
                  </div>
                  <v-divider v-if="!loading" class="my-6"></v-divider>
                  <v-progress-linear
                     v-if="loading"
                     color="primary"
                     indeterminate
                     rounded
                     height="2"
                     :active="loading"
                     class="my-6"
                  ></v-progress-linear>
                  <v-form
                     ref="form"
                     v-model="valid"
                     lazy-validation
                     @submit.prevent="submitForm"
                     class="d-flex flex-column flex-grow-1"
                  >
                     <Alert
                        :visible="alert.visible"
                        :type="alert.type"
                        :message="alert.message"
                     />
                     <v-text-field
                        v-model="email"
                        name="email"
                        color="primary"
                        prepend-inner-icon="fa-envelope"
                        :rules="emailRules"
                        label="Email"
                        class="rounded-lg text-caption"
                        placeholder="example@domain.com"
                        hint="Your email address"
                        required
                        hide-details="auto"
                        dense
                        outlined
                        @change="clearAlert()"
                     >
                     </v-text-field>
                     <v-text-field
                        v-model="password"
                        name="password"
                        color="primary"
                        prepend-inner-icon="fa-solid fa-lock"
                        :append-icon="passwordShow ? 'fa-eye' : 'fa-eye-slash'"
                        :rules="passwordRules"
                        :type="passwordShow ? 'text' : 'password'"
                        label="Password"
                        placeholder="Password"
                        hint="Your secure password."
                        class="rounded-lg text-caption mt-4"
                        required
                        outlined
                        hide-details="auto"
                        dense
                        @click:append="passwordShow = !passwordShow"
                        @change="clearAlert()"
                     ></v-text-field>
                     <div
                        class="d-flex flex-row justify-center align-center mt-2"
                     >
                        <v-checkbox
                           v-model="remember"
                           dense
                           hide-details
                           class="text-caption pa-0 ma-0 shrink"
                        >
                           <template v-slot:label
                              ><div class="tw-text-sm textSecondary--text">
                                 Remember me
                              </div></template
                           >
                        </v-checkbox>
                        <v-spacer></v-spacer>
                        <NuxtLink
                           to="/forgot"
                           class="text-caption text-capitalize textSecondary--text font-weight-bold"
                           >Forgot password?</NuxtLink
                        >
                     </div>
                     <v-btn
                        class="mt-5 rounded-lg text-capitalize font-weight-bold"
                        block
                        :color="loading ? 'grey lighten-2' : 'primary'"
                        type="submit"
                        :loading="loading"
                        :depressed="loading"
                     >
                        Sign In
                        <template v-slot:loader>
                           <div
                              class="d-flex flex-grow-1 ma-0 pa-0 fill-height justify-center"
                           >
                              <span
                                 class="align-self-center text-caption font-weight-bold textPrimary--text"
                                 >Loading...</span
                              >
                           </div>
                        </template>
                     </v-btn>
                  </v-form>
               </div>
            </div>
            <div class="my-5">
               <span class="text-caption font-weight-light"
                  >Build with Love from
                  <span class="font-weight-bold accent--text"
                     >Millenial Dev</span
                  >
                  &copy; Copyright {{ new Date().getFullYear() }}</span
               >
            </div>
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
      async submitForm() {
         if (this.$refs.form.validate()) {
            this.loading = true;
            try {
               const data = {
                  remember: this.remember,
                  email: this.email,
                  password: this.password,
               };

               let response = await this.$auth.loginWith("local", { data });
               if (response) {
                  if (response.data.success) {
                     console.log(this.$auth.user.fullName);
                     this.showNotif(
                        "success",
                        `Welcome back <span class="font-weight-bold">${this.$auth.user.fullName}</span>.`
                     );
                     this.$router.push("/apps/dashboard");
                  } else {
                     this.showAlert("error", `${response.data.message}`);
                  }
               }
               console.log(this.$auth.user);
               this.loading = false;
            } catch (err) {
               this.showNotif("error", "Internal Server Error.");
               this.loading = false;
            }
         } else {
            this.showAlert(
               "error",
               "There are items that require your attention."
            );
         }
      },
      async googleSignIn() {
         try {
            await this.$auth.loginWith("google", {
               params: { prompt: "select_account" },
            });
         } catch (error) {}
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
