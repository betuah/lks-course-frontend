<template>
   <v-snackbar
      v-model="visible"
      timeout="5000"
      :color="color"
      right
      top
      rounded="lg"
   >
      <div class="d-flex flex-row py-1">
         <v-icon small>
            {{ icon }}
         </v-icon>
         <div v-html="message" class="text-caption ml-4">
            <!-- {{ message }} -->
         </div>
      </div>

      <template v-slot:action="{ attrs }">
         <v-btn text v-bind="attrs" small @click="visible = false">
            Close
         </v-btn>
      </template>
   </v-snackbar>
</template>

<script>
export default {
   data: () => ({
      // visible: false,
      // notif: {
      //    color: "success",
      //    icon: "check_circle",
      //    message: ``,
      // },
   }),
   computed: {
      visible: {
         get() {
            return this.$store.state.notif.show;
         },
         set(val) {
            return this.$store.commit("notif/NOT_SHOW", val);
         },
      },
      color() {
         return this.$store.state.notif.color;
      },
      icon() {
         return this.$store.state.notif.icon;
      },
      message() {
         return this.$store.state.notif.message;
      },
   },
};
</script>
