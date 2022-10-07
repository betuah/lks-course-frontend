export const state = () => ({
   status: true,
});

export const getters = {
   getNavStatus(state, getters, rootState) {
      return state.status;
   },
};

export const mutations = {
   CHANGE_NAV(state) {
      state.status = !state.status;
   },
   SET_NAV(state, value) {
      state.status = value;
   },
};

export const actions = {
   changeNav({ commit }) {
      commit("CHANGE_NAV");
   },
};
