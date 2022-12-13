<template>
  <div class="card-light bg-light shadow mb-3">
    <div class="w-100 d-flex align-items-center">
      <div class="position-relative p-0 around-img mb-0 d-flex align-items-center justify-content-center">
        <img src="https://i.pinimg.com/564x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg" class="profile-img border">
        <span class="position-absolute top-50 start-100 translate-middle bg-danger border border-light rounded-circle">
        </span>
      </div>
      <p class="mb-0 ms-3"><b>{{state.loginState.title}}</b> {{state.loginState.firstname}} {{state.loginState.lastname}} <b>ตำแหน่ง</b> <span class="badge bg-warning text-dark">{{state.loginState.position}}</span></p>
      <a type="button" class="ms-auto me-3 text-decoration-none fw-bold" @click="logout">ออกจากระบบ</a>
    </div>
  </div>
</template>

<style>

</style>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({loginState: store.getters['auth/myAccount']});
// on create
/* onMounted(() => {
  
}); */
const logout = () => {
  store.dispatch({
    type : 'auth/logout',
  });
}

</script>

<style scoped>
a:hover{
 color: #E05538;
}
a{
  font-size: 16px;
}
</style>