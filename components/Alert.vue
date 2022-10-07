<template>
   <v-alert
      v-model="show"
      dismissible
      :color="color"
      border="left"
      elevation="0"
      :icon="icon"
      rounded="lg"
      dark
   >
      <span class="text-caption">{{ message }}</span>
   </v-alert>
</template>

<script>
export default {
   props: ["visible", "type", "message"],
   computed: {
      show: {
         get() {
            return this.visible;
         },
         set(val) {
            return this.$emit("visible", val);
         },
      },
      color() {
         switch (this.type) {
            case "success":
               return "success";

            case "info":
               return "light-blue";

            case "warning":
               return "warning";

            case "error":
               return "error";
         }
      },
      icon() {
         switch (this.type) {
            case "success":
               return "check_circle";

            case "info":
               return "info";

            case "warning":
               return "warning";

            case "error":
               return "error";
         }
      },
   },
};
</script>
