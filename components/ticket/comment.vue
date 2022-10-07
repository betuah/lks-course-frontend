<template>
   <v-hover v-slot="{ hover }">
      <div class="d-flex flex-column tw-shadow-md tw-rounded-2xl white px-5 py-4 mt-4">
         <div class="d-flex flex-row align-center">
            <v-avatar size="35">
               <img
                  :src="src"
                  :alt="name"
               >
            </v-avatar>
            <div class="d-flex flex-column ml-3">
               <div class="d-flex flex-row align-center">
                  <span class="textPrimary--text font-weight-bold">{{ name }}</span>
                  <v-chip v-if="resolved" x-small outlined color="success" :class="`ml-2`">
                     <span>Done</span>
                  </v-chip>
               </div>
               <span class="text-caption grey--text font-italic">{{ $moment(created).fromNow() }} ({{ $moment(created).format('ddd, DD MMMM YYYY') }} at {{ $moment(created).format('h:mm A') }})</span>
            </div>
            <v-spacer v-if="hover"></v-spacer>
            <v-btn v-if="hover" x-small icon plain :ripple="false">
               <font-awesome-icon :icon="['fas', 'trash-can']" class="tw-text-xs red--text align-self-center"/>
            </v-btn>
         </div>
         <v-divider class="my-3"></v-divider>
         <div class="d-flex flex-row text-body-2 font-weight-regular textPrimary--text">
            <div class="ml-3 mr-5">
               <font-awesome-icon :icon="['far', 'envelope']" class="tw-text-sm grey--text align-self-center"/>
            </div>
            <p>{{ comment }}</p>
         </div>
      </div>
   </v-hover>
</template>

<script>
export default {
   data: () => ({
      formData: null,
      categoryList: [
         {
            categoryId: 1,
            category: 'Problem'
         },
         {
            categoryId: 2,
            category: 'Installation'
         },
         {
            categoryId: 3,
            category: 'Internal Problem'
         },
         {
            categoryId: 4,
            category: 'New Infastructur'
         }
      ],
      priorityList: [
         {
            id: 1,
            text: 'Critical'
         },
         {
            id: 2,
            text: 'High'
         },
         {
            id: 3,
            text: 'Medium'
         },
         {
            id: 4,
            text: 'Low'
         }
      ],
      groupList: [
         {
            id: 1,
            text: 'NOC'
         },
         {
            id: 2,
            text: 'CSS'
         },
         {
            id: 3,
            text: 'FE'
         }
      ],
      typeList: [
         {
            id: 1,
            type: 'General'
         },
         {
            id: 2,
            type: 'Problem'
         },
         {
            id: 1,
            type: 'Dismatle'
         }
      ],
      problemList: [
         {
            id: 1,
            problem: 'Internet Access'
         },
         {
            id: 2,
            problem: 'Client Request'
         },
         {
            id: 3,
            problem: 'PON Indicator Blink'
         },
         {
            id: 4,
            problem: 'PON Indicator Loss'
         },
         {
            id: 5,
            problem: 'WAN Indicator Blink'
         },
         {
            id: 6,
            problem: 'WAN Indicator Down'
         },
         {
            id: 7,
            problem: 'Hardware Error'
         }
      ]
   }),
   props: ['src','name','comment','created','resolved'],
}
</script>