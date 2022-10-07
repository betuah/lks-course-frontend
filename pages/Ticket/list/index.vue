<template>
   <div class="col-12 fill-height pa-5">
      <div
         class="col-12 d-flex flex-column flex-md-row align-md-center pa-0 tw-bg-white py-5 px-4 tw-rounded-2xl tw-shadow-xl"
      >
         <div class="col-12 col-md-7 pa-0 d-flex flex-column">
            <span
               class="text-h5 font-weight-light font-weight-medium textPrimary--text"
               >Ticket List</span
            >
            <span class="text-caption grey--text"
               >Ticketing system helps you accomplish everything you need to do
               to resolve the day-to-day IT tickets faster than ever.</span
            >
         </div>
         <!-- <v-spacer></v-spacer> -->
         <div
            class="col-12 col-md-5 pa-0 d-none d-md-flex flex-row justify-end my-2 my-md-0 pr-md-3 flex-wrap"
         >
            <div class="d-flex flex-column justify-center align-center tw-w-10">
               <span class="tw-text-xs primary--text font-weight-medium"
                  >Closed</span
               >
               <span class="font-weight-bold textPrimary--text">{{
                  closeCount
               }}</span>
            </div>
            <v-divider vertical inset class="mx-7"></v-divider>
            <div class="d-flex flex-column justify-center align-center tw-w-10">
               <span class="tw-text-xs primary--text font-weight-medium"
                  >Open</span
               >
               <span class="font-weight-bold textPrimary--textt">{{
                  openCount
               }}</span>
            </div>
            <v-divider vertical inset class="mx-7"></v-divider>
            <div class="d-flex flex-column justify-center align-center tw-w-10">
               <span class="tw-text-xs primary--text font-weight-medium"
                  >Progress</span
               >
               <span class="font-weight-bold textPrimary--text">{{
                  pendingCount
               }}</span>
            </div>
            <v-divider vertical inset class="mx-7"></v-divider>
            <div class="d-flex flex-column justify-center align-center tw-w-10">
               <span class="tw-text-xs primary--text font-weight-medium"
                  >Done</span
               >
               <span class="font-weight-bold textPrimary--text">{{
                  resolveCount
               }}</span>
            </div>
         </div>
      </div>
      <div
         class="col-12 mt-4 d-flex flex-column flex-md-row align-md-center pa-0 tw-bg-white tw-shadow-md tw-rounded-xl px-4 py-5"
      >
         <div class="col-12 col-md-2 pa-0 mr-md-3 d-flex flex-row">
            <v-menu
               ref="calendarMenu"
               v-model="calendarMenu"
               :close-on-content-click="false"
               :return-value.sync="dates"
               transition="scale-transition"
               offset-y
               min-width="auto"
               rounded="lg"
            >
               <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                     v-model="dateRangeText"
                     label="Picker in menu"
                     readonly
                     outlined
                     dense
                     hide-details="auto"
                     class="rounded-lg text-caption"
                     v-bind="attrs"
                     v-on="on"
                  >
                     <template v-slot:label>
                        <div class="tw-text-sm">Created Date</div>
                     </template>
                     <template v-slot:prepend-inner>
                        <div class="d-flex flex-row tw-h-6 align-center mr-1">
                           <font-awesome-icon
                              icon="fa-solid fa-calendar-days"
                              class="tw-text-sm grey--text"
                           />
                        </div>
                     </template>
                  </v-text-field>
               </template>
               <v-date-picker
                  v-model="dates"
                  range
                  no-title
                  scrollable
                  color="accent"
                  class="tw-border-none"
               >
                  <v-spacer></v-spacer>
                  <v-btn text small color="grey" @click="calendarMenu = false">
                     Cancel
                  </v-btn>
                  <v-btn text small color="primary" @click="resetDate()">
                     Reset
                  </v-btn>
                  <v-btn
                     text
                     small
                     color="primary"
                     @click="$refs.calendarMenu.save(dates)"
                  >
                     OK
                  </v-btn>
               </v-date-picker>
            </v-menu>
         </div>
         <div class="d-flex mr-md-3 mt-2 mt-md-0 flex-grow-1">
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
         <div class="d-flex flex-row mt-2 mt-md-0">
            <v-menu
               rounded="lg"
               offset-y
               transition="slide-y-transition"
               :close-on-content-click="false"
            >
               <template v-slot:activator="{ attrs, on }">
                  <v-btn
                     v-bind="attrs"
                     v-on="on"
                     color="textPrimary"
                     outlined
                     class="rounded-lg text-capitalize text-caption"
                     >Category
                     <font-awesome-icon
                        icon="fa-solid fa-angle-down"
                        transform="shrink-5"
                        class="tw-text-sm grey--text"
                     />
                  </v-btn>
               </template>

               <v-list dense>
                  <v-list-item-group
                     v-model="category"
                     active-class="tw-text-sm primary--text"
                  >
                     <v-hover v-slot="{ hover }">
                        <v-list-item
                           :class="`text-caption ${
                              hover && 'primary--text'
                           } tw-transition-all tw-ease-in-out tw-duration-200`"
                           @click="filterCategory(0)"
                        >
                           All Category
                        </v-list-item>
                     </v-hover>
                     <v-hover
                        v-for="item in categoryList"
                        :key="item.key"
                        v-slot="{ hover }"
                     >
                        <v-list-item
                           :class="`text-caption ${
                              hover && 'primary--text'
                           } tw-transition-all tw-ease-in-out tw-duration-200`"
                           @click="filterCategory(item.categoryId)"
                        >
                           {{ item.category }}
                        </v-list-item>
                     </v-hover>
                  </v-list-item-group>
               </v-list>
            </v-menu>
            <v-btn
               depressed
               color="primary"
               class="rounded-lg text-capitalize ml-2 textPrimary--text font-weight-bold text-caption"
               @click="$router.push({ path: '/ticket/list/add' })"
               >New Ticket</v-btn
            >
         </div>
      </div>
      <div
         class="d-none d-md-flex flex-row flex-wrap mb-2 mt-2 justify-center align-end mt-5"
      >
         <div class="mr-2">
            <span class="text-subtitle-2 font-weight-bold accent--text">{{
               listData.length
            }}</span>
            <span class="text-subtitle-2">Ticket</span>
         </div>
         <div>
            <v-btn x-small icon plain :ripple="false" @click="prevTable()">
               <font-awesome-icon
                  icon="angle-left"
                  class="tw-text-xs tw-text-gray-500"
               />
            </v-btn>
            <span class="text-caption">Page {{ page }} of {{ pageCount }}</span>
            <v-btn x-small icon plain :ripple="false" @click="nextTable()">
               <font-awesome-icon
                  icon="angle-right"
                  class="tw-text-xs tw-text-gray-500"
               />
            </v-btn>
         </div>
         <v-spacer></v-spacer>
         <div class="">
            <v-tabs height="35" background-color="transparent" ripple="false">
               <v-tab
                  :ripple="false"
                  class="text-caption"
                  @click="filterState(10)"
                  >All</v-tab
               >
               <v-tab
                  :ripple="false"
                  class="text-caption"
                  @click="filterState(1)"
               >
                  <span :class="`mr-1 ${changeCriticalColor(1)}`">{{
                     criticalCount
                  }}</span>
                  Critical
               </v-tab>
               <v-tab
                  :ripple="false"
                  class="text-caption"
                  @click="filterState(2)"
               >
                  <span :class="`mr-1 ${changeCriticalColor(2)}`">{{
                     highCount
                  }}</span>
                  High
               </v-tab>
               <v-tab
                  :ripple="false"
                  class="text-caption"
                  @click="filterState(3)"
               >
                  <span :class="`mr-1 ${changeCriticalColor(3)}`">{{
                     mediumCount
                  }}</span>
                  Medium
               </v-tab>
               <v-tab
                  :ripple="false"
                  class="text-caption"
                  @click="filterState(4)"
               >
                  <span :class="`mr-1 ${changeCriticalColor(4)}`">{{
                     lowCount
                  }}</span>
                  Low
               </v-tab>
            </v-tabs>
         </div>
      </div>
      <div class="col-12 pa-0 mt-3 mt-md-0 d-flex flex-column">
         <v-data-table
            :headers="headers"
            :items="listData"
            hide-default-header
            hide-default-footer
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
            loading-text="Loading data!"
            no-data-text="Empty ticket."
            no-results-text="Ticket Not Found!"
            color="primary"
            class="elevation-0 bgPrimary tw-border-2 tw-min-h-40"
         >
            <template v-slot:item="{ item }">
               <div
                  class="col-12 my-2 my-md-4 tw-bg-white rounded-lg d-flex flex-column align-md-start pa-1 pa-md-1 tw-border-2 tw-border-primary"
               >
                  <div
                     class="col-12 d-flex flex-column flex-md-row pa-0 align-md-center"
                  >
                     <div class="d-flex flex-column col-12 col-md-10">
                        <div class="col-12 pa-0 d-flex flex-row align-center">
                           <NuxtLink :to="`/ticket/list/${item.ticketNumber}`">
                              <span
                                 class="tw-text-base md:tw-text-lg tw-truncate hover:tw-underline hover:tw-decoration-accent textPrimary--text"
                                 >{{ item.subject }}</span
                              >
                           </NuxtLink>
                           <v-spacer class="d-none d-md-block"></v-spacer>
                           <v-chip
                              x-small
                              outlined
                              :color="`${changeStateColor(item.status)}`"
                              :class="`ml-3 `"
                           >
                              <span>{{ changeState(item.status) }}</span>
                           </v-chip>
                        </div>
                        <div
                           class="col-12 pa-0 d-flex flex-column flex-md-row align-md-center"
                        >
                           <div
                              class="d-flex flex-column flex-md-row align-md-center"
                           >
                              <span
                                 class="tw-text-xs accent--text font-weight-bold"
                                 >{{ item.creator }}</span
                              >
                              <div class="d-none d-md-flex">
                                 <iconify
                                    icon="ci:dot-03-m"
                                    class="tw-text-xs grey--text"
                                 />
                              </div>
                              <span class="tw-text-xs grey--text"
                                 >Created:
                                 {{
                                    $moment(item.start_date).format("LL")
                                 }}</span
                              >
                              <div class="d-none d-md-flex">
                                 <iconify
                                    icon="ci:dot-03-m"
                                    class="d-none d-md-flex tw-text-xs grey--text"
                                 />
                              </div>
                              <span class="tw-text-xs grey--text"
                                 >Last Updated:
                                 {{ $moment(item.start_date).fromNow() }}</span
                              >
                           </div>
                           <v-spacer></v-spacer>
                           <span class="tw-text-xs primaryText--text">{{
                              item.ticketNumber
                           }}</span>
                        </div>
                     </div>
                     <div class="d-flex flex-column col-12 col-md-2">
                        <div
                           class="d-flex flex-row align-md-center justify-start"
                        >
                           <span class="col-md-1 pa-0">
                              <font-awesome-icon
                                 icon="circle-check"
                                 transform="shrink-5"
                                 :class="`tw-text-sm ${changeCriticalColor(
                                    item.priority
                                 )}`"
                              />
                           </span>
                           <span
                              :class="`ml-md-2 tw-text-xs tw-font-semibold ${changeCriticalColor(
                                 item.priority
                              )}`"
                              >{{ priorityName(item.priority) }}</span
                           >
                        </div>
                        <div class="d-flex flex-row align-center">
                           <span class="col-md-1 pa-0">
                              <font-awesome-icon
                                 icon="tags"
                                 transform="shrink-5"
                                 class="tw-text-sm tw-text-gray-500"
                              />
                           </span>
                           <span class="ml-2 tw-text-xs tw-font-semibold">{{
                              item.category
                           }}</span>
                        </div>
                        <div class="d-flex flex-row align-center">
                           <span class="col-md-1 pa-0">
                              <font-awesome-icon
                                 icon="user-group"
                                 transform="shrink-5"
                                 class="tw-text-sm tw-text-gray-500"
                              />
                           </span>
                           <span class="ml-2 tw-text-xs tw-font-semibold">{{
                              item.creatorGroup
                           }}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </template>
         </v-data-table>
         <div class="align-self-end">
            <v-btn x-small icon plain :ripple="false" @click="prevTable()">
               <font-awesome-icon
                  icon="angle-left"
                  class="tw-text-xs tw-text-gray-500"
               />
            </v-btn>
            <span class="text-caption textPrimary--text"
               >Page <span class="accent--text">{{ page }}</span> of
               <span class="accent--text">{{ pageCount }}</span></span
            >
            <v-btn x-small icon plain :ripple="false" @click="nextTable()">
               <font-awesome-icon
                  icon="angle-right"
                  class="tw-text-xs tw-text-gray-500"
               />
            </v-btn>
         </div>
      </div>
   </div>
</template>

<script>
import Breadcump from "~/components/Breadcump.vue";
import { ticket } from "./ticket";
export default {
   components: { Breadcump },
   data: () => ({
      items: [
         {
            text: "Ticket System",
            disabled: true,
            href: "breadcrumbs_dashboard",
         },
         {
            text: "List",
            disabled: true,
            href: "ticket/list",
         },
      ],
      search: "",
      status: 10,
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,
      calendarMenu: false,
      dates: [
         new Date("1995-07-27").toISOString().substr(0, 10),
         new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
      ],
      category: 0,
      categoryList: [
         {
            categoryId: 1,
            category: "Custumer Problem",
         },
         {
            categoryId: 2,
            category: "Internal Problem",
         },
         {
            categoryId: 3,
            category: "New Installation",
         },
         {
            categoryId: 4,
            category: "Dismantle",
         },
         {
            categoryId: 5,
            category: "New Infrastructor",
         },
      ],
      headers: [
         {
            text: "Ticket Number",
            sortable: false,
            value: "ticketId",
            isShow: true,
         },
         { text: "Title", sortable: false, value: "title", isShow: true },
         { text: "creator", sortable: false, value: "creator", isShow: true },
         { text: "created", sortable: false, value: "created", isShow: true },
         { text: "desc", sortable: false, value: "desc", isShow: true },
      ],
      desserts: [],
      ticketData: [],
   }),
   computed: {
      listData() {
         return this.desserts
            .filter(
               (item) =>
                  this.dates.length > 1 &&
                  this.$moment(item.start_date).isBetween(
                     this.dates[0],
                     this.dates[1]
                  )
            )
            .filter((item) =>
               this.status < 5 ? item.priority == this.status : true
            )
            .filter((item) =>
               item.subject.toLowerCase().includes(this.search.toLowerCase())
            );
      },
      dateRangeText() {
         if (this.dates.length > 1) {
            if (
               this.$moment(this.dates[0]).isBefore(this.$moment(this.dates[1]))
            ) {
               return this.dates.join(" - ");
            } else {
               this.dates = [this.dates[1], this.dates[0]];
               return this.dates.join(" - ");
            }
         } else {
            return this.dates.join(" - ");
         }
      },
      showHeaders() {
         return this.headers.filter((i) => i.isShow === true);
      },
      vScollheight() {
         switch (this.$vuetify.breakpoint.name) {
            case "xs":
               return 300;
            case "sm":
               return 300;
            case "md":
               return 100;
            case "lg":
               return 100;
            case "xl":
               return 100;
         }
      },
      closeCount() {
         return this.listData.filter((item) => item.status == 0).length;
      },
      pendingCount() {
         return this.listData.filter((item) => item.status == 1).length;
      },
      openCount() {
         return this.listData.filter((item) => item.status == 2).length;
      },
      resolveCount() {
         return this.listData.filter((item) => item.status == 3).length;
      },
      criticalCount() {
         return this.listData.filter((item) => item.priority == 1).length;
      },
      highCount() {
         return this.listData.filter((item) => item.priority == 2).length;
      },
      mediumCount() {
         return this.listData.filter((item) => item.priority == 3).length;
      },
      lowCount() {
         return this.listData.filter((item) => item.priority == 4).length;
      },
   },
   mounted() {
      this.desserts = [...ticket];
      this.ticketData = [...ticket];
   },
   methods: {
      resetDate() {
         this.dates = [
            new Date("1995-07-27").toISOString().substr(0, 10),
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
               .toISOString()
               .substr(0, 10),
         ];
      },
      nextTable() {
         this.page = this.page == this.pageCount ? this.page : this.page + 1;
      },
      prevTable() {
         this.page = this.page > 1 ? this.page - 1 : 1;
      },
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
            ? "Progress"
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
      selectHeader(value) {
         this.headers = this.headers.map((i) =>
            i.value === value ? { ...i, isShow: !i.isShow } : { ...i }
         );
      },
      filterCategory(value) {
         if (value > 0) {
            this.desserts = this.ticketData.filter(
               (item) => item.categoryId == value
            );
         } else {
            this.desserts = this.ticketData;
         }
      },
      filterState(value) {
         this.status = value < 5 ? value : 10;
      },
   },
};
</script>
