<template>
   <div>
      <div class="col-12 d-flex flex-column">
         <div
            class="col-12 tw-rounded-xl tw-shadow-md white d-flex flex-column px-5 py-4"
         >
            <div class="d-flex flex-row">
               <v-btn
                  small
                  icon
                  color="white"
                  class="d-none d-md-flex align-self-center tw-bg-accent/80"
                  @click="$router.go(-1)"
               >
                  <font-awesome-icon
                     icon="angle-left"
                     class="tw-text-xs white--text"
                  />
               </v-btn>
               <div class="d-flex flex-column ml-md-3">
                  <span class="textPrimary--text text-h5 tw-font-normal">{{
                     data.subject
                  }}</span>
                  <span class="grey--text text-caption"
                     >Created by
                     <span class="font-weight-bold">{{ data.creator }}</span> at
                     {{ $moment(data.start_date).format("LL") }}</span
                  >
               </div>
               <v-spacer></v-spacer>
               <div class="d-flex flex-row">
                  <v-menu
                     rounded="lg"
                     offset-y
                     transition="slide-y-transition"
                     :close-on-content-click="false"
                  >
                     <template v-slot:activator="{ attrs, on }">
                        <font-awesome-icon
                           v-bind="attrs"
                           v-on="on"
                           :icon="['fas', 'ellipsis-v']"
                           class="tw-text-lg grey--text align-self-md-center"
                        />
                     </template>

                     <v-list dense>
                        <v-list-item-group
                           active-class="tw-text-sm primary--text"
                        >
                           <v-hover v-slot="{ hover }">
                              <v-list-item
                                 :class="`text-caption align-center ${
                                    hover && 'primary--text'
                                 } tw-transition-all tw-ease-in-out tw-duration-200`"
                                 @click="editTicket()"
                              >
                                 <font-awesome-icon
                                    :icon="['fas', 'pen-to-square']"
                                    class="tw-text-2xs"
                                 />
                                 <span class="ml-2">Edit Ticket</span>
                              </v-list-item>
                           </v-hover>
                           <v-hover v-slot="{ hover }">
                              <v-list-item
                                 :class="`text-caption align-center ${
                                    hover && 'primary--text'
                                 } tw-transition-all tw-ease-in-out tw-duration-200`"
                                 @click="closeTicket()"
                              >
                                 <font-awesome-icon
                                    :icon="['fas', 'circle-check']"
                                    class="tw-text-2xs"
                                 />
                                 <span class="ml-2">Close Ticket</span>
                              </v-list-item>
                           </v-hover>
                           <v-hover v-slot="{ hover }">
                              <v-list-item
                                 :class="`text-caption align-center ${
                                    hover && 'primary--text'
                                 } tw-transition-all tw-ease-in-out tw-duration-200`"
                                 @click="deleteTicket()"
                              >
                                 <font-awesome-icon
                                    :icon="['fas', 'trash-can']"
                                    class="tw-text-2xs"
                                 />
                                 <span class="ml-2">Delete Ticket</span>
                              </v-list-item>
                           </v-hover>
                        </v-list-item-group>
                     </v-list>
                  </v-menu>
               </div>
            </div>
            <v-divider class="my-3"></v-divider>
            <p class="textPrimary--textt font-weight-regular text-body-2">
               {{ data.desc }}
            </p>
         </div>
         <div class="col-12 pa-0 d-flex flex-column flex-md-row">
            <div class="col-12 col-md-3 pa-0 pr-md-3 mt-4">
               <div
                  class="d-flex flex-column tw-shadow-md tw-rounded-2xl white px-5 py-4 text-body-2"
               >
                  <div class="d-flex mt-2 flex-row justify-space-between">
                     <span class="font-weight-bold textPrimary--text"
                        >Priority</span
                     >
                     <span
                        :class="`ml-md-2 tw-font-semibold ${changeCriticalColor(
                           data.priority
                        )}`"
                        >{{ priorityName(data.priority) }}</span
                     >
                  </div>
                  <div class="d-flex mt-2 flex-row justify-space-between">
                     <span class="font-weight-bold textPrimary--text"
                        >Category</span
                     >
                     <span>{{ data.category }}</span>
                  </div>
                  <div class="d-flex mt-2 flex-row justify-space-between">
                     <span class="font-weight-bold textPrimary--text"
                        >Assign to</span
                     >
                     <span>{{ data.creatorGroup }}</span>
                  </div>
                  <div class="d-flex mt-2 flex-row justify-space-between">
                     <span class="font-weight-bold textPrimary--text"
                        >Status</span
                     >
                     <v-chip
                        x-small
                        outlined
                        :color="`${changeStateColor(data.status)}`"
                        :class="`ml-3 `"
                     >
                        <span>{{ changeState(data.status) }}</span>
                     </v-chip>
                  </div>
                  <div class="d-flex mt-2 flex-row justify-space-between">
                     <span class="font-weight-bold textPrimary--text"
                        >Ticket Duration</span
                     >
                     <span>{{ data.create }}</span>
                  </div>
                  <div class="d-flex mt-2 flex-row justify-space-between">
                     <span class="font-weight-bold textPrimary--text"
                        >Progress Duration</span
                     >
                     <span>{{ data.creatorGroup }}</span>
                  </div>
               </div>
               <div
                  class="d-flex flex-column tw-shadow-md tw-rounded-2xl white px-5 py-4 mt-3"
               >
                  <div class="d-flex flex-row align-center">
                     <font-awesome-icon
                        :icon="['fas', 'bars-progress']"
                        class="tw-text-md primary--text"
                     />
                     <span class="textPrimary--text tw-font-semibold ml-2"
                        >To do list</span
                     >
                     <v-spacer></v-spacer>
                     <v-btn
                        small
                        icon
                        plain
                        :ripple="false"
                        class=""
                        @click="showTodo = !showTodo"
                     >
                        <font-awesome-icon
                           :icon="['fas', 'caret-down']"
                           :class="`tw-text-lg textPrimary--text ${
                              showTodo && 'tw-rotate-180'
                           } tw-transition-transform tw-duration-500 tw-ease-in-out`"
                        />
                     </v-btn>
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <div
                     :class="`${
                        showTodo ? 'd-flex flex-column' : 'd-none'
                     } tw-transition-all tw-duration-300 tw-ease-in-out`"
                  >
                     <div class="d-flex flex-row justify-center align-center">
                        <v-btn
                           icon
                           small
                           color="white"
                           class="tw-bg-primary/80"
                           @click="addToDoList()"
                        >
                           <font-awesome-icon
                              :icon="['fas', 'plus']"
                              class="tw-text-2xs textPrimary--text"
                           />
                        </v-btn>
                        <v-text-field
                           v-model="todotext"
                           label=""
                           class="text-caption ml-3"
                           dense
                           :hide-details="true"
                           @keydown.enter="addToDoList()"
                        >
                        </v-text-field>
                     </div>
                     <div class="d-flex flex-column mt-2 justify-center">
                        <v-checkbox
                           v-for="(item, index) in todolist"
                           :key="index++"
                           v-model="item.checked"
                           hide-details
                           dense
                           color="accent"
                        >
                           <template v-slot:label>
                              <div
                                 class="d-flex flex-row flex-grow-1 align-center"
                              >
                                 <span
                                    :class="`text-caption font-weight-bold ml-1 align-self-center text-left tw-break-all textPrimary--text ${
                                       item.checked &&
                                       'grey--text font-italic text-decoration-line-through'
                                    }`"
                                    >{{ item.text }}</span
                                 >
                                 <v-spacer></v-spacer>
                                 <v-btn
                                    icon
                                    plain
                                    x-small
                                    :ripple="false"
                                    color="red"
                                    class="ml-1"
                                 >
                                    <font-awesome-icon
                                       :icon="['fas', 'trash-can']"
                                       class="tw-text-2xs tw-text-red"
                                    />
                                 </v-btn>
                              </div>
                           </template>
                        </v-checkbox>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-12 col-md-9 pa-0 d-flex flex-column">
               <Ticket-comment
                  v-for="item in data.comment"
                  :key="item.commendId"
                  :src="item.pics"
                  :name="item.name"
                  :created="item.created"
                  :resolved="item.done"
                  :comment="item.comment"
               />

               <div
                  class="d-flex flex-column tw-shadow-md tw-rounded-2xl mt-3 px-4 py-5 white"
               >
                  <v-textarea
                     label="Message"
                     auto-grow
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-caption"
                  >
                  </v-textarea>
                  <v-file-input
                     multiple
                     label="Attachment"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-caption mt-3"
                     prepend-icon=""
                  >
                     <template v-slot:label>
                        <div class="tw-text-xs">
                           Attachment (pdf. img, png) max 25 Mb
                        </div>
                     </template>
                     <template v-slot:prepend-inner>
                        <font-awesome-icon
                           icon="paperclip"
                           class="tw-text-xs grey--text mr-1 mt-1"
                        />
                     </template>
                  </v-file-input>
                  <div class="mt-3 d-flex flex-row align-center justify-end">
                     <v-btn
                        outlined
                        color="success"
                        class="text-caption text-capitalize font-weight-bold rounded-lg mr-3"
                     >
                        <div>
                           <font-awesome-icon
                              icon="circle-check"
                              class="tw-text-xs success--text mr-1 mt-1 align-self-center"
                           />
                           Mark as Done
                        </div>
                     </v-btn>
                     <v-btn
                        depressed
                        color="primary"
                        class="text-caption text-capitalize textPrimary--text font-weight-bold rounded-lg"
                        >Send Message</v-btn
                     >
                  </div>
               </div>
            </div>
         </div>
      </div>
      <v-dialog v-model="dialog">
         <v-card>Hellow wolrd</v-card>
         <div
            class="col-5 pa-0 d-flex flex-column pa-0 tw-rounded-2xl tw-shadow-md py-5 px-4 white"
         >
            <Ticket-edit :data="data" />
         </div>
      </v-dialog>
   </div>
</template>

<script>
export default {
   data: () => ({
      id: "112314028348943",
      dialog: false,
      data: {
         ticketNumber: "112314028348943",
         subject:
            "First Ticket Problem asd qwd qwdasdasdasd asdqwd dqwdas quartal",
         status: 0, // 0 (closed) 1 (pending), 2 (open), 3 (Done)
         priority: 4,
         categoryId: 1,
         category: "Customer Problem",
         start_date: "2022-04-13T04:56:59.221Z",
         end_date: "2022-05-20T04:56:59.221Z",
         ticket_duration: "",
         start_progress: "2022-04-13T04:56:59.221Z",
         end_progress: "2022-04-13T04:56:59.221Z",
         progress_duration: "",
         desc: "Terdapat masalah tidak dapat internet dari router A",
         creator: "Betuah Anugerah",
         creatorGroup: "CSS",
         pics: "https://i.pravatar.cc/150?img=14",
         comment: [
            {
               commendId: 4565623,
               userId: 8976765,
               name: "Haidar Ramani",
               comment: "Sedang di telusuri",
               pics: "https://i.pravatar.cc/150?img=16",
               created: "2022-04-13T04:56:59.221Z",
               done: false,
            },
            {
               commendId: 12323434,
               userId: 12309323,
               name: "Betuah Anugerah",
               comment: "Siap di tindak lanjuti",
               pics: "https://i.pravatar.cc/150?img=14",
               created: "2022-04-13T04:56:59.221Z",
               done: true,
            },
         ],
      },
      todotext: "",
      todolist: [],
      showTodo: true,
   }),
   mounted() {
      // Set the initial number of items
      this.id = this.$route.params.id;
   },
   methods: {
      changeCriticalColor: (priority) => {
         return priority == 1
            ? "error--text"
            : priority == 2
            ? "lightRed--text"
            : priority == 3
            ? "warning--text"
            : "success--text";
      },
      priorityName: (priority) => {
         return priority == 1
            ? "Critical"
            : priority == 2
            ? "High"
            : priority == 3
            ? "Medium"
            : "Low";
      },
      changeState: (stats) => {
         return stats == 1
            ? "Pending"
            : stats == 2
            ? "Open"
            : stats == 3
            ? "Done"
            : "Closed";
      },
      changeStateColor: (stats) => {
         return stats == 1
            ? "warning"
            : stats == 2
            ? "info"
            : stats == 3
            ? "success"
            : "lightRed";
      },
      addToDoList() {
         const todo = {
            id: Math.floor(Math.random() * 500),
            text: this.todotext,
            checked: false,
         };
         this.todolist.push(todo);
         this.todotext = "";
      },
      editTicket() {
         this.dialog = true;
      },
      closeTicket() {},
      deleteTicket() {},
   },
};
</script>
