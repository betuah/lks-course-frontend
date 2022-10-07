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
            <span class="text-h5 font-weight-medium textPrimary--text"
               >Create New Ticket</span
            >
            <span class="text-caption grey--text"
               >There is no limit in creating tickets, you can create tickets as
               many as you want. Don't worry there is no extra cost. 😏</span
            >
         </div>
      </div>
      <v-form>
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
                     >Subject</span
                  >
                  <span class="text-caption grey--text"
                     >A Short and relevant subject will be make it easier to
                     find tickets</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 d-flex flex-row align-self-center"
               >
                  <v-text-field
                     v-model="form.subject"
                     label="Picker in menu"
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg"
                     color="primary"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Subject</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div
                           class="d-flex flex-row tw-h-6 align-center mr-1 grey--text"
                        >
                           <font-awesome-icon
                              icon="ticket"
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
                     >Ticket Type</span
                  >
                  <span class="text-caption grey--text"
                     >Choose the ticket category, assign team to handle the
                     ticket and define ticket priorities.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 d-flex flex-column flex-md-row align-self-center"
               >
                  <div
                     :class="`col-12 ${
                        ticketType == 2 ? 'col-md-4' : 'col-md-12'
                     } pa-0 tw-transition-all tw-duration-300 tw-ease-in-out`"
                  >
                     <v-select
                        v-model="ticketType"
                        :items="typeList"
                        item-text="type"
                        item-value="id"
                        label="Category"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                     >
                        <template v-slot:label>
                           <div class="text-caption textPrimary--text">
                              Ticket Type
                           </div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row align-center mr-1 tw-h-6"
                           >
                              <font-awesome-icon
                                 icon="bookmark"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-select>
                  </div>
                  <div
                     v-if="ticketType == 2"
                     class="col-12 col-md-8 pa-0 py-3 py-md-0 pl-md-3"
                  >
                     <v-select
                        v-model="form.impactProblem"
                        :items="problemList"
                        item-text="problem"
                        item-value="id"
                        label="Group"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                     >
                        <template v-slot:label>
                           <div class="tw-text-xs">Suspect Problem</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row align-center tw-h-6 mr-1"
                           >
                              <font-awesome-icon
                                 icon="triangle-exclamation"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-select>
                  </div>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div
               class="col-12 pa-0 py-2 d-flex flex-column flex-md-row justify-start align-start"
            >
               <div
                  class="col-12 col-md-5 pa-0 d-flex flex-column pb-2 pb-md-0 pr-md-2"
               >
                  <span class="font-weight-bold textPrimary--text">Label</span>
                  <span class="text-caption grey--text"
                     >Choose the ticket category, assign team to handle the
                     ticket and define ticket priorities.</span
                  >
               </div>
               <div
                  class="col-12 col-md-7 pa-0 d-flex flex-column flex-md-row align-self-center"
               >
                  <div class="col-12 col-md-4 pa-0">
                     <v-select
                        v-model="form.categoryId"
                        :items="categoryList"
                        item-text="category"
                        item-value="categoryid"
                        label="Category"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption align-center"
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">Category Ticket</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1"
                           >
                              <font-awesome-icon
                                 icon="tags"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-select>
                  </div>
                  <div class="col-12 col-md-4 pa-0 py-3 py-md-0 px-md-3">
                     <v-select
                        v-model="form.groupId"
                        :items="groupList"
                        item-text="text"
                        item-value="id"
                        label="Group"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">User Group</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1"
                           >
                              <font-awesome-icon
                                 icon="user-group"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-select>
                  </div>
                  <div class="col-12 col-md-4 pa-0">
                     <v-select
                        v-model="form.priority"
                        :items="priorityList"
                        item-text="text"
                        item-value="id"
                        label="Priority"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">Priority</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1"
                           >
                              <font-awesome-icon
                                 icon="circle-check"
                                 class="tw-text-xs grey--text mr-1 mt-1 text-center"
                              />
                           </div>
                        </template>
                     </v-select>
                  </div>
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
                        >Contains notes or descriptions of tickets to make it
                        easier for the team to resolve tickets</span
                     >
                  </div>
                  <div class="col-12 col-md-7 pa-0 d-flex flex-row">
                     <v-textarea
                        v-model="form.desc"
                        label="Description"
                        auto-grow
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                     >
                     </v-textarea>
                  </div>
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
                        >Attachment</span
                     >
                     <span class="text-caption grey--text"
                        >You can attach file in the form of a
                        <span class="accent--text">pdf</span> or an image with
                        the extension
                        <span class="accent--text">jpg, png or gif</span></span
                     >
                  </div>
                  <div
                     class="col-12 col-md-7 pa-0 d-flex flex-row align-self-center"
                  >
                     <v-file-input
                        multiple
                        label="Attachment"
                        outlined
                        dense
                        hide-details="auto"
                        class="rounded-lg text-caption"
                        prepend-icon=""
                     >
                        <template v-slot:label>
                           <div class="tw-text-sm">Attachment</div>
                        </template>
                        <template v-slot:prepend-inner>
                           <div
                              class="d-flex flex-row tw-h-6 align-center mr-1"
                           >
                              <font-awesome-icon
                                 icon="paperclip"
                                 class="tw-text-xs grey--text"
                              />
                           </div>
                        </template>
                     </v-file-input>
                  </div>
               </div>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="col-12 pa-0 py-2 d-flex flex-column">
               <v-btn
                  depressed
                  color="primary"
                  class="font-weight-bold text-capitalize text-caption rounded-lg textPrimary--text align-self-end"
                  >Create Ticket</v-btn
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
         subject: "",
         priority: 4,
         categoryId: 1,
         groupId: 0,
         desc: "",
         attachment: "",
         impactProblem: null,
      },
      ticketType: 1,
      categoryList: [
         {
            categoryId: 1,
            category: "Problem",
         },
         {
            categoryId: 2,
            category: "Installation",
         },
         {
            categoryId: 3,
            category: "Internal Problem",
         },
         {
            categoryId: 4,
            category: "New Infastructur",
         },
      ],
      priorityList: [
         {
            id: 1,
            text: "Critical",
         },
         {
            id: 2,
            text: "High",
         },
         {
            id: 3,
            text: "Medium",
         },
         {
            id: 4,
            text: "Low",
         },
      ],
      groupList: [
         {
            id: 1,
            text: "NOC",
         },
         {
            id: 2,
            text: "CSS",
         },
         {
            id: 3,
            text: "FE",
         },
      ],
      typeList: [
         {
            id: 1,
            type: "General",
         },
         {
            id: 2,
            type: "Problem",
         },
         {
            id: 1,
            type: "Dismatle",
         },
      ],
      problemList: [
         {
            id: 1,
            problem: "Internet Access",
         },
         {
            id: 2,
            problem: "Client Request",
         },
         {
            id: 3,
            problem: "PON Indicator Blink",
         },
         {
            id: 4,
            problem: "PON Indicator Loss",
         },
         {
            id: 5,
            problem: "WAN Indicator Blink",
         },
         {
            id: 6,
            problem: "WAN Indicator Down",
         },
         {
            id: 7,
            problem: "Hardware Error",
         },
      ],
   }),
   methods: {},
};
</script>
