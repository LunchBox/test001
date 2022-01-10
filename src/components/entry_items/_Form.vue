<template>
	<n-form @submit.prevent="onSubmit">
		<n-form-item path="comment">
			<n-input
				v-model:value="formData.comment"
				type="textarea"
				placeholder="Comment"
				:autosize="{
					minRows: 3,
				}"
			/>
		</n-form-item>

		<div>
			<n-button attr-type="submit" type="primary">Submit</n-button>
		</div>
	</n-form>
</template>

<script setup>
	import { ref, reactive, computed, watch } from "vue";
	import { NForm, NFormItem, NInput } from "naive-ui";

	import { addToList, update } from "@/store/projects.js";

  import Entry from "@/models/entry.js";
  import EntryItem from "@/models/entry_item.js";

	const props = defineProps({
    entry: Entry,
		entryItem: EntryItem, 
	});

  const attributes = EntryItem.attributes;

	const formData = reactive({});
  function initFormData(){
    for (let key in attributes){
      formData[key] = attributes[key]?.default || null;   
    }

    formData.entryId = props.entry?.id || null;
  }

  initFormData();

	const editing = ref(null);

	watch(
		() => props.entryItem,
		(newVal) => {
			if (newVal) {
        for (let key in attributes){
          formData[key] = newVal[key];   
        }

				editing.value = newVal;
			}
		},
		{ immediate: true }
	);

  watch(
    () => props.entry,
    (newVal) => {
      if (newVal) {
        formData.entryId = newVal.id;
      }
    },
    { immediate: true }
  );

	function onSubmit() {
		if (!editing.value) {
      // create new Item
      const model = new EntryItem({...formData});
      model.create();
		} else {
      editing.update({...formData});
			editing.value = null;
		}

    initFormData();
	}
</script>

<style>
</style>
