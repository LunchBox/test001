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
</script>

<template>
	<div v-if="project">
		<Project :project="project" />
	</div>
</template>

<style>
</style>
