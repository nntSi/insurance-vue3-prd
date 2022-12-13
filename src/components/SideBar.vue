<template>
  <aside class="sidebar shadow">
    <div class="main d-flex flex-column justify-content-between h-100">
      <!-- top -->
      <div class="sidebar-top w-100">
        <!-- img -->
        <div class="sidebar-logo d-flex flex-column justify-content-center align-items-center w-100 mb-3 pb-3 border-bottom">
          <h1 class="mb-0 text-center">SURVEY HUB</h1>
          <p class="mb-0 mt-0 text-end">ระบบการทำเคลม เวอร์ชั่น 1</p>
        </div>
        <!-- search -->
        <div class="sidebar-search d-flex align-items-center mb-2">
          <i class="bi bi-search me-1"></i>
          <input type="text" class="form-control form-control-sm" placeholder="ค้นหา...">
        </div>
        <div class="sidebar-menu w-100">
          <ul class="menu-nav">
            <li>
              <router-link to="/dashboard" :class="[($route.path == '/dashboard') ? 'bg-darkblue' : '']">
                <i class="bi bi-bar-chart-line me-3 fs-5"></i>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/home" :class="[($route.path == '/home') ? 'bg-darkblue' : '']"><i class="bi bi-card-checklist me-3 fs-5"></i>ออกเลขการทำเคลม</router-link>
            </li>
            <li>
              <router-link to="/home/status" :class="[($route.path == '/home/status') ? 'bg-darkblue' : '']">
                <i class="bi bi-cup-hot me-3 fs-5"></i>
                ติดตามสถานะ
                <span class="badge bg-danger ms-3">0</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- bottom -->
      <div class="sidebar-bottom w-100">
        <a type="button" class="py-2" @click="logout"><i class="bi bi-power me-2 fw-bold"></i>ออกจากระบบ</a>
        <!-- <p>{{$route.path}}</p> -->
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">

import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore()

const logout = () => {
  store.dispatch({
    type : 'auth/logout',
  });
}

/* const route_name = ref(route.name) */
</script>

<style scoped>
  h1{
    font-weight: 600;
  }
  p{
    color: rgb(161, 161, 161);
    font-size: 12px;
  }
  .menu-nav{
    padding: 0;
  }
  .menu-nav li{
    border-radius: 5px;
    list-style: none;
    margin-bottom: 10px;
  }
  .menu-nav li a{
    border-radius: 5px;
    display: block;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 10px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    transition: 0.2s;
    display: flex;
    align-items: center;
  }
  .menu-nav li a:hover{
    background-color: #45575d;
    color: var(--text-color-white);
  }
  .menu-nav li a:focus{
    background-color: #45575d;
    color: var(--text-color-white);
  }
  .sidebar-bottom a{
    border-radius: 5px;
    display: block;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 10px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    transition: 0.2s;
    background-color: var(--search-side-menu);
  }
  .sidebar-bottom a:hover{
    padding-left: 45px;
    color: #E05538;
  }
  .bg-darkblue{
    background-color: #45575d;
    color: #fff;
  }
</style>

