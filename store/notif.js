export const state = () => ({
   show: false,
   color: "success",
   icon: "check_circle",
   message: ``,
});

export const getters = {};

export const mutations = {
   SHOW(state, { type, message }) {
      state.show = true;
      state.message = `${message}`;

      switch (type) {
         case "success":
            state.color = "success";
            state.icon = "fas fa-circle-check";
            break;

         case "info":
            state.color = "light-blue";
            state.icon = "fas info-circle";
            break;

         case "warning":
            state.color = "warning";
            state.icon = "fas fa-exclamation-circle";
            break;

         case "error":
            state.color = "error";
            state.icon = "fas fa-bug";
            break;
      }
   },
   NOT_SHOW(state, value) {
      state.show = value;
   },
};

export const actions = {};
