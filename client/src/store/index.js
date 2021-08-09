import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedSate from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedSate()],
  state: {
    userInfoLiveChat: {}
  },
  mutations: {
    SET_USERDATA(state, userObj) {
      state.userInfoLiveChat = userObj
    }
  },
  actions: {
  },
  modules: {
  }
})
