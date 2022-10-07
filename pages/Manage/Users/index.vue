<template>
   <div class="d-flex flex-column py-5 px-0">
      <AlertConfirm ref="confirm" />
      <div
         class="mx-5 d-flex flex-column flex-md-row align-md-center pa-0 tw-bg-white py-5 px-5 tw-rounded-2xl tw-shadow-xl"
      >
         <div class="pa-0 d-flex flex-column">
            <span
               class="text-h5 font-weight-light font-weight-medium textPrimary--text"
               >User Management</span
            >
            <span class="text-caption grey--text my-2 my-md-0"
               >User management helps you to manage application users such as
               inviting user, create groups and granting access rights based on
               groups or individuals.</span
            >
         </div>
         <v-spacer></v-spacer>
         <div class="pa-0 ma-0 mt-2 d-flex flex-row justify-md-end">
            <v-btn
               color="primary"
               class="rounded-lg text-capitalize textPrimary--text font-weight-bold text-caption"
               @click="$router.push({ path: '/manage/users/addUser' })"
               >Invite User</v-btn
            >
            <v-btn
               color="primary"
               class="rounded-lg text-capitalize ml-2 textPrimary--text font-weight-bold text-caption"
               @click="$router.push({ path: '/manage/users/addGroup' })"
               >Create group</v-btn
            >
         </div>
      </div>
      <div
         class="d-flex flex-column flex-md-row tw-shadow-md tw-rounded-xl white mx-5 my-4 pa-3"
      >
         <div class="d-flex mt-2 mt-md-0 flex-grow-1">
            <v-text-field
               v-model="search"
               dense
               hide-details
               outlined
               class="text-capitalize text-caption rounded-lg"
            >
               <template v-slot:label>
                  <div class="tw-text-sm">Find ticket subject</div>
               </template>
               <template v-slot:prepend-inner>
                  <div class="d-flex flex-row tw-h-6 align-center mr-1">
                     <div>
                        <font-awesome-icon
                           icon="fa-solid fa-magnifying-glass"
                           class="tw-text-sm grey--text"
                        />
                     </div>
                  </div>
               </template>
            </v-text-field>
         </div>
      </div>
      <div class="col-12 pa-0 d-flex flex-column">
         <div class="mx-5 my-2 px-2 d-flex flex-row align-center">
            <div class="mr-2">
               <span class="text-subtitle-2 font-weight-bold accent--text">{{
                  listData.length
               }}</span>
               <span class="text-subtitle-2">{{
                  tableSelected == 1 ? "Users" : "Groups"
               }}</span>
            </div>
            <div class="">
               <v-btn x-small icon plain :ripple="false" @click="prevTable()">
                  <font-awesome-icon
                     icon="angle-left"
                     class="tw-text-xs tw-text-gray-500"
                  />
               </v-btn>
               <span class="text-caption"
                  >Page {{ page }} of {{ pageCount }}</span
               >
               <v-btn x-small icon plain :ripple="false" @click="nextTable()">
                  <font-awesome-icon
                     icon="angle-right"
                     class="tw-text-xs tw-text-gray-500"
                  />
               </v-btn>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-row justify-end col-2 pa-0">
               <v-btn
                  depressed
                  :color="tableSelected == 1 ? 'primary' : 'grey lighten-2'"
                  :class="`${
                     tableSelected == 1 ? 'white--text' : 'textPrimary--text'
                  } col-6 rounded-l-lg rounded-r-0 ma-0 text-caption font-weight-bold`"
                  @click="selectTable(1)"
                  >Users</v-btn
               >
               <v-btn
                  depressed
                  :color="tableSelected == 2 ? 'primary' : 'grey lighten-2'"
                  :class="`${
                     tableSelected == 2 ? 'white--text' : 'textPrimary--text'
                  } col-6 rounded-r-lg rounded-l-0 ma-0 text-caption font-weight-bold`"
                  @click="selectTable(2)"
                  >Groups</v-btn
               >
            </div>
         </div>
         <client-only>
            <v-data-table
               :items="listData"
               hide-default-header
               hide-default-footer
               :page.sync="page"
               :items-per-page="itemsPerPage"
               @page-count="pageCount = $event"
               :loading="tableLoading"
               loading-text="Loading data!"
               no-data-text="Empty User."
               no-results-text="Ticket Not Found!"
               color="primary"
               class="elevation-0 bgPrimary tw-h-90"
            >
               <template v-slot:item="{ item }">
                  <div>
                     <div
                        v-if="tableSelected == 1"
                        class="mx-5 d-flex flex-column flex-md-row my-2 tw-rounded-xl tw-shadow-md md:tw-shadow-sm white pa-4 px-md-5"
                     >
                        <div class="col-md-12 pa-0 d-flex flex-row">
                           <v-avatar size="40" class="col-md-1 pa-0">
                              <img
                                 :src="
                                    item.user.photo_profile ||
                                    'https://cdn.vuetifyjs.com/images/john.jpg'
                                 "
                                 alt="John"
                              />
                           </v-avatar>
                           <div
                              class="col-md-11 pa-0 d-flex flex-column flex-md-row ml-4 ml-md-0"
                           >
                              <div class="col-md-4 d-flex flex-column pa-0">
                                 <span
                                    class="tw-text-sm font-weight-bold accent--text"
                                    >{{ item.user.fullName }}</span
                                 >
                                 <span class="text-caption grey--text">{{
                                    item.user.email
                                 }}</span>
                              </div>
                              <div
                                 class="col-md-8 pa-0 d-none d-md-flex flex-row"
                              >
                                 <div
                                    class="col-md-2 pa-0 d-flex flex-row flex-md-column justify-md-center"
                                 >
                                    <span
                                       class="tw-text-xs d-none d-md-flex grey--text"
                                       >Team</span
                                    >
                                    <span
                                       class="text-caption textPrimary--text font-weight-bold"
                                       >{{
                                          item.team == null
                                             ? "None"
                                             : item.team.team
                                       }}</span
                                    >
                                 </div>
                                 <div
                                    class="col-md-2 pa-0 d-flex flex-md-row flex-md-column justify-md-center"
                                 >
                                    <span
                                       class="tw-text-xs d-none d-md-flex grey--text"
                                       >Status</span
                                    >
                                    <span
                                       :class="`${
                                          item.status == 'invited'
                                             ? 'accent--text'
                                             : 'success--text'
                                       } text-caption text-capitalize font-weight-bold`"
                                       >{{ item.status }}</span
                                    >
                                 </div>
                                 <div
                                    class="col-md-3 pa-0 d-flex flex-md-row flex-md-column justify-md-center"
                                 >
                                    <span
                                       class="tw-text-xs d-none d-md-flex grey--text"
                                       >User Group</span
                                    >
                                    <span
                                       class="text-caption textPrimary--text font-weight-bold"
                                       >{{ item.group.groupName }}</span
                                    >
                                 </div>
                                 <div
                                    class="col-md-5 pa-0 d-none d-md-flex flex-row justify-md-end align-end align-center"
                                 >
                                    <v-btn
                                       v-if="item.status == 'invited'"
                                       small
                                       :ripple="false"
                                       text
                                       plain
                                       :loading="
                                          resendLoading.indexOf(item.user.id) !=
                                          -1
                                       "
                                       class="font-weight-bold text-capitalize accent--text"
                                       @click="resendIvitation(item.user.id)"
                                       >Resend Invitation</v-btn
                                    >
                                    <v-btn
                                       small
                                       :ripple="false"
                                       text
                                       plain
                                       :loading="
                                          editUserLoading.indexOf(
                                             item.user.id
                                          ) != -1
                                       "
                                       class="font-weight-bold text-capitalize success--text"
                                       @click="editUser(item._id)"
                                    >
                                       Edit
                                    </v-btn>
                                    <v-btn
                                       small
                                       :ripple="false"
                                       text
                                       plain
                                       class="font-weight-bold text-capitalize error--text"
                                       @click="deleteMember(item._id)"
                                       >Delete</v-btn
                                    >
                                 </div>
                              </div>
                              <div
                                 class="d-flex d-md-none flex-row flex-wrap text-caption align-center"
                              >
                                 <span>{{ item.group.groupName }}</span>
                                 <span class="grey--text mx-1">&bull;</span>
                                 <span>{{
                                    item.team == null ? "None" : item.team.team
                                 }}</span>
                                 <span class="grey--text mx-1">&bull;</span>
                                 <span
                                    :class="`${
                                       item.status == 'invited'
                                          ? 'accent'
                                          : 'success'
                                    } tw-rounded-md px-2 white--text text-capitalize`"
                                    >{{ item.status }}</span
                                 >
                              </div>
                           </div>
                           <div
                              class="d-flex d-md-none flex-row flex-grow-1 flex-md-grow-0 justify-end"
                           >
                              <v-menu open-on-hover rounded="lg" offset-y>
                                 <template v-slot:activator="{ on, attrs }">
                                    <font-awesome-icon
                                       icon="ellipsis-vertical"
                                       class="tw-text-md grey--text"
                                       v-bind="attrs"
                                       v-on="on"
                                    />
                                 </template>

                                 <div class="d-flex flex-column">
                                    <v-list dense>
                                       <v-list-item
                                          v-if="item.status == 'invited'"
                                          @click="resendIvitation(item.user.id)"
                                          class="font-weight-bold text-capitalize text-caption accent--text"
                                       >
                                          Resend Invitation
                                       </v-list-item>
                                       <v-list-item
                                          @click="editUser(item._id)"
                                          class="font-weight-bold text-caption text-capitalize accent--text"
                                       >
                                          Edit
                                       </v-list-item>
                                       <v-list-item
                                          @click="deleteMember(item._id)"
                                          class="font-weight-bold text-capitalize text-caption error--text"
                                          >Delete
                                       </v-list-item>
                                    </v-list>
                                 </div>
                              </v-menu>
                           </div>
                        </div>
                     </div>
                     <div
                        v-if="tableSelected == 2"
                        class="mx-5 d-flex flex-column flex-md-row my-2 tw-rounded-xl tw-shadow-md md:tw-shadow-sm white pa-4 px-md-5"
                     >
                        <div class="col-md-12 pa-0 d-flex flex-row">
                           <div
                              class="col-md-11 pa-0 d-none d-md-flex flex-column flex-md-row ml-md-0"
                           >
                              <div
                                 class="col-md-12 pa-0 d-flex flex-column flex-md-row"
                              >
                                 <div class="col-md-2 d-flex flex-column pa-0">
                                    <span
                                       class="tw-text-md font-weight-bold accent--text"
                                       >{{ item.groupName }}</span
                                    >
                                    <span class="text-caption grey--text">{{
                                       $moment(item.createdAt).fromNow()
                                    }}</span>
                                 </div>
                                 <v-divider
                                    class="d-flex d-md-none my-2 my-md-none"
                                 ></v-divider>
                                 <div
                                    class="col-md-10 d-flex flex-row flex-md-column pa-0"
                                 >
                                    <div
                                       class="pa-0 d-flex flex-column flex-md-row"
                                    >
                                       <div class="col-md-3 pa-0">
                                          <span class="text-caption grey--text"
                                             >Special Authority</span
                                          >
                                       </div>
                                       <div class="col-md-3 pa-0">
                                          <span class="text-caption grey--text"
                                             >Roles</span
                                          >
                                       </div>
                                       <div class="col-md-2 pa-0">
                                          <span class="text-caption grey--text"
                                             >Create</span
                                          >
                                       </div>
                                       <div class="col-md-2 pa-0">
                                          <span class="text-caption grey--text"
                                             >Update</span
                                          >
                                       </div>
                                       <div class="col-md-2 pa-0">
                                          <span class="text-caption grey--text"
                                             >Delete</span
                                          >
                                       </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                       <div
                                          v-for="i in item.permissions"
                                          :key="i.id"
                                          class="pa-0 d-flex flex-column flex-md-row pl-4 pl-md-0"
                                       >
                                          <div
                                             class="col-md-3 pa-0 d-flex flex-wrap"
                                          >
                                             <span
                                                v-for="(
                                                   e, index
                                                ) in i.specialAuthority"
                                                :key="index"
                                                class="text-caption font-weight-bold textPrimary--text"
                                                >{{
                                                   i.specialAuthority.length ==
                                                   1
                                                      ? e
                                                      : e + " , "
                                                }}
                                             </span>
                                          </div>
                                          <div class="col-md-3 pa-0">
                                             <span
                                                class="text-caption font-weight-bold textPrimary--text"
                                                >{{ i.roles.roleName }}</span
                                             >
                                          </div>

                                          <div class="col-md-2 pa-0">
                                             <span
                                                class="text-caption font-weight-bold textPrimary--text"
                                                >{{
                                                   i.create ? "Yes" : "No"
                                                }}</span
                                             >
                                          </div>
                                          <div class="col-md-2 pa-0">
                                             <span
                                                class="text-caption font-weight-bold textPrimary--text"
                                                >{{
                                                   i.update ? "Yes" : "No"
                                                }}</span
                                             >
                                          </div>
                                          <div class="col-md-2 pa-0">
                                             <span
                                                class="text-caption font-weight-bold textPrimary--text"
                                                >{{
                                                   i.delete ? "Yes" : "No"
                                                }}</span
                                             >
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div
                                    class="col-md-1 pa-0 d-none d-md-flex flex-row justify-md-end align-center"
                                 >
                                    <v-btn
                                       small
                                       :ripple="false"
                                       text
                                       plain
                                       class="font-weight-bold text-capitalize accent--text"
                                       @click="
                                          $router.push({
                                             path: `/manage/users/editGroup/${item.id}`,
                                          })
                                       "
                                       >Edit</v-btn
                                    >
                                    <v-btn
                                       small
                                       :ripple="false"
                                       text
                                       plain
                                       class="font-weight-bold text-capitalize error--text"
                                       @click="deleteGroup(item.id)"
                                       >Delete</v-btn
                                    >
                                 </div>
                              </div>
                           </div>
                           <div
                              class="d-flex d-md-none flex-grow-1 flex-column"
                           >
                              <div class="d-flex flex-column pa-0">
                                 <span
                                    class="tw-text-md font-weight-bold accent--text"
                                    >{{ item.groupName }}</span
                                 >
                                 <span class="text-caption grey--text">{{
                                    $moment(item.createdAt).fromNow()
                                 }}</span>
                              </div>
                              <v-divider
                                 class="d-flex d-md-none my-2 my-md-none"
                              ></v-divider>
                              <div class="d-flex flex-column">
                                 <div
                                    v-for="(i, index) in item.permissions"
                                    :key="index"
                                    class="d-flex flex-column tw-rounded-lg mb-3 pa-3 tw-border tw-border-gray-400 tw-border-dotted"
                                 >
                                    <span
                                       class="tw-text-sm textPrimary--text font-weight-bold mb-1"
                                       >{{ i.roles.roleName }}</span
                                    >
                                    <div class="d-flex flex-row mb-1">
                                       <span
                                          class="px-1 accent tw-rounded-md text-caption white--text mr-1"
                                          >Read</span
                                       >
                                       <span
                                          v-if="i.create"
                                          class="px-1 success tw-rounded-md text-caption white--text"
                                          >Create</span
                                       >
                                       <span
                                          v-if="i.update"
                                          class="px-1 warning tw-rounded-md text-caption white--text mx-1"
                                          >Update</span
                                       >
                                       <span
                                          v-if="i.delete"
                                          class="px-1 error tw-rounded-md text-caption white--text"
                                          >Delete</span
                                       >
                                    </div>
                                    <div
                                       v-if="i.specialAuthority.length > 0"
                                       class="d-flex flex-column"
                                    >
                                       <span
                                          class="text-caption textPrimary--text font-weight-bold mt-2"
                                          >Special Authority</span
                                       >
                                       <span
                                          v-for="(
                                             e, index
                                          ) in i.specialAuthority"
                                          :key="index"
                                          class="text-caption textPrimary--text"
                                          >{{
                                             i.specialAuthority.length == 1
                                                ? e
                                                : e + " , "
                                          }}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="d-flex d-md-none flex-row justify-end">
                              <v-menu open-on-hover rounded="lg" offset-y>
                                 <template v-slot:activator="{ on, attrs }">
                                    <font-awesome-icon
                                       icon="ellipsis-vertical"
                                       class="tw-text-md grey--text"
                                       v-bind="attrs"
                                       v-on="on"
                                    />
                                 </template>

                                 <div class="d-flex flex-column">
                                    <v-list dense>
                                       <v-list-item
                                          @click="
                                             $router.push({
                                                path: `/manage/users/editGroup/${item.id}`,
                                             })
                                          "
                                          class="font-weight-bold text-capitalize accent--text"
                                       >
                                          Edit
                                       </v-list-item>
                                       <v-list-item
                                          @click="deleteGroup(item.id)"
                                          class="font-weight-bold text-capitalize error--text"
                                          >Delete
                                       </v-list-item>
                                    </v-list>
                                 </div>
                              </v-menu>
                           </div>
                        </div>
                     </div>
                  </div>
               </template>
            </v-data-table>
         </client-only>
      </div>
   </div>
</template>

<script>
import Breadcump from "~/components/Breadcump.vue";
export default {
   components: { Breadcump },
   data: () => ({
      items: [
         {
            text: "User Management",
            disabled: true,
            href: "breadcrumbs_dashboard",
         },
      ],
      search: "",
      status: 10,
      tableSelected: 1,
      tableLoading: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      calendarMenu: false,
      dates: [
         new Date("1995-07-27").toISOString().substr(0, 10),
         new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
      ],
      desserts: [],
      ticketData: [],
      resendLoading: [],
      editUserLoading: [],
   }),
   watch: {
      async tableSelected(newVal, oldVal) {
         switch (newVal) {
            case 1:
               await this.getUser();
               break;

            case 2:
               await this.getGroup();
               break;
         }
      },
   },
   async created() {
      if (this.$route.query.req == 1) {
         this.tableSelected = 1;
      } else if (this.$route.query.req == 2) {
         this.tableSelected = 2;
      } else {
         await this.getUser();
         this.tableSelected = 1;
      }
   },
   computed: {
      listData() {
         return this.desserts.filter((item) => {
            switch (this.tableSelected) {
               case 1:
                  if (item.user !== undefined) {
                     return item.user.fullName
                        .toLowerCase()
                        .includes(this.search.toLowerCase());
                  } else {
                     return "";
                  }

               case 2:
                  if (item.groupName !== undefined) {
                     return item.groupName
                        .toLowerCase()
                        .includes(this.search.toLowerCase());
                  } else {
                     return "";
                  }
            }
         });
      },
   },
   methods: {
      showNotif(type, message) {
         this.$store.commit("notif/SHOW", { type, message });
      },
      async selectTable(val) {
         this.tableSelected = val;
      },
      nextTable() {
         this.page = this.page == this.pageCount ? this.page : this.page + 1;
      },
      prevTable() {
         this.page = this.page > 1 ? this.page - 1 : 1;
      },
      resendLoadingFunc(id) {
         if (this.resendLoading.indexOf(id) == -1) {
            this.resendLoading.push(id);
         } else {
            this.resendLoading.splice(this.resendLoading.indexOf(id), 1);
         }
      },
      EditUserLoadingFunc(id) {
         if (this.editUserLoading.indexOf(id) == -1) {
            this.editUserLoading.push(id);
         } else {
            this.editUserLoading.splice(this.editUserLoading.indexOf(id), 1);
         }
      },
      async getUser() {
         try {
            this.tableLoading = true;
            this.desserts = [];
            const res = await this.$axios.get(
               `/company/${this.$store.state.selectedCompany}/members`
            );
            const resData = res.data;
            if (resData.success) {
               this.desserts = resData.data;
            } else {
               this.showNotif("warning", resData.message);
            }
            this.tableLoading = false;
         } catch (error) {
            this.tableLoading = false;
            this.rolesSelected = [];
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async getGroup() {
         try {
            this.tableLoading = true;
            this.desserts = [];
            const res = await this.$axios.get(
               `/group/${this.$store.state.selectedCompany}`
            );
            const resData = res.data;
            if (resData.success) {
               this.desserts = resData.data;
            } else {
               this.showNotif("warning", resData.message);
            }
            this.tableLoading = false;
         } catch (error) {
            this.tableLoading = false;
            this.rolesSelected = [];
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async resendIvitation(id) {
         try {
            this.resendLoadingFunc(id);
            const res = await this.$axios.post(`/member/invite/resend`, {
               userId: id,
               companyId: this.$store.state.selectedCompany,
            });
            const resData = res.data;

            if (resData.success) {
               this.resendLoadingFunc(id);
               this.showNotif("success", "Invitation sended!");
            } else {
               this.resendLoadingFunc(id);
               this.showNotif("warning", resData.message);
            }
         } catch (error) {
            this.resendLoadingFunc(id);
            this.rolesSelected = [];
            this.showNotif("error", "Internal Server Error.");
         }
      },
      async editUser(id) {
         this.$router.push({
            path: `/manage/users/editUser/${id}`,
         });
      },
      async deleteMember(id) {
         const confirm = await this.$refs.confirm.show(
            "Are you sure ?",
            `Your data will be permanently <span class="error--text font-weight-bold">Deleted!</span>`
         );

         if (confirm) {
            try {
               this.loading = true;
               const response = await this.$axios.post(`/company/member/kick`, {
                  companyId: this.$store.state.selectedCompany,
                  memberId: id,
               });
               const resData = response.data;

               if (resData.success) {
                  this.showNotif("success", "Member deleted!");
               } else {
                  this.showNotif("warning", resData.message);
               }

               this.alertConfirm = false;
               this.loading = false;
               this.getUser();
            } catch (e) {
               this.showNotif("error", "Internal Server Error.");
               this.alertConfirm = false;
               this.loading = false;
            }
         } else {
            this.alertConfirm = false;
         }
      },
      async deleteGroup(id) {
         const confirm = await this.$refs.confirm.show(
            "Are you sure ?",
            `Your data will be permanently <span class="error--text font-weight-bold">Deleted!</span>`
         );

         if (confirm) {
            try {
               this.loading = true;
               const response = await this.$axios.delete(`/group/${id}`);
               const resData = response.data;

               if (resData.success) {
                  this.showNotif("success", "Group was deleted!");
               } else {
                  this.showNotif("warning", resData.message);
               }

               this.alertConfirm = false;
               this.loading = false;
               this.getGroup();
               this.tableSelected = 2;
            } catch (e) {
               this.showNotif("error", "Internal Server Error.");
               this.alertConfirm = false;
               this.loading = false;
            }
         } else {
            this.alertConfirm = false;
         }
      },
   },
};
</script>
