import { createStore } from 'vuex'
import { auth } from '@/store/modules/auth'
import { claim } from '@/store/modules/claim'
export default createStore({
  state: {
    /* account: {
      username: "tanza",
      password: ""
    } */
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    
  },
  modules: {
    auth,
    claim
  }
})

