<template>
  <div>
    LI: <router-link :to="`/entries/${entry.id}`">{{ entry.name }}</router-link>
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
</script>

<style>
</style>
