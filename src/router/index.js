import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Category from "../components/Category.vue";

import EditArticle from "../components/EditArticle.vue";
  
const routes = [
  { path: '/', component: Dashboard },
  { path: '/categories/:cid', component: Category },
  { path: '/articles/:id/edit', component: EditArticle },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
