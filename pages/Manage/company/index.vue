<template>
   <div class="col-12 pa-5 d-flex flex-column">
      <div
         class="col-12 pa-0 d-flex flex-row align-center justify-start tw-rounded-2xl tw-shadow-md py-5 px-4 white"
      >
         <div class="d-flex flex-column align-start">
            <div class="d-flex flex-row justify-center align-center">
               <span class="text-h5 font-weight-medium textPrimary--text"
                  >Company Settings</span
               >
            </div>
            <span class="text-caption grey--text"
               >Providing company profile information will help us in providing
               better service for your company.
            </span>
         </div>
      </div>
      <v-form
         v-if="form.company_name !== ''"
         ref="form"
         v-model="valid"
         lazy-validation
         @submit.prevent="submitForm"
      >
         <div
            class="mt-5 col-12 pa-0 d-flex flex-column pa-0 tw-rounded-2xl tw-shadow-md py-5 px-4 white"
         >
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text">Logo</span>
                  <span class="text-caption grey--text"
                     >Company logo can be used for reports or application
                     needs.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pl-md-3 pa-0 d-flex flex-row align-self-center"
               >
                  <v-file-input
                     label="Attachment"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     prepend-icon=""
                     accept="image/png, image/jpeg"
                     @change="onLogoUpload"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Upload Logo</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div class="d-flex flex-row tw-h-6 align-center mr-1">
                           <font-awesome-icon
                              icon="image"
                              class="tw-text-xs grey--text"
                           />
                        </div>
                     </template>
                  </v-file-input>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text"
                     >Company Name</span
                  >
                  <span class="text-caption grey--text"
                     >Company name will be use for aplication report, email
                     template and our client data.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.company_name"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Name</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="building"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-text-field>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text">Phone</span>
                  <span class="text-caption grey--text"
                     >Your company's official phone number.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.phone_number"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                     placeholder="021 5555 111 or +62 813 8888 222"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Phone Number</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="address-book"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-text-field>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text">Email</span>
                  <span class="text-caption grey--text"
                     >Your company's official email.</span
                  >
               </div>
               <div
                  class="col012 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.email"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                     placeholder="email@yourcompany.com"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Email</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="envelope"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-text-field>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text"
                     >Website</span
                  >
                  <span class="text-caption grey--text"
                     >Your company's official website.</span
                  >
               </div>
               <div
                  class="col012 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.website"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                     placeholder="www.companysites.com"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Website</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="earth-asia"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-text-field>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text"
                     >Tax Number</span
                  >
                  <span class="text-caption grey--text"
                     >Your company's tax number for tax purpose.</span
                  >
               </div>
               <div
                  class="col012 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.tax_number"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Tax Number</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="percent"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-text-field>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text"
                     >Address</span
                  >
                  <span class="text-caption grey--text"
                     >Your company's address.</span
                  >
               </div>
               <div
                  class="col012 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-textarea
                     v-model="form.address"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Address</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="location-dot"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-textarea>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="col-12 pa-0 py-2 d-flex flex-column">
               <v-btn
                  depressed
                  :loading="loading"
                  type="submit"
                  color="primary"
                  class="font-weight-bold text-capitalize text-caption rounded-lg textPrimary--text align-self-end"
                  >Update Data</v-btn
               >
            </div>
         </div>
      </v-form>
   </div>
</template>

<script>
export default {
   data: () => ({
      form: {
         logo: null,
         company_name: "",
         phone_number: "",
         email: "",
         website: "",
         tax_number: "",
         address: "",
      },
      teams: ["NOC", "CSS"],
      loading: false,
      valid: true,
   }),
   async created() {
      await this.getTeam(this.$store.state.selectedCompany);
      await this.getCompany(this.$store.state.selectedCompany);
   },
   methods: {
      comparator(a, b) {
         return a == b;
      },
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      onLogoUpload(file) {
         this.form.logo = file;
      },
      async getCompany(id) {
         try {
            const companyData = await this.$axios.get(`/company/${id}`);
            const resData = companyData.data;
            if (resData.success) {
               delete resData.data.logo;
               this.form = { ...this.form, ...resData.data };
            } else {
               this.company = null;
            }
         } catch (error) {
            this.company = null;
         }
      },
      async getTeam(id) {
         try {
            const teamData = await this.$axios.get(`/team/${id}`);
            this.teams = teamData.data.data;
         } catch (error) {
            this.teams = null;
         }
      },
      async submitForm() {
         if (this.$refs.form.validate()) {
            const formData = new FormData();
            this.loading = true;

            if (this.form.logo !== null) {
               formData.append("logo", this.form.logo, this.form.logo.name);
               formData.append("company_name", this.form.company_name);
               formData.append("phone_number", this.form.phone_number);
               formData.append("email", this.form.email);
               formData.append("website", this.form.website);
               formData.append("tax_number", this.form.tax_number);
               formData.append("address", this.form.address);
            }

            try {
               const updateData = await this.$axios.put(
                  `/company/${this.$store.state.selectedCompany}`,
                  this.form.logo == null ? this.form : formData
               );
               this.form.logo = null;
               const resData = updateData.data;
               if (resData.success) {
                  this.showNotif("success", `Data has been updated!`);
                  this.form.logo = null;
                  this.loading = false;
               } else {
                  this.showAlert("error", `${resData.data.message}`);
                  this.form.logo = null;
                  this.loading = false;
               }
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
   },
};
</script>
