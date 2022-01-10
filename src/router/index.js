import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";

import Projects from "../components/projects/Index.vue";
import Project from "../components/projects/Show.vue";
import ProjectForm from "../components/projects/Form.vue";

import Category from "../components/categories/Show.vue";
import CategoryForm from "../components/categories/Form.vue";

import Article from "../components/articles/Show.vue";
import ArticleForm from "../components/articles/Form.vue";

import EntryShow from "../components/entries/Show.vue";

const routes = [
	{ path: "/", component: Dashboard },

	{ path: "/projects", component: Projects },
	{ path: "/projects/:id", component: Project },
	{ path: "/projects/new", component: ProjectForm },
	{ path: "/projects/:id/edit", component: ProjectForm },

	{ path: "/categories/:id", component: Category },
	{ path: "/categories/new", component: CategoryForm },
	{ path: "/categories/:id/edit", component: CategoryForm },

	{ path: "/articles/:id", component: Article },
	{ path: "/articles/new", component: ArticleForm },
	{ path: "/articles/:id/edit", component: ArticleForm },

	{ path: "/entries/:id", component: EntryShow },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
