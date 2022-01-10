<template>
  <div>
		<div v-html="formattedComment"></div>
  </div>
</template>

<script setup>
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	import { NGrid, NGridItem } from "naive-ui";
	import { marked } from "marked";

	import EntryItem from "@/models/entry_item.js";

	const props = defineProps({
		entryItem: EntryItem,
	});

	const router = useRouter();

  const formattedComment = computed(() => {
		if (props.entryItem && props.entryItem.comment) {
			return marked(props.entryItem.comment);
		}
  });
</script>

<style>
</style>
