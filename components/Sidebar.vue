<template>
   <v-navigation-drawer
      v-model="drawer"
      floating
      :absolute="breakpoint"
      class="bgSecondary"
   >
      <div class="tw-flex tw-flex-col">
         <div class="md:tw-h-16 tw-h-14 tw-border-b"></div>
         <div v-for="item in menus" :key="item.key" class="tw-w-full tw-mt-2">
            <div v-if="item.type === 'label'" class="pt-3 pb-2 px-10">
               <span
                  class="tw-text-sm textPrimary--text font-weight-bold pa-0"
                  >{{ item.label }}</span
               >
            </div>
            <div v-if="item.type === 'item'" class="py-1 px-10">
               <NuxtLink :to="`${item.link}`">
                  <div
                     :class="`d-flex flex-row hover:tw-text-accent hover:tw-font-bold tw-text-textPrimary tw-transition-all tw-duration-200 tw-ease-in-out ${
                        $nuxt.$route.path == item.link &&
                        'tw-text-accent tw-font-bold'
                     }`"
                  >
                     <div class="mr-3">
                        <iconify :icon="item.icon" class="tw-text-lg" />
                     </div>
                     <span class="tw-text-sm">{{ item.label }}</span>
                  </div>
               </NuxtLink>
            </div>
         </div>
      </div>
   </v-navigation-drawer>
</template>

<script>
import { menus } from "../constant/menu";

export default {
   data: () => ({
      menus: menus,
   }),
   computed: {
      breakpoint() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               this.$store.commit("navBar/SET_NAV", false);
               return true;
            case "sm":
               this.$store.commit("navBar/SET_NAV", false);
               return true;
            case "md":
               this.$store.commit("navBar/SET_NAV", true);
               return false;
            case "lg":
               this.$store.commit("navBar/SET_NAV", true);
               return false;
            case "xl":
               this.$store.commit("navBar/SET_NAV", true);
               return false;
         }
      },
      permanent() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return false;
            case "sm":
               return false;
            case "md":
               return true;
            case "lg":
               return true;
            case "xl":
               return true;
         }
      },
      drawer: {
         get() {
            return this.$store.state.navBar.status;
         },
         set(val) {
            return this.$store.commit("navBar/SET_NAV", val);
         },
      },
   },
};
</script>
