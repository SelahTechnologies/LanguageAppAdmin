import Vue from 'vue'
import Vuex from 'vuex'
import general from './general'
import question from './question'
import user from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
  modules: {
    general,
    question,
    user,
  },
})
