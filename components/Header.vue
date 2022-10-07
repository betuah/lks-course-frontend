<template>
   <v-app-bar
      elevation="0"
      color="white"
      class="white tw-border tw-border-gray-400"
   >
      <v-btn
         v-if="$vuetify.breakpoint.xsOnly"
         icon
         plain
         :ripple="false"
         class="mr-2"
         @click="showHideNav"
      >
         <iconify
            icon="iconoir:menu"
            class="tw-text-xl hover:tw-text-primary tw-transition-all tw-ease-out tw-duration-300"
         />
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon plain :ripple="false" small class="mr-4">
         <iconify
            icon="heroicons-solid:light-bulb"
            class="tw-text-xl hover:tw-text-primary tw-transition-all tw-ease-out tw-duration-300"
         />
      </v-btn>
      <v-btn icon plain :ripple="false" small class="mr-5">
         <iconify
            icon="clarity:notification-solid"
            class="tw-text-base hover:tw-text-primary tw-transition-all tw-ease-out tw-duration-300"
         />
      </v-btn>

      <v-menu open-on-hover rounded="lg" offset-y>
         <template v-slot:activator="{ on, attrs }">
            <div class="d-flex flex-row" v-bind="attrs" v-on="on">
               <v-avatar size="35">
                  <img
                     :src="
                        $auth.user.photo_profile ||
                        `https://cdn.vuetifyjs.com/images/john.jpg`
                     "
                     alt="John"
                  />
               </v-avatar>
               <div class="d-none d-md-flex flex-column ml-3">
                  <span
                     class="text-caption font-weight-bold textPrimary--text"
                     >{{ $auth.user.fullName }}</span
                  >
                  <span class="tw-text-2xs grey--text">{{
                     $auth.user.email
                  }}</span>
               </div>
               <div class="d-none d-md-flex ml-2 align-self-center">
                  <font-awesome-icon
                     icon="angle-down"
                     transform="shrink-5"
                     class="tw-text-sm textPrimary--text"
                  />
               </div>
            </div>
         </template>

         <div class="d-flex flex-column">
            <v-list dense>
               <v-divider></v-divider>
               <v-list-item-group
                  v-for="itemGroup in itemsGroup"
                  :key="itemGroup.key"
                  color="primary"
               >
                  <div v-for="(item, i) in itemGroup.items" :key="i">
                     <v-hover v-slot="{ hover }">
                        <v-list-item
                           class="d-flex flex-row align-center"
                           @click="
                              item.link == 'logout'
                                 ? signout()
                                 : linkTo(item.link)
                           "
                        >
                           <div class="mr-2">
                              <iconify
                                 :icon="item.icon"
                                 :class="`tw-text-sm ${
                                    hover ? 'primary--text' : 'grey--text'
                                 }`"
                              />
                           </div>
                           <v-list-item-title
                              v-text="item.text"
                              :class="
                                 hover ? 'primary--text' : 'textPrimary--text'
                              "
                           ></v-list-item-title>
                           <v-spacer></v-spacer>
                           <v-avatar
                              v-if="item.badge"
                              size="23"
                              color="secondary"
                           >
                              <span class="white--text text-caption">2</span>
                           </v-avatar>
                        </v-list-item>
                     </v-hover>
                  </div>
                  <v-divider></v-divider>
               </v-list-item-group>
            </v-list>
         </div>
      </v-menu>
   </v-app-bar>
</template>

<script>
export default {
   name: "Header",
   data: () => ({
      userData: null,
      itemsGroup: [
         {
            key: 1,
            items: [
               {
                  key: 2,
                  icon: "eva:message-circle-fill",
                  text: "Message",
                  link: "/cart",
               },
               {
                  key: 3,
                  icon: "icon-park-solid:bill",
                  text: "Billing",
                  link: "/certificate",
               },
            ],
         },
         {
            key: 2,
            items: [
               {
                  key: 5,
                  icon: "ic:baseline-manage-accounts",
                  text: "Profile",
                  link: "/user/profile",
               },
               {
                  key: 6,
                  icon: "carbon:help-filled",
                  text: "Help & Support",
                  link: "/user/purchase-history",
               },
            ],
         },
         {
            key: 3,
            items: [
               {
                  key: 7,
                  icon: "fa-solid:sign-out-alt",
                  text: "Log Out",
                  link: "logout",
               },
            ],
         },
      ],
   }),
   methods: {
      showHideNav() {
         return this.$store.commit("navBar/CHANGE_NAV");
      },
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      linkTo(link) {
         this.$router.push(link);
      },
      async signout() {
         try {
            const refresh_token = await this.$auth.strategy.refreshToken.get();
            await this.$auth.logout({ data: { refresh_token } });
            this.showNotif("info", "You're now logged out!");
         } catch (error) {
            this.showNotif("error", "Internal Server Error!");
         }
      },
   },
};
</script>

<style>
.v-toolbar__content {
   border-bottom: 0.5px solid rgb(198, 198, 198);
}
</style>
