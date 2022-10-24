<template>
   <div class="col-12 pa-0 d-flex flex-row mt-3">
      <div class="col-12 col-md-12 pa-0">
         <div
            class="col-12 pa-0 d-flex flex-row align-center justify-start tw-rounded-2xl tw-shadow-md py-5 px-4 white"
         >
            <div class="d-flex flex-column align-start">
               <div class="d-flex flex-row justify-center align-center">
                  <v-btn
                     small
                     icon
                     color="white"
                     class="d-flex d-md-none tw-bg-accent/80 mr-3"
                     @click="$router.go(-1)"
                  >
                     <font-awesome-icon
                        icon="angle-left"
                        class="tw-text-xs white--text"
                     />
                  </v-btn>
                  <span class="text-h5 font-weight-medium textPrimary--text"
                     >Order Data</span
                  >
               </div>
               <span class="text-caption grey--text"
                  >If the frontend connect to the order service the data will
                  show here.
               </span>
            </div>
         </div>
         <div
            class="col-12 mt-4 px-4 py-4 d-flex flex-column tw-shadow-md tw-rounded-2xl tw-bg-white"
         >
            <v-simple-table>
               <template v-slot:default>
                  <thead>
                     <tr>
                        <th class="text-left">OrderID</th>
                        <th class="text-left">Item</th>
                        <th class="text-left">Bank</th>
                        <th class="text-left">Payment Method</th>
                        <th class="text-left">Amount</th>
                        <th class="text-left">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-if="cartData.length < 1 && !loading">
                        <td colspan="6">
                           <div
                              class="d-flex flex-column justify-center align-center"
                           >
                              <span class="text-caption font-weight-bold"
                                 >Data not available.</span
                              >
                           </div>
                        </td>
                     </tr>
                     <tr v-if="loading">
                        <td colspan="6">
                           <div
                              class="d-flex flex-column justify-center align-center"
                           >
                              <span class="text-caption font-weight-bold"
                                 >Loading...</span
                              >
                           </div>
                        </td>
                     </tr>
                     <tr v-for="(item, index) in cartData" :key="index">
                        <td>{{ item.order_id }}</td>
                        <td>
                           <span v-for="(data, i) in item.item" :key="i">
                              {{ data.course_id }},
                           </span>
                        </td>
                        <td>{{ item.bank }}</td>
                        <td>{{ item.payment_method }}</td>
                        <td>Rp. {{ item.amount }}</td>
                        <td>
                           <div
                              @click="deleteOrder(item.order_id)"
                              class="tw-rounded-lg tw-shadow-md tw-bg-lightRed py-1 px-4 d-flex flex-column align-center justify-center hover:tw-bg-gray-500 hover:tw-text-white tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer"
                           >
                              <span
                                 class="text-caption white--text font-weight-bold"
                                 >Delete</span
                              >
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </template>
            </v-simple-table>
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
         tab: null,
         alert: {
            visible: false,
            type: "",
            massage: "",
         },
         loading: false,
         loadingDelete: false,
         cartData: [],
      };
   },
   async created() {
      await this.getOrder();
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
      async getOrder() {
         try {
            this.loading = true;
            this.catalogData = [];
            const res = await this.$axios.get(
               `${process.env.NUXT_ENV_API_URL}/api/v1/order`
            );

            const resData = res.data;
            if (resData.status == "OK") {
               this.cartData = resData.data;
            } else {
               this.showNotif("warning", "Ops something wrong");
            }
            this.loading = false;
         } catch (error) {
            if (error.response) {
               const errData = error.response.data;
               // this.showNotif("warning", `${errData.error.message}`);
            } else {
               this.showNotif("error", "Internal Server Error.");
            }
            this.loading = false;
            this.cartData = [];
         }
      },
      async deleteOrder(id) {
         try {
            this.loadingDelete = true;
            this.catalogData = [];
            const res = await this.$axios.delete(
               `${process.env.NUXT_ENV_API_URL}/api/v1/order/${id}`
            );
            const resData = res.data;
            if (resData.status == "OK") {
               this.getOrder();
               this.showNotif("Success", resData.message);
            }
            this.loadingDelete = false;
         } catch (error) {
            if (error.response) {
               const errData = error.response.data;
               this.showNotif("warning", `${errData.error.message}`);
            } else {
               this.showNotif("error", "Internal Server Error.");
            }
            this.loadingDelete = false;
            this.cartData = [];
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

#custom-tab-items {
   background-color: transparent !important;
}
</style>
