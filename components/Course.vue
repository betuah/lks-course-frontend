<template>
   <div class="d-flex flex-row tw-border tw-border-gray-300 pa-2 tw-rounded-lg">
      <div class="tw-border tw-border-gray-200 tw-h-50 tw-w-50 tw-rounded-lg">
         <img
            class="tw-object-cover tw-object-center tw-rounded-lg"
            height="130"
            width="180"
            :src="data.coursePics"
         />
      </div>
      <div class="d-flex flex-column flex-grow-1 ml-4">
         <div class="d-flex flex-row flex-grow-1">
            <span class="text-subtitle-1 font-weight-bold">
               {{ data.courseName }}
            </span>
            <v-spacer></v-spacer>
            <v-btn icon small @click="delCourse(data.courseId)">
               <font-awesome-icon icon="trash" class="tw-text-xs error--text" />
            </v-btn>
         </div>
         <div class="d-flex flex-row">
            <span
               class="text-caption tw-rounded-md px-2 py-1 tw-shadow-sm tw-bg-green-400"
            >
               {{ data.courseCategory }}
            </span>
            <span
               class="ml-1 text-caption white--text tw-rounded-md px-2 py-1 tw-shadow-sm tw-bg-calmBlue"
            >
               {{ data.courseLevel }}
            </span>
         </div>
         <div class="text-caption tw-truncate mt-2">{{ data.courseDesc }}</div>
         <v-spacer></v-spacer>
         <div class="d-flex flex-row align-center">
            <span class="font-weight-bold tw-text-xl"
               >Rp. {{ data.price }}</span
            >
            <v-spacer></v-spacer>
            <div class="pa-0 mr-1">
               <div
                  @click="addToCart(data)"
                  class="tw-rounded-lg tw-shadow-md tw-bg-yellow-400 py-1 px-4 d-flex flex-column align-center justify-center hover:tw-bg-gray-500 hover:tw-text-white tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer"
               >
                  <span class="text-caption font-weight-bold">Add to cart</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "Course",
   props: {
      data: {
         type: Object,
      },
      addCart: {
         type: Function,
      },
      deleteCourse: {
         type: Function,
      },
   },
   data() {
      return {
         description: "A blog post about some stuff",
      };
   },
   methods: {
      addToCart(data) {
         this.addCart(data);
      },
      async delCourse(id) {
         this.deleteCourse(id);
      },
   },
};
</script>
