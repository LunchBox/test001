<template>
  <div>
   LI: {{ entry.name }}
  </div>
</template>

<script setup>
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	import { NGrid, NGridItem } from "naive-ui";
	import { marked } from "marked";

	import Entry from "@/models/entry.js";

	const props = defineProps({
		entry: Entry,
	});


	const router = useRouter();
	function edit() {
	}

	function toProject() {
		router.push({ path: `/projects/${props.project.id}` });
	}
</script>

<style>
</style>
