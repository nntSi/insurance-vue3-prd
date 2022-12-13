<template>
  <!-- <div style="margin-left: 400px;">
      {{islogin.loginState.status}}
    </div> -->
  <div>
    <SideBarVue v-if="islogin.loginState.status"/>
    <div v-bind:class="[islogin.loginState.status ? 'content-route' : '']">
      <HeaderComponentVue v-if="islogin.loginState.status"/>
      <router-view />
    </div>
  </div>
</template>

<style>

</style>

<script setup lang="ts">
//import
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
// component
import SideBarVue from "./components/SideBar.vue";
import HeaderComponentVue from "./components/HeaderComponent.vue";

const store = useStore();
const islogin = reactive({loginState: store.getters['auth/myAccount']});

onMounted(() => {
  store.dispatch({
    type : 'auth/restoreLogin',
  });
  
});

</script>
<style>
.content-route{
  margin-left: 300px;
  padding-right: 40px;
  padding-top: 15px;
}
</style>