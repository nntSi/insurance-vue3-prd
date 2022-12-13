<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center" id="login_view" name="login_view">
    <div class="border bg-light rounded shadow-sm p-5" v-if="show_login">
      <!-- <img src="../assets/logo.png" class="mb-4"> -->
      <h1 class="mb-0 text-center">SURVEY HUB</h1>
      <p class="mb-4 text-center">เคลมของ <b>"ฉัน"</b> นั้นไวกว่า <b>"แสง"</b></p>
      <div class="input-group input-group-sm mb-3 border w-100">
        <input type="text" v-model="login_state.username" class="form-control border-0" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        <span class="input-group-text border-0" id="basic-addon1"><i class="bi bi-person"></i></span>
      </div>
      <div class="input-group input-group-sm mb-3 border w-100">
        <input type="password" v-model="login_state.password" class="form-control border-0" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
        <span class="input-group-text border-0" id="basic-addon1"><i class="bi bi-key"></i></span>
      </div>
      <p style="font-size: 12px;" v-if="state.loginState.stateFail" class="text-danger text-center">Username or password was wrong!!</p>
      <div class="w-100 d-flex justify-content-center mb-3 border-bottom pb-4">
        <button class="btn btn-sm btn-darkblue d-flex align-items-center" @click="Login">
          <div class="spinner-border spinner-border-sm me-2 text-light" v-if="wait_load_state" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mb-0" v-if="!wait_load_state">เข้าสู่ระบบ</p>
          <p class="mb-0" v-if="wait_load_state">เข้าสู่ระบบ...</p>
        </button>
      </div>
      <div class="w-100 d-flex justify-content-center">
        <!-- not use @click="toggleShow" for regis -->
        <a class="text-decoration-none" type="button" >ลงทะเบียน</a>
      </div>
    </div>
    <!-- sign up card -->
    <form @submit.prevent="signup" class="d-flex flex-column justify-content-center align-items-center w-100">
      <div class="border bg-light rounded shadow-sm p-5 sign-up mb-3" v-if="!show_login">
        <h1 class="mb-2 border-bottom pb-2 mb-3">ลงทะเบียน</h1>
          <div class="row">
            <div class="col-xl-12 mb-sm-2">
              <label for="title"><b>Username</b></label>
              <input type="text" v-model="account.username" class="form-control form-control-sm fm-square" placeholder="nntsi" required>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 mb-sm-2">
              <label for="title"><b>Password</b></label>
              <input type="password" v-model="account.password" class="form-control form-control-sm fm-square" placeholder="zuMo@#11" required>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 mb-sm-2">
              <label for="title"><b>Re-password</b></label>
              <input type="password" v-model="rePassword" class="form-control form-control-sm fm-square" placeholder="ใส่รหัสผ่านอีกครั้ง" required>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-2 mb-sm-2">
              <label for="title"><b>Title</b></label>
              <input type="text" v-model="account.title" class="form-control form-control-sm fm-square" placeholder="นาย" required>
            </div>
            <div class="col-xl-5 mb-sm-2">
              <label for="title"><b>Firstname</b></label>
              <input type="text" v-model="account.firstname" class="form-control form-control-sm fm-square" placeholder="คนดีคนเดิม" required>
            </div>
            <div class="col-xl-5 mb-sm-2">
              <label for="title"><b>Lastname</b></label>
              <input type="text" v-model="account.lastname" class="form-control form-control-sm fm-square" placeholder="มนุษย์โลก" required>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-7 mb-sm-2">
              <label for="title"><b>Email</b></label>
              <input type="text" v-model="account.email" class="form-control form-control-sm fm-square" placeholder="wloosama@example.com" required>
            </div>
            <div class="col-xl-5 mb-sm-2">
              <label for="title"><b>Mobile number</b></label>
              <input type="text" v-model="account.mobile" class="form-control form-control-sm fm-square" placeholder="+66" required>
            </div>
          </div>
          <div class="d-flex align-items-center mt-3" v-if="status_regis">
            <div class="spinner-border spinner-border-sm text-info me-3" role="status">
              <span class="visually-hidden"></span>
            </div>
            <p class="mb-0 text-success">{{state_regis}}</p>
          </div>
      </div>
      <div class="w-35 d-flex justify-content-end" v-if="!show_login">
        <button type="submit" class="btn btn-sm btn-darkblue rounded d-flex align-items-center ps-5 pe-5 shadow-sm me-2">ยืนยันการลงทะเบียน</button>
        <button class="btn btn-sm btn-gray rounded d-flex align-items-center ps-5 pe-5 shadow-sm" @click="toggleShow">ยกเลิก</button>
      </div>
    </form>
    <!-- <p>{{account}}{{rePassword}}</p> -->
  </div>

</template>

<script setup lang="ts">
import router from "@/router";
import { apiUrl } from "@/services/constants";
import axios from "axios";
import { response } from "express";
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore()

const show_login = ref(true);
const toggleShow = () => {
  show_login.value = !show_login.value;
  status_regis.value = false;
};

/* Authen */
const wait_load_state = ref(false);
const login_state = reactive({username:"", password:""})
const state = reactive({loginState: store.getters['auth/myAccount']});
const Login = () => {
  wait_load_state.value = !wait_load_state.value
  setTimeout(function() {
    store.dispatch({
      type : 'auth/login',
      login_state
    });
    wait_load_state.value = false
  }, 1000);
};

/* Register */
const state_regis = ref("");
const status_regis = ref(false)
const rePassword = ref("");
const account = reactive({
  username: "",
  password: "",
  title: "",
  firstname: "",
  lastname: "",
  mobile:"",
  email:"",
  position:"",
  department:"",
  tax_id:"",
  token:""
});
const signup = () => {
  console.log(account);
  axios.post(apiUrl + "/users/register", account)
  .then(response => {
    console.log(response.data);
    state_regis.value = response.data.message;
    status_regis.value = !status_regis.value;
    setTimeout(function() {
      account.username = "";
      account.password = "";
      account.title = "";
      account.firstname = "";
      account.lastname = "";
      account.mobile = "";
      account.email = "";
      account.position = "";
      account.department = "";
      account.tax_id = "";
      account.token = "";
      rePassword.value = ""
      show_login.value = !show_login.value;
    }, 1000);
  });
}
onMounted(() => {
  if(state.loginState.status == true){
    router.push('/home')
  }
});

</script>

<style scoped>
  .container-fluid{
    height: 100vh;
  }
  .container-fluid img{
    width: 250px;
  }
  .input-group{
    width: 220px;
    border-radius: 20px;
  }
  .form-control{
    padding-left: 15px;
    border-radius: 20px;
  }
  .input-group-text{
    border-radius: 20px;
    padding-right: 10px;
    background: #fff;
  }
  p{
    font-size: 14px;
  }
  h1{
    font-weight: 700;
  }
/*   h1{
    font-size: 55px;
  } */
</style>
