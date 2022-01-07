<script setup>
	import { computed, h } from "vue";
	import { useRoute, useRouter } from "vue-router";

	import { NDivider } from "naive-ui";
	import { NDataTable } from "naive-ui";

	import { findById } from "@/store/projects.js";

	import Project from "./_Project.vue";

	const route = useRoute();
	const router = useRouter();

	const project = computed(() => findById(route.params.id));

	function addCategory() {
		router.push({
			path: `/categories/new`,
			query: { projectId: project.value.id },
		});
	}
</script>

<template>
	<div v-if="project">
		<Project :project="project" />

		<n-space justify="end">
			<n-button quaternary @click="addCategory">Add Category</n-button>
		</n-space>
	</div>
</template>

<style>
</style>
