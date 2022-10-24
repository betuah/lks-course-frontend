<template>
   <div class="col-12 pa-0 d-flex flex-row mt-3">
      <div class="col-12 col-md-7 pa-0 pr-md-2">
         <div
            class="col-12 px-4 py-4 d-flex flex-column tw-shadow-md tw-rounded-2xl tw-bg-white"
         >
            <div v-if="catalogLoading" class="py-2 d-flex flex-column mx-auto">
               <div class="text-caption align-center justify-center grey--text">
                  Loading catalog...
               </div>
            </div>
            <div
               v-if="catalogError"
               class="text-caption mt-50 align-center mx-auto grey--text"
            >
               Load Catalog Data Error.
            </div>

            <div
               v-if="
                  catalogData.length === 0 && !catalogLoading && !catalogError
               "
               class="d-flex flex-column justify-center align-center"
            >
               No course available.
            </div>

            <div v-if="catalogData.length > 0" class="d-flex flex-column py-3">
               <div v-for="(item, index) in catalogData" :key="index">
                  <Course
                     :data="item"
                     :addCart="addCart"
                     :deleteCourse="deleteCourse"
                     :class="index > 0 && `mt-4`"
                  />
               </div>
            </div>
         </div>
      </div>

      <div class="col-12 col-md-5 pa-0 pl-md-2">
         <div
            class="px-4 py-4 d-flex flex-column tw-shadow-md tw-rounded-2xl tw-bg-white"
         >
            <span class="tw-text-lg font-weight-bold">Cart</span>
            <v-divider class="my-3"></v-divider>
            <v-simple-table>
               <template v-slot:default>
                  <thead>
                     <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Qty</th>
                        <th class="text-left">Price</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="(item, index) in cartData" :key="index">
                        <td>{{ item.title }}</td>
                        <td>{{ item.qty }}</td>
                        <td>Rp {{ item.price }}</td>
                        <td>
                           <div
                              @click="decreaseQty(item.id)"
                              class="tw-rounded-lg tw-shadow-md tw-bg-lightRed py-1 px-4 d-flex flex-column align-center justify-center hover:tw-bg-gray-500 hover:tw-text-white tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer"
                           >
                              <span
                                 class="text-caption white--text font-weight-bold"
                                 >-</span
                              >
                           </div>
                        </td>
                     </tr>
                     <tr class="tw-bg-gray-100">
                        <td colspan="2">
                           <div class="d-flex flex-row justify-center">
                              <span
                                 class="text-subtitle-2 font-weight-bold text-center"
                                 >Amount</span
                              >
                           </div>
                        </td>
                        <td colspan="2">
                           <span class="font-weight-bold">Rp {{ total }}</span>
                        </td>
                     </tr>
                  </tbody>
               </template>
            </v-simple-table>
            <div>
               <div
                  @click="buyCourse()"
                  class="tw-rounded-lg my-4 tw-shadow-md tw-bg-yellow-400 py-1 px-4 d-flex flex-column align-center justify-center hover:tw-bg-gray-500 hover:tw-text-white tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer"
               >
                  <span class="text-caption font-weight-bold">{{
                     cartLoading ? "Loading..." : "Buy and Enroll"
                  }}</span>
               </div>
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
         tab: null,
         alert: {
            visible: false,
            type: "",
            massage: "",
         },
         loading: false,
         catalogLoading: false,
         catalogError: false,
         catalogData: [],
         cartLoading: false,
         cartError: false,
         cartData: [],
      };
   },
   computed: {
      total() {
         return this.cartData.reduce((a, b) => a + (b["price"] || 0), 0);
      },
   },
   async created() {
      await this.getCourse();
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
      sum(key) {
         return this.reduce((a, b) => a + (b[key] || 0), 0);
      },
      randomNumber(min, max) {
         return Math.floor(Math.random() * (max - min + 1) + min);
      },
      async getCourse() {
         try {
            this.catalogLoading = true;
            this.catalogData = [];
            const res = await this.$axios.get(
               `${process.env.NUXT_ENV_API_URL}/api/v1/course`
            );

            const resData = res.data;
            if (resData.status == "SUCCESS") {
               this.catalogData = resData.data;
            } else {
               this.showNotif("warning", resData.message);
            }
            this.catalogLoading = false;
         } catch (error) {
            this.catalogError = true;
            this.catalogLoading = false;
            this.catalogData = [];
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async addCart(item) {
         const index = this.cartData.findIndex((object) => {
            return object.id === item.courseId;
         });

         const itemArr = {
            id: item.courseId,
            title: item.courseName,
            price: item.price,
            qty: 1,
         };

         if (index !== -1) {
            this.cartData[index].qty++;
            this.cartData[index].price =
               this.cartData[index].price * (this.cartData[index].qty + 1);
         } else {
            this.cartData.push(itemArr);
         }
      },
      async decreaseQty(id) {
         const index = this.cartData.findIndex((object) => {
            return object.id === id;
         });

         if (index !== -1) {
            if (this.cartData[index].qty == 1) {
               this.cartData.splice(index, 1);
            } else {
               this.cartData[index].qty--;
            }
         }
      },
      async buyCourse() {
         try {
            this.cartLoading = true;
            const items = this.cartData.map((i) => {
               return {
                  course_id: i.id,
                  price: i.price,
                  amount: i.price,
                  qty: i.qty,
               };
            });

            const order = {
               order_id: `ODR_${this.randomNumber(1, 1000)}`,
               items: items,
               payment_method: "virtual_account",
               bank: "mandiri",
            };

            await this.$axios.post(
               `${process.env.NUXT_ENV_API_URL}/api/v1/order`,
               order
            );

            this.cartData = [];

            this.showNotif("success", `Buy course success..`);

            this.cartLoading = false;
         } catch (e) {
            if (e.response) {
               this.showNotif("error", `${e.response.message}`);
            } else {
               this.showNotif("error", `Cannot connect to service`);
            }
            this.cartLoading = false;
            this.cartError = true;
         }
      },
      async deleteCourse(id) {
         try {
            this.loadingDelete = true;
            const res = await this.$axios.delete(
               `${process.env.NUXT_ENV_API_URL}/api/v1/course/${id}`
            );
            const resData = res.data;
            if (resData.status == "SUCCESS") {
               this.getCourse();
               this.showNotif("Success", "delete course success");
            }
            this.loadingDelete = false;
         } catch (error) {
            if (error.response) {
               const errData = error.response.data;
               this.showNotif("warning", `${errData.error.message}`);
            } else {
               this.showNotif(
                  "error",
                  "Ops something wrong, cannot connect to server"
               );
            }
            this.loadingDelete = false;
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
