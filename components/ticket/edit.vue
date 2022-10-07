<template>
   <v-form >
      <!-- <div class="mt-5 col-12 pa-0 d-flex flex-column pa-0 tw-rounded-2xl tw-shadow-md py-5 px-4 white"> -->
         <div class="col-12 pa-0 py-2 d-flex flex-column justify-start align-start">
            <div class="col-12 pa-0 d-flex flex-column pb-2">
               <span class="font-weight-bold textPrimary--text">Subject</span>
               <span class="text-caption grey--text">A Short and relevant subject will be make it easier to find tickets</span>
            </div>
            <div class="col-12 pa-0 d-flex flex-row align-self-center">
               <v-text-field
                  v-model="data.subject"
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
                     <div class="d-flex flex-row tw-h-6 align-center mr-1 grey--text">
                        <font-awesome-icon icon="ticket" class="tw-text-xs " />
                     </div>
                  </template>
               </v-text-field>
            </div>
         </div>
         <v-divider class="my-2"></v-divider>
         <div class="col-12 pa-0 py-2 d-flex flex-column justify-start align-start">
            <div class="col-12 pa-0 d-flex flex-column pb-2">
               <span class="font-weight-bold textPrimary--text">Ticket Type</span>
               <span class="text-caption grey--text">Choose the ticket category, assign team to handle the ticket and define ticket priorities.</span>
            </div>
            <div class="col-12 pa-0 d-flex flex-column flex-md-row align-self-center">
               <div :class="`col-12 pa-0 tw-transition-all tw-duration-300 tw-ease-in-out`">
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
                        <div class="text-caption textPrimary--text">Ticket Type</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div class="d-flex flex-row align-center mr-1 tw-h-6">
                           <font-awesome-icon icon="bookmark" class="tw-text-xs grey--text" />
                        </div>
                     </template>
                  </v-select>
               </div>
               <div v-if="ticketType == 2" class="col-12 col-md-8 pa-0 py-3 py-md-0 pl-3">
                  <v-select
                     v-model="data.impactProblem"
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
                        <div class="d-flex flex-row align-center tw-h-6 mr-1">
                           <font-awesome-icon icon="triangle-exclamation" class="tw-text-xs grey--text" />
                        </div>
                     </template>
                  </v-select>
               </div>
            </div>
         </div>
         <v-divider class="my-2"></v-divider>
         <div class="col-12 pa-0 py-2 d-flex flex-column justify-start align-start">
            <div class="col-12 pa-0 d-flex flex-column pb-2">
               <span class="font-weight-bold textPrimary--text">Label</span>
               <span class="text-caption grey--text">Choose the ticket category, assign team to handle the ticket and define ticket priorities.</span>
            </div>
            <div class="col-12 pa-0 d-flex flex-column flex-md-row align-self-center">
               <div class="col-12 col-md-4 pa-0">
                  <v-select
                     v-model="data.categoryId"
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
                        <div class="d-flex flex-row tw-h-6 align-center mr-1">
                           <font-awesome-icon icon="tags" class="tw-text-xs grey--text" />
                        </div>
                     </template>
                  </v-select>
               </div>
               <div class="col-12 col-md-4 pa-0 py-3 py-md-0 px-md-3">
                  <v-select
                     v-model="data.groupId"
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
                        <div class="d-flex flex-row tw-h-6 align-center mr-1">
                           <font-awesome-icon icon="user-group" class="tw-text-xs grey--text" />
                        </div>
                     </template>
                  </v-select>
               </div>
               <div class="col-12 col-md-4 pa-0">
                  <v-select
                     v-model="data.priority"
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
                        <div class="d-flex flex-row tw-h-6 align-center mr-1">
                           <font-awesome-icon icon="circle-check" class="tw-text-xs grey--text mr-1 mt-1 text-center " />
                        </div>
                     </template>
                  </v-select>
               </div>
            </div>
         </div>
         <v-divider class="my-2"></v-divider>
         <div class="col-12 pa-0 py-2">
            <div class="col-12 pa-0 py-2 d-flex flex-column justify-start align-start">
               <div class="col-12 pa-0 d-flex flex-column pb-2">
                  <span class="font-weight-bold textPrimary--text">Description</span>
                  <span class="text-caption grey--text">Contains notes or descriptions of tickets to make it easier for the team to resolve tickets</span>
               </div>
               <div class="col-12 pa-0 d-flex flex-row">
                  <v-textarea
                     v-model="data.desc"
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
            <div class="col-12 pa-0 py-2 d-flex flex-column justify-start align-start">
               <div class="col-12 pa-0 d-flex flex-column pb-2">
                  <span class="font-weight-bold textPrimary--text">Attachment</span>
                  <span class="text-caption grey--text">You can attach file in the form of a <span class="accent--text">pdf</span> or an image with the extension <span class="accent--text">jpg, png or gif</span></span>
               </div>
               <div class="col-12 pa-0 d-flex flex-row align-self-center">
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
                        <div class="d-flex flex-row tw-h-6 align-center mr-1">
                           <font-awesome-icon icon="paperclip" class="tw-text-xs grey--text" />
                        </div>
                     </template>
                  </v-file-input>
               </div>
            </div>
         </div>
         <v-divider class="my-2"></v-divider>
         <div class="col-12 pa-0 py-2 d-flex flex-column">
            <v-btn depressed color="primary" class="font-weight-bold text-capitalize text-caption rounded-lg textPrimary--text align-self-end">Save Ticket</v-btn>
         </div>
      <!-- </div> -->
   </v-form>
</template>

<script>
export default {
   data: () => ({
      
   }),
   props: ['data','name','comment','created','resolved'],
}
</script>