<script setup>
	import { computed, h } from "vue";
	import { useRoute, useRouter } from "vue-router";

	import { NDivider } from "naive-ui";
	import { NDataTable } from "naive-ui";

  import Entry from "@/models/entry.js";
  import EntryItem from "@/models/entry_item.js";

  import EntryItemView from "../entry_items/_ListItem.vue";
  import EntryItemForm from "../entry_items/_Form.vue";

	const route = useRoute();
	const router = useRouter();

	const entry = computed(() => Entry.find(route.params.id));

  const entryItems = computed(() => EntryItem.where({ entryId: entry.value.id }));
  console.log(entryItems);
</script>

<template>
	<div v-if="entry">
    <h2>{{ entry.name }}</h2>

    <EntryItemView v-for="ei in entryItems" :key="ei.id" :entry-item="ei" />

    <EntryItemForm :entry="entry" />
	</div>
</template>

<style>
</style>
