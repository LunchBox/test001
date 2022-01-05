import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Category from "../components/Category.vue";
  
const routes = [
  { path: '/', component: Dashboard },
  { path: '/categories/:cid', component: Category }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
