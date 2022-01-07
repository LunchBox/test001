<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";

	import { findById as findProjectById } from "@/store/projects.js";
	import { findById } from "@/store/categories.js";

	import CategoryForm from "./_Form.vue";

	import CategoryBreadcrumb from "./_Breadcrumb.vue";

	const route = useRoute();

	console.log(route);

	// for edit
	const category = computed(() => findById(route.params.id));

	const parent = computed(() => findById(route.query.categoryId));

	const project = computed(() => findProjectById(route.query.projectId));
</script>

<template>
	<div>
		<h2 v-if="project">Project: {{ project.name }}</h2>
		<CategoryBreadcrumb v-if="category" :category="category" />

		<CategoryForm
			:parent="parent"
			:category="category"
			:project="project"
		/>
	</div>
</template>

<style>
</style>
