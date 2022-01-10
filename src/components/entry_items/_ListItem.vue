<template>
  <n-space align="baseline" :wrap="false">
    <n-dropdown
      placement="bottom-start"
      trigger="click"
      size="small"
      @select="handleSelect"
      :options="options"
      >
      M
    </n-dropdown>
    <div v-html="formattedComment"></div>
  </n-space>
</template>

<script setup>
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	import { NDropdown } from "naive-ui";

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

  const emit = defineEmits(['edit', 'destroy']);

  function handleSelect(val){
    emit(val);
  }

  const options = [
    { 
      label: "Edit",
      key: "edit"
    },
    { 
      label: "Destroy",
      key: "destroy"
    },
  ]
</script>

<style>
</style>
