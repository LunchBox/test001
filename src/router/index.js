import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";

import Projects from "../components/Projects.vue";

import Project from "../components/Project.vue";
import Category from "../components/Category.vue";
import Article from "../components/Article.vue";

import ProjectForm from "../components/ProjectForm.vue";
import ArticleForm from "../components/ArticleForm.vue";
import CategoryForm from "../components/CategoryForm.vue";
  
const routes = [
  { path: '/', component: Dashboard },

  { path: '/projects', component: Projects },
  { path: '/projects/add', component: ProjectForm },
  { path: '/projects/:id', component: Project },
  { path: '/projects/:id/edit', component: ProjectForm },

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
