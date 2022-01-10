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

    <div style="flex: 1" >
      <div v-html="formattedComment" @dblclick="edit"></div>

      <EntryItemForm 
        v-if="editing"
        :entry-item="editing" 
        @after-submit="editing = null" 
        @cancel="editing = null" 
      />
    </div>
  </n-space>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useRouter } from "vue-router";
	import { NDropdown } from "naive-ui";

	import { marked } from "marked";

	import EntryItem from "@/models/entry_item.js";
  import EntryItemForm from "../entry_items/_Form.vue";

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

  const editing = ref(null);

  function edit(){
    editing.value = props.entryItem;
  }

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
