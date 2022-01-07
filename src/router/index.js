import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import Category from "../components/Category.vue";
import Article from "../components/Article.vue";

import ArticleForm from "../components/ArticleForm.vue";
import CategoryForm from "../components/CategoryForm.vue";
  
const routes = [
  { path: '/', component: Dashboard },
  { path: '/categories/:id', component: Category },
  { path: '/categories/add', component: CategoryForm },
  { path: '/categories/:id/edit', component: CategoryForm },
  { path: '/articles/add', component: ArticleForm },
  { path: '/articles/:id', component: Article },
  { path: '/articles/:id/edit', component: ArticleForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
