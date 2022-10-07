<template>
   <div>
      <div v-if="loading || dataError" class="tw-h-screen d-flex flex-column">
         <div class="tw-h-3/4 d-flex flex-column justify-center">
            <div
               :class="`tw-w-64 align-self-center ${
                  loading ? 'd-flex' : 'd-none'
               }`"
            >
               <lottiea :options="defaultOptions.loading" />
            </div>
            <div
               :class="`tw-w-56 align-self-center d-none ${
                  dataError ? 'd-flex' : 'd-none'
               }`"
            >
               <lottiea :options="defaultOptions.error" />
            </div>
            <div v-if="loading" class="align-self-center">
               <span class="text-subtitle-1">Please wait...</span>
            </div>
            <div
               v-if="dataError"
               class="d-flex flex-column justify-center align-self-center mt-3"
            >
               <span class="text-subtitle-1 textPrimary--text"
                  >Ops... Something when wrong!</span
               >
               <div class="align-self-center mt-2">
                  <v-btn
                     small
                     color="primary"
                     class="text-caption text-capitalize textPrimary--text font-weight-bold"
                     @click="refresh()"
                  >
                     Refresh
                  </v-btn>
               </div>
            </div>
         </div>
      </div>
      <div
         v-if="!loading && data !== null && !dataError"
         class="col-12 pa-5 d-flex flex-column"
      >
         <div
            class="col-12 pa-0 d-flex flex-row align-center justify-start tw-rounded-2xl tw-shadow-md py-5 px-4 white"
         >
            <v-btn
               small
               icon
               color="white"
               class="d-none d-md-flex tw-bg-accent/80"
               @click="$router.go(-1)"
            >
               <font-awesome-icon
                  icon="angle-left"
                  class="tw-text-xs white--text"
               />
            </v-btn>
            <div class="d-flex flex-column align-start ml-md-4">
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
                     >Update User</span
                  >
               </div>
               <span class="text-caption grey--text"
                  >You can invite users to use as or all of the features in this
                  app.
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
                        >Name</span
                     >
                     <span class="text-caption grey--text"
                        >Full name will make it easier to search.</span
                     >
                  </div>
                  <div
                     class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
                  >
                     <v-text-field
                        v-model="form.fullName"
                        label="Picker in menu"
                        outlined
                        dense
                        :rules="rules.name"
                        hide-details="auto"
                        class="rounded-lg text-body-2"
                        color="primary"
                        disabled
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">Full Name</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                           >
                              <font-awesome-icon
                                 icon="id-card"
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
                        >Email</span
                     >
                     <span class="text-caption grey--text"
                        >Make sure to use an active email to be able to send the
                        invitation link request.</span
                     >
                  </div>
                  <div
                     class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
                  >
                     <v-text-field
                        v-model="form.email"
                        outlined
                        dense
                        :rules="rules.email"
                        hide-details="auto"
                        class="rounded-lg text-body-2"
                        color="primary"
                        disabled
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
                        >Team</span
                     >
                     <span class="text-caption grey--text"
                        >Team names can be the names of departments, divisions,
                        or other work groups.</span
                     >
                  </div>
                  <div
                     class="col-12 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
                  >
                     <v-select
                        v-model="form.team"
                        outlined
                        dense
                        :rules="rules.team"
                        :items="teams"
                        item-text="team"
                        item-value="id"
                        no-data-text="No team available."
                        hide-details="auto"
                        class="rounded-lg text-body-2"
                        color="primary"
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">Team</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                           >
                              <font-awesome-icon
                                 icon="user-group"
                                 class="tw-text-xs"
                              />
                           </div>
                        </template>
                        <template v-slot:prepend-item>
                           <div v-if="teamsError" class="d-flex flex-column">
                              <v-btn
                                 text
                                 plain
                                 block
                                 class="text-caption font-weight-bold accent--text"
                                 @click="getTeams($auth.user.company)"
                                 >Click to refresh Team Data</v-btn
                              >
                              <v-divider></v-divider>
                           </div>
                           <div v-else class="d-flex flex-column">
                              <v-btn
                                 text
                                 plain
                                 block
                                 class="text-caption font-weight-bold accent--text"
                                 @click="dialog = true"
                                 >Add new team</v-btn
                              >
                              <v-divider></v-divider>
                           </div>
                        </template>
                        <template v-slot:item="{ item }">
                           <div class="d-flex flex-grow-1 flex-row">
                              <span class="text-caption">{{ item.team }}</span>
                              <v-spacer></v-spacer>
                              <v-btn small icon @click="deleteTeam(item._id)">
                                 <font-awesome-icon
                                    icon="xmark"
                                    class="tw-text-xs error--text"
                                 />
                              </v-btn>
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
                        >User Group</span
                     >
                     <span class="text-caption grey--text"
                        >Choose the right group to grant access rights to the
                        user. Be careful in choosing group.</span
                     >
                  </div>
                  <div
                     class="col012 col-md-7 pa-0 pl-md-3 d-flex flex-row align-self-center"
                  >
                     <v-select
                        v-model="form.groupId"
                        :items="groupList"
                        item-text="groupName"
                        item-value="id"
                        :rules="rules.group"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-body-2 align-center"
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">User Group</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1"
                           >
                              <font-awesome-icon
                                 icon="user-secret"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-select>
                  </div>
               </div>
               <v-divider class="my-2"></v-divider>
               <div class="col-12 pa-0 py-2 d-flex flex-column">
                  <v-btn
                     :depressed="loadingSubmit"
                     :color="loadingSubmit ? 'grey lighten-2' : 'primary'"
                     :loading="loadingSubmit"
                     type="submit"
                     class="font-weight-bold text-capitalize text-caption rounded-lg textPrimary--text align-self-end"
                     >Save Data</v-btn
                  >
               </div>
            </div>
         </v-form>

         <v-dialog v-model="dialog" max-width="460">
            <div
               class="d-flex flex-column tw-shadow-md justify-center tw-rounded-xl white pa-4"
            >
               <span
                  class="textPrimary--text font-weight-bold mb-3 align-self-center"
                  >Add New Team</span
               >
               <v-text-field
                  v-model="team"
                  outlined
                  dense
                  hide-details="auto"
                  class="rounded-lg text-caption"
                  color="primary"
               >
                  <template v-slot:label>
                     <div class="tw-text-sm">Team Name</div>
                  </template>
                  <template v-slot:prepend-inner>
                     <div
                        class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                     >
                        <font-awesome-icon
                           icon="user-group"
                           class="tw-text-xs"
                        />
                     </div>
                  </template>
               </v-text-field>
               <div class="d-flex flex-row justify-end mt-3">
                  <v-btn
                     color="grey"
                     text
                     plain
                     class="text-caption rounded-lg textPrimary--text font-weight-bold"
                     @click="dialog = false"
                     >Close</v-btn
                  >
                  <v-btn
                     text
                     plain
                     :loading="loadingTeam"
                     class="text-caption rounded-lg accent--text font-weight-bold"
                     @click="createTeams"
                     >Save</v-btn
                  >
               </div>
            </div>
         </v-dialog>
      </div>
   </div>
</template>

<script>
import Lottie from "vue-lottie/src/lottie.vue";
import * as loadingAnimation from "~/assets/lottie/loading-transfer-files.json";
import * as errorAnimation from "~/assets/lottie/error.json";

export default {
   components: {
      Lottie,
   },
   data: () => ({
      dialog: false,
      valid: true,
      dataError: false,
      data: null,
      form: {
         fullName: "",
         email: "",
         team: "",
         groupId: "",
      },
      rules: {
         name: [(v) => !!v || "Full Name is required!"],
         email: [
            (v) => !!v || "E-mail is required!",
            (v) => /.+@.+\..+/.test(v) || "Email format is not valid!",
         ],
         team: [(v) => !!v || "Team is required!"],
         group: [(v) => !!v || "Group is required!"],
      },
      loading: false,
      loadingTeam: false,
      loadingSubmit: false,
      team: "",
      teams: [],
      teamsError: false,
      groupError: false,
      groupList: [],
      defaultOptions: {
         loading: { animationData: loadingAnimation },
         error: { animationData: errorAnimation },
      },
      animationSpeed: 1,
   }),
   watch: {
      dialog(newValue, old) {
         if (newValue == false) {
            this.team = "";
         }
      },
   },
   async created() {
      await this.getTeams(this.$store.state.selectedCompany);
      await this.getGroup(this.$store.state.selectedCompany);
      await this.getUser(this.$route.params.id);
   },
   methods: {
      handleAnimation(anim, type) {
         this.anim[type] = anim;
      },
      comparator(a, b) {
         return a == b;
      },
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      async refresh() {
         await this.getUser(this.$route.params.id);
      },
      async getUser(id) {
         try {
            this.loading = true;
            this.dataError = false;
            this.data = null;

            const body = {
               companyId: this.$store.state.selectedCompany,
               memberId: id,
            };

            const res = await this.$axios.post(`/member`, body);
            const resData = res.data;
            const userData = resData.data;

            if (resData.success) {
               this.data = userData;
               this.form.fullName = userData.user.fullName;
               this.form.email = userData.user.email;
               this.form.team = userData.team == null ? "" : userData.team._id;
               this.form.groupId = userData.group.id;
            } else {
               this.dataError = true;
            }
            this.loading = false;
            this.dataError = false;
         } catch (error) {
            this.loading = false;
            this.dataError = true;
         }
      },
      async getGroup() {
         try {
            this.groupList = [];
            const res = await this.$axios.get(
               `/group/${this.$auth.user.company}`
            );
            const resData = res.data;
            if (resData.success) {
               this.groupList = resData.data;
            } else {
               this.groupList = [];
               this.teamsError = true;
            }
         } catch (error) {
            this.groupList = [];
            this.teamsError = true;
         }
      },
      async getTeams(companyId) {
         try {
            const teams = await this.$axios.get(`/team/${companyId}`);
            const resData = teams.data;
            if (resData.success) {
               this.teams = resData.data;
               this.teamsError = false;
            } else {
               this.teams = [];
               this.teamsError = true;
            }
         } catch (error) {
            this.teams = [];
            this.teamsError = true;
         }
      },
      async createTeams() {
         try {
            this.loadingTeam = true;
            const data = {
               companyId: this.$auth.user.companyId,
               team: this.team,
            };
            const teams = await this.$axios.post(`/team`, data);
            const resData = teams.data;
            this.loadingTeam = false;
            if (resData.success) {
               this.teams = resData.data;
               this.team = "";
               this.dialog = false;
            } else {
               this.dialog = false;
               this.team = "";
               this.showNotif("warning", resData.message);
            }
         } catch (error) {
            this.team = "";
            this.teams = [];
            this.dialog = false;
            this.loadingTeam = false;
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async deleteTeam(id) {
         try {
            const teams = await this.$axios.delete(`/team/${id}`);
            const resData = teams.data;
            if (resData.success) {
               this.form.team = "";
               await this.getTeams();
               this.form.team = "";
               this.dialog = false;
            } else {
               this.dialog = false;
               this.form.team = "";
               this.showNotif("warning", resData.message);
            }
         } catch (error) {
            this.team = "";
            this.teams = [];
            this.dialog = false;
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async submitForm() {
         if (this.$refs.form.validate()) {
            this.loadingSubmit = true;
            try {
               const body = {
                  teamId: this.form.team,
                  groupId: this.form.groupId,
                  companyId: this.$store.state.selectedCompany,
                  memberId: this.$route.params.id,
               };
               const res = await this.$axios.put("/member", body);
               const resData = res.data;

               if (resData.success) {
                  this.showNotif("success", `Update member success.`);
                  this.loadingSubmit = false;
               } else {
                  this.loadingSubmit = false;
                  this.showNotif("error", `${resData.message}`);
               }
            } catch (err) {
               this.showNotif("error", "Internal Server Error.");
               this.loadingSubmit = false;
            }
         }
      },
   },
};
</script>
