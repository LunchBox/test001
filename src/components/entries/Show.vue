<script setup>
	import { ref, computed, h } from "vue";
	import { useRoute, useRouter } from "vue-router";

	import { NDivider } from "naive-ui";
	import { NDataTable } from "naive-ui";

	import Entry from "@/models/entry.js";
	import EntryItem from "@/models/entry_item.js";

	import EntryItemView from "../entry_items/_ListItem.vue";
	import EntryItemForm from "../entry_items/_Form.vue";

	const route = useRoute();
	const router = useRouter();

	// const entry = computed(() => Entry.find(route.params.id));
	const entry = ref(null);
	Entry.fetch([route.params.id]).then(async (models) => {
		entry.value = models[0];

		EntryItem.fetch(entry.value.entryItemIds);
	});

	const entryItems = computed(() => (entry.value ? entry.value.$entryItems : []));

	const editing = ref(null);
	function edit(entryItem) {
		editing.value = entryItem;
	}

	function destroy(entryItem) {
		entryItem.destroy();
		editing.value = null;
	}
</script>

<template>
	<div v-if="entry">
		<h2>{{ entry.name }}</h2>

		<EntryItemView
			v-for="ei in entryItems"
			:key="ei.id"
			:entry-item="ei"
			@destroy="destroy(ei)"
		/>

		<EntryItemForm
			:entry="entry"
			:entry-item="editing"
			@after-submit="editing = null"
			@cancel="editing = null"
		/>
	</div>
</template>

<style>
</style>
