<template>
   <div class="col-12 pa-0 my-2 d-flex flex-column">
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
                  >Add Course</span
               >
            </div>
            <span class="text-caption grey--text"
               >If the backend catalog service work, you can add the course
               catalog from this form.
            </span>
         </div>
      </div>
      <v-form
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
                  <span class="font-weight-bold textPrimary--text"
                     >Course ID</span
                  >
                  <span class="text-caption grey--text"
                     >Unique ID for course catalog.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.id"
                     label="Picker in menu"
                     outlined
                     dense
                     :rules="rules.id"
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Course ID</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="laptop-code"
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
                     >Course Title</span
                  >
                  <span class="text-caption grey--text"
                     >Course name with maximum 150 character</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.title"
                     outlined
                     dense
                     :rules="rules.title"
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Title</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="bookmark"
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
                     >Course Level</span
                  >
                  <span class="text-caption grey--text"
                     >Course difficult level.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-select
                     v-model="form.level"
                     outlined
                     dense
                     :rules="rules.level"
                     :items="levelList"
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Level</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="chart-simple"
                              class="tw-text-xs"
                           />
                        </div>
                     </template>
                  </v-select>
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
                     >Cover Image</span
                  >
                  <span class="text-caption grey--text"
                     >This is will be display on catalog cover.</span
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
                     :rules="rules.coverImage"
                     @change="onLogoUpload"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Upload Cover Image</div>
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
                     >Category</span
                  >
                  <span class="text-caption grey--text">Course category</span>
               </div>
               <div
                  class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.category"
                     outlined
                     dense
                     :rules="rules.title"
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Category</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon icon="tags" class="tw-text-xs" />
                        </div>
                     </template>
                  </v-text-field>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="col-12 pa-0 py-2">
               <div
                  class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
               >
                  <div
                     class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
                  >
                     <span class="font-weight-bold textPrimary--text"
                        >Description</span
                     >
                     <span class="text-caption grey--text"
                        >Description about course.</span
                     >
                  </div>
                  <div
                     class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
                  >
                     <v-textarea
                        v-model="form.desc"
                        label="Description"
                        :rules="rules.desc"
                        auto-grow
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">Description</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1"
                           >
                              <font-awesome-icon
                                 icon="circle-info"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-textarea>
                  </div>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="col-12 pa-0 py-2 d-flex flex-column">
               <v-btn
                  :depressed="loading"
                  :color="loading ? 'grey lighten-2' : 'primary'"
                  :loading="loading"
                  type="submit"
                  class="font-weight-bold text-capitalize text-caption rounded-lg textPrimary--text align-self-end"
                  >Add Course</v-btn
               >
            </div>
         </div>
      </v-form>
   </div>
</template>

<script>
export default {
   data: () => ({
      dialog: false,
      valid: true,
      form: {
         coverImage: null,
         id: "",
         title: "",
         level: "",
         category: "",
         price: 0,
      },
      rules: {
         id: [(v) => !!v || "Course ID is required!"],
         title: [(v) => !!v || "Course Title is required!"],
         level: [(v) => !!v || "Course Level is required!"],
         category: [(v) => !!v || "Category is required!"],
         desc: [(v) => !!v || "Description is required!"],
         group: [(v) => !!v || "Group is required!"],
         coverImage: [(v) => !!v || "Cover image is required!"],
      },
      loading: false,
      loadingTeam: false,
      levelList: ["Beginner", "Intermediate", "Expert"],
   }),
   watch: {
      dialog(newValue, old) {
         if (newValue == false) {
            this.team = "";
         }
      },
   },
   async created() {},
   methods: {
      comparator(a, b) {
         return a == b;
      },
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      onLogoUpload(file) {
         this.form.coverImage = file;
      },
      async submitForm() {
         if (this.$refs.form.validate()) {
            const formData = new FormData();
            this.loading = true;

            if (this.form.coverImage !== null) {
               formData.append("courseId", this.form.id);
               formData.append("courseName", this.form.title);
               formData.append("courseDesc", this.form.desc);
               formData.append("courseCategory", this.form.category);
               formData.append("courseLevel", this.form.level);
               formData.append("price", this.form.price);
               formData.append(
                  "coverImage",
                  this.form.coverImage,
                  this.form.coverImage.name
               );
            }

            try {
               const updateData = await this.$axios.post(
                  `${process.env.NUXT_ENV_API_URL}/api/v1/course`,
                  this.form.coverImage == null ? this.form : formData
               );
               this.form.coverImage = null;
               const resData = updateData.data;
               if (resData.status == "SUCCESS") {
                  this.showNotif("success", `Add new course sueccess!`);
                  this.form.coverImage = null;
                  this.loading = false;
               } else {
                  this.showAlert("error", `${resData.data.message}`);
                  this.form.coverImage = null;
                  this.loading = false;
               }
               this.$refs.anyName.reset();
            } catch (err) {
               if (err.response) {
                  this.showAlert("error", `${response.data.message}`);
                  this.loading = false;
               }
               this.form.coverImage = null;
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
