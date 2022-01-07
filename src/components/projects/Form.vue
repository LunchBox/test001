<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";

	import { findById } from "@/store/projects.js";

	import Form from "./_Form.vue";

	const route = useRoute();

	console.log(route.params);

	const project = computed(() => findById(route.params.id));
</script>

<template>
	<div>
		<Form :project="project" />
	</div>
</template>

<style>
</style>
