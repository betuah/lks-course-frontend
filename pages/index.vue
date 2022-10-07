<template>
   <v-container fill-height fluid class="pa-0 ma-0"> </v-container>
</template>

<script>
export default {
   created() {
      if (this.$auth.loggedIn) {
         this.$router.push("/apps/dashboard");
      } else {
         this.$router.push("/login");
      }
   },
};
</script>
