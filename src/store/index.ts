import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, payload) {
      try {
        state.user = JSON.parse(payload)
        window.localStorage.setItem('user', payload)
      } catch (error) {
        console.log(error)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
