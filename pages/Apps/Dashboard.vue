<template>
   <div class="tw-h-full d-flex flex-column">
      <div class="mx-auto my-auto">
         <span class="text-h5 textPrimary--text">Build your own dashboard</span>
      </div>
   </div>
</template>

<script>
export default {
   data: () => ({
      test: "",
   }),
   async created() {
      if (this.$auth.loggedIn) {
      }
   },
   methods: {
      async getData() {
         try {
            this.test = await this.$axios.get("/test");
         } catch (error) {
            console.log(error);
         }
      },
   },
};
</script>
