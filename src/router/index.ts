import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import StatusView from '../views/StatusView.vue'
import DashBoard from '../views/DashBoard.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home/abount',
    name: 'about',
    component: HomeView
  },
  {
    path: '/home/status',
    name: 'status',
    component: StatusView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
