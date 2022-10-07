<template>
   <div class="col-12 pa-5 d-flex flex-column">
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
                  >Edit Group</span
               >
            </div>
            <span class="text-caption grey--text"
               >Groups will help you to define user role for multiple users at
               once. You can create group more than one and assign more than one
               rules to a single group.
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
                     >Group Name</span
                  >
                  <span class="text-caption grey--text"
                     >Naming the group according to the rules given will make it
                     easier to choose a group for the user.</span
                  >
               </div>
               <div
                  v-if="id !== null"
                  class="col-12 col-md-7 pa-0 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="groupName"
                     outlined
                     dense
                     :rules="groupNameRules"
                     hide-details="auto"
                     class="rounded-lg text-body-2"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Group Name</div>
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
                  <span class="font-weight-bold textPrimary--text">Roles</span>
                  <span class="text-caption grey--text"
                     >Choose the most suitable roles for your users needs. Be
                     careful in giving user roles to sensitive data or roles
                     that can delete the data.</span
                  >
               </div>
               <div
                  class="col-12 col-md-6 pa-0 pl-md-3 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <div v-for="(item, index) in roleItems" :key="item.roles">
                     <v-checkbox
                        v-model="roleItems[index].selected"
                        dense
                        hide-details
                        class="pa-0 ma-0 d-flex"
                     >
                        <template v-slot:label>
                           <div class="d-flex flex-column justify-center">
                              <span
                                 class="tw-text-sm textPrimary--text font-weight-bold"
                                 >{{ item.label }}</span
                              >
                           </div>
                        </template>
                     </v-checkbox>
                     <div class="d-flex flex-column mb-3 pl-7">
                        <span class="ml-1 tw-text-xs grey--text mb-2">{{
                           item.desc
                        }}</span>
                        <div class="mb-3" v-if="item.specialMenu.length > 0">
                           <span class="ml-1 text-caption textPrimary--text"
                              >Special Authority</span
                           >
                           <div class="d-flex flex-row flex-wrap align-center">
                              <v-checkbox
                                 v-model="roleItems[index].specialAuthority"
                                 :value="menu.id"
                                 :value-comparator="comparatorSpecial"
                                 v-for="(menu, index) in item.specialMenu"
                                 :key="index"
                                 dense
                                 hide-details
                                 class="mr-3"
                              >
                                 <template v-slot:label>
                                    <div
                                       class="d-flex flex-column justify-center"
                                    >
                                       <span
                                          class="tw-text-sm textPrimary--text"
                                          >{{ menu.label }}</span
                                       >
                                    </div>
                                 </template>
                              </v-checkbox>
                           </div>
                        </div>
                        <span class="ml-1 text-caption textPrimary--text"
                           >Permissions</span
                        >
                        <div class="d-flex flex-row align-center">
                           <v-checkbox
                              v-model="roleItems[index].create"
                              @change="changePermission(index)"
                              dense
                              hide-details
                              class="mr-3"
                           >
                              <template v-slot:label>
                                 <div class="d-flex flex-column justify-center">
                                    <span class="tw-text-sm textPrimary--text"
                                       >Create</span
                                    >
                                 </div>
                              </template>
                           </v-checkbox>
                           <v-checkbox
                              v-model="roleItems[index].update"
                              @change="changePermission(index)"
                              dense
                              hide-details
                              class="mr-3"
                           >
                              <template v-slot:label>
                                 <div class="d-flex flex-column justify-center">
                                    <span class="tw-text-sm textPrimary--text"
                                       >Update</span
                                    >
                                 </div>
                              </template>
                           </v-checkbox>
                           <v-checkbox
                              v-model="roleItems[index].delete"
                              @change="changePermission(index)"
                              dense
                              hide-details
                              class=""
                           >
                              <template v-slot:label>
                                 <div class="d-flex flex-column justify-center">
                                    <span class="tw-text-sm textPrimary--text"
                                       >Delete</span
                                    >
                                 </div>
                              </template>
                           </v-checkbox>
                        </div>
                     </div>
                     <v-divider
                        v-if="index != roles.length - 1"
                        class="my-2"
                     ></v-divider>
                  </div>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="col-12 pa-0 py-2 d-flex flex-column">
               <v-btn
                  depressed
                  color="primary"
                  type="submit"
                  :loading="loading"
                  class="font-weight-bold text-capitalize text-caption rounded-lg textPrimary--text align-self-end"
                  >Update Group</v-btn
               >
            </div>
         </div>
      </v-form>
   </div>
</template>

<script>
export default {
   data: () => ({
      valid: true,
      loading: false,
      id: null,
      groupName: "",
      groupNameRules: [(v) => !!v || "Group Name is required!"],
      roleItems: [],
   }),
   async created() {
      this.id = this.$route.params.id;
      await this.getRoles();
      await this.getGroup();
   },
   methods: {
      comparator(a, b) {
         return a.roles == b.roles;
      },
      comparatorSpecial(a, b) {
         return a == b;
      },
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      changePermission(index) {
         if (!this.roleItems[index].selected) {
            this.roleItems[index].selected = true;
         }
      },
      async getGroup() {
         try {
            const res = await this.$axios.get(
               `/group/id/${this.$route.params.id}`
            );
            const resData = res.data;
            if (resData.success) {
               this.groupName = resData.data.groupName;
               this.roleItems = this.roleItems.map((i) => {
                  const searchObject = resData.data.permissions.find(
                     (e) => e.roles == i.roles
                  );

                  if (searchObject) searchObject.selected = true;

                  return {
                     ...i,
                     ...searchObject,
                  };
               });
            } else {
               this.showNotif("warning", resData.message);
            }
         } catch (error) {
            this.rolesSelected = [];
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async getRoles() {
         try {
            let config = {
               headers: {
                  key: process.env.NUXT_ENV_SYSTEM_SECRET,
               },
            };

            const res = await this.$axios.get("/role", config);
            const resData = res.data;
            if (resData.success) {
               this.roles = resData.data;
               this.roleItems = resData.data.map((i) => ({
                  selected: false,
                  roles: i.id,
                  roleId: i.roleId,
                  label: i.roleName,
                  desc: i.desc,
                  create: false,
                  update: false,
                  delete: false,
                  specialMenu: i.specialMenu ?? [],
                  specialAuthority: [],
               }));
               this.rolesSelected = [];
            } else {
               this.showNotif("warning", resData.message);
            }
         } catch (error) {
            this.rolesSelected = [];
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async submitForm() {
         if (this.$refs.form.validate()) {
            this.loading = true;
            try {
               const data = {
                  groupId: this.$route.params.id,
                  groupName: this.groupName,
                  roles: this.roleItems.filter((e) => e.selected),
               };

               const res = await this.$axios.put("/group", data);
               const resData = res.data;

               if (resData.success) {
                  this.showNotif("success", `Group data updated!.`);
                  await this.getRoles();
                  this.loading = false;
                  this.$router.push("/manage/users?req=2");
               } else {
                  this.loading = false;
                  this.showNotif("error", `${resData.message}`);
               }
            } catch (err) {
               this.showNotif("error", "Internal Server Error.");
               this.loading = false;
            }
         }
      },
   },
};
</script>
