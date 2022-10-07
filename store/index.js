export const state = () => ({
   selectedCompany: null,
});

export const getters = {
   getCompany(state, getters, rootState) {
      return state.selectedCompany;
   },
};

export const mutations = {
   SET_COMPANY(state, value) {
      state.selectedCompany = value;
   },
};

export const actions = {
   async nuxtServerInit({ dispatch, commit }, { res, req }) {
      if (this.$auth.loggedIn) {
         commit("SET_COMPANY", this.$auth.user.default_company);
      }
   },
};
