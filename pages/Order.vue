<template>
   <div class="d-flex flex-column mt-3">Order</div>
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

#custom-tab-items {
   background-color: transparent !important;
}
</style>
