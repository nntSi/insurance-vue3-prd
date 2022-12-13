import router from "@/router";
import axios from "axios";
import api from "@/services/api";
import { server, apiUrl } from "@/services/constants";

export const auth = {
  namespaced: true,
  state: () => ({
    loginState: {
      status: false,
      stateFail: false,
      username: "",
      token: "",
      title: "",
      firstname: "",
      lastname: "",
      mobile: "",
      position: "",
      department: "",
      email: ""
    },
  }),
  mutations: {
    setAccount (state:any, payload:any) {
      /* state.loginState.account = payload */
      state.loginState.username = payload.username;
      state.loginState.token = payload.token;
      state.loginState.state = payload.state;
      state.loginState.token = payload.token;
      state.loginState.title = payload.title;
      state.loginState.firstname = payload.firstname;
      state.loginState.lastname = payload.lastname;
      state.loginState.mobile = payload.mobile;
      state.loginState.position = payload.position;
      state.loginState.department = payload.department;
      state.loginState.email = payload.email;
    },
    setState (state:any, payload:any) {
      state.loginState.stateFail = payload
      state.loginState.status = payload
    },
    setLogin (state:any){
      state.loginState.status = true
    },
    logout (state:any){
      state.loginState.username = "";
      state.loginState.token = "";
      state.loginState.state = "";
      state.loginState.token = "";
      state.loginState.title = "";
      state.loginState.firstname = "";
      state.loginState.lastname = "";
      state.loginState.mobile = "";
      state.loginState.position = "";
      state.loginState.department = "";
      state.loginState.email = "";
      state.loginState.status = false;
      state.loginState.stateFail = false;
    },
    setAccountBeforeRefresh (state:any, payload:any){
      state.loginState.username = payload.username;
      state.loginState.token = payload.token;
      state.loginState.state = payload.state;
      state.loginState.token = payload.token;
      state.loginState.title = payload.title;
      state.loginState.firstname = payload.firstname;
      state.loginState.lastname = payload.lastname;
      state.loginState.mobile = payload.mobile;
      state.loginState.position = payload.position;
      state.loginState.department = payload.department;
      state.loginState.email = payload.email;
      state.loginState.status = true;
    }
  },
  getters: {
    myAccount(state: any) {
      return state.loginState;
    },
    loginState(state:any) {
      console.log(state.loginState.status)
      return state.loginState.status
    }
  },
  actions: {
    login ({commit, state}:any, payload:any) {
      /* commit('setusername', payload.login_state.username) */
      axios.post( apiUrl + "/login", payload.login_state)
      .then(response => {
        /* console.log(response.data.state) */
        if (response.data.state == true){
          router.push('/home')
          commit('setAccount', response.data.userdata[0])
          commit('setState', response.data.state)
          /* console.log(response.data.state) */
          api.setAccount(response.data.userdata[0].username, response.data.userdata[0].token, response.data.userdata[0].title, response.data.userdata[0].firstname, response.data.userdata[0].lastname, response.data.userdata[0].email, response.data.userdata[0].mobile, response.data.userdata[0].position, response.data.userdata[0].department);
          /* localStorage.setItem(server.USERNAME, response.data.userdata[0].username)
          localStorage.setItem(server.TOKEN_KEY, response.data.userdata[0].token) */
        }else{
          console.log(response.data)
          commit('setState', !response.data.state)
        }
      })
    },
    restoreLogin({commit}:any){
      if (api.isLoggedIn() == true){
        /* console.log(api.getAccount()) */
        /* commit('setLoggin'); */
        commit('setAccountBeforeRefresh', api.getAccount());
      }else{
        api.clearStateLocal();
        router.push('/')
      }
    },
    logout({commit}:any){
      commit('logout');
      api.clearStateLocal();
      router.push('/')
    }
  },
};
