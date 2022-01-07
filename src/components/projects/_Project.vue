<template>
	<article v-if="project">
		<div style="display: flex">
			<h1 style="margin-right: 1em" :id="`a${project.id}`">
				<a @click.prevent="toProject">#</a>
				{{ project.name }}
			</h1>
			<n-button @click="edit" text> Edit </n-button>
		</div>
		<div v-html="content"></div>
	</article>
</template>

<script setup>
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	import { NButton, NGrid, NGridItem } from "naive-ui";
	import { marked } from "marked";

	import Project from "@/models/project.js";

	const props = defineProps({
		project: Project,
	});

	const content = computed(() => {
		if (props.project && props.project.description) {
			return marked(props.project.description);
		}
	});

	const router = useRouter();
	function edit() {
		router.push({ path: `/projects/${props.project.id}/edit` });
	}

	function toProject() {
		router.push({ path: `/projects/${props.project.id}` });
	}
</script>

<style>
</style>
