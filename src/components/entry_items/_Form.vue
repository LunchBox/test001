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
				@keydown.enter.ctrl="onSubmit"
			/>
		</n-form-item>

		<n-space>
			<n-button attr-type="submit" type="primary">Submit</n-button>
			<n-button attr-type="reset" quaternary @click.prevent="reset"
				>Reset</n-button
			>
		</n-space>
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
	function initFormData() {
		for (let key in attributes) {
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
				for (let key in attributes) {
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

	const emit = defineEmits(["after-submit", "cancel"]);

	function onSubmit() {
		if (!editing.value) {
			// create new Item
			const entryItem = new EntryItem({ ...formData });
			entryItem.create();
		} else {
			editing.value.update({ ...formData });
			editing.value = null;
		}

		initFormData();

		emit("after-submit");
	}

	function reset() {
		editing.value = null;
		initFormData();

		emit("cancel");
	}
</script>

<style>
</style>
