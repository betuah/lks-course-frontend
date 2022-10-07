<template>
   <div class="d-flex flex-column fill-height justify-center align-center">
      <span class="text-h4 text-center" v-if="error.statusCode === 404">
         {{ pageNotFound }}
      </span>
      <span class="text-h2 textPrimary--text font-weight-bold" v-else>
         {{ otherError }}
      </span>
      <NuxtLink to="/" class="text-subtitle-1 accent--text"> Go Back </NuxtLink>
   </div>
</template>

<script>
export default {
   name: "EmptyLayout",
   // layout: $auth.loggedIn ? "default" : "auth",
   props: {
      error: {
         type: Object,
         default: null,
      },
   },
   data() {
      return {
         pageNotFound: "404 Not Found",
         otherError: "An error occurred",
      };
   },
   head() {
      const title =
         this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
      return {
         title,
      };
   },
};
</script>

<style scoped>
h1 {
   font-size: 20px;
}
</style>
