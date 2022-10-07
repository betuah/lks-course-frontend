<template>
   <div>
      <v-dialog v-model="visible" width="unset">
         <div
            class="d-flex flex-column tw-shadow-md justify-center tw-rounded-xl white tw-w-2"
         >
            <v-progress-linear
               :rounded="false"
               color="error"
               :value="progress"
            ></v-progress-linear>
            <div class="d-flex flex-column tw-rounded-xl pa-4 px-6">
               <div class="text-subtitle-1 font-weight-bold error--text">
                  {{ title }}
               </div>
               <div v-html="message" class="text-caption"></div>
               <div class="d-flex justify-end mt-6">
                  <v-spacer></v-spacer>
                  <v-btn
                     small
                     plain
                     color="success"
                     text
                     class="font-weight-bold text-capitalize mr-2"
                     @click="_cancel()"
                  >
                     Cancel {{ countDownInterval }}
                  </v-btn>
                  <v-btn
                     small
                     depressed
                     color="error"
                     class="font-weight-bold text-caption"
                     @click="_confirm()"
                  >
                     Confirm
                  </v-btn>
               </div>
            </div>
         </div>
      </v-dialog>
   </div>
</template>

<script>
export default {
   name: "ALertConfirm",
   data: () => ({
      visible: false,
      title: "",
      message: "",
      timeout: 7,
      value: 0,
      count: 0,
      progress: 0,
      interval: null,
      countDownInterval: 8,
      resolvePromise: undefined,
      rejectPromise: undefined,
   }),

   computed: {
      getTimeOut() {
         return this.timeout ? this.timeout * 1000 : 0;
      },
   },

   methods: {
      show(title, text) {
         this.visible = true;
         this.title = title;
         this.message = text;
         this.countDownInterval = this.timeout + 1;
         this.closeCount();

         return new Promise((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
         });
      },
      _confirm() {
         clearInterval(this.interval);
         this.value = 0;
         this.progress = 0;
         this.visible = false;
         this.resolvePromise(true);
      },
      _cancel() {
         clearInterval(this.interval);
         this.value = 0;
         this.progress = 0;
         this.visible = false;
         this.resolvePromise(false);
      },
      closeCount() {
         if (this.getTimeOut < 1) {
            return;
         }

         clearInterval(this.interval);

         this.count = this.timeout ? this.timeout : 0;
         this.interval = setInterval(() => {
            if (this.value === this.getTimeOut) {
               this._cancel();
               return;
            }

            if (this.value % 1000 == 0) {
               this.countDownInterval--;
               this.count--;
            }

            this.value = this.value + 100;
            this.progress = Math.round((this.value / this.getTimeOut) * 100);
         }, 100);
      },
   },
};
</script>
