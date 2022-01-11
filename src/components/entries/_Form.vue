<template>
	<n-form @submit.prevent="onSubmit">
		<template v-for="(config, key) in attributes" :key="key">
			<n-form-item
				v-if="config.type === 'string'"
				:label="key"
				:path="key"
			>
				<n-input v-model:value="formData[key]" />
			</n-form-item>
		</template>

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

	const props = defineProps({
		entry: Entry,
	});

	const attributes = Entry.attributes;

	const formData = reactive({});
	function initFormData() {
		for (let key in attributes) {
			formData[key] = attributes[key]?.default || null;
		}
	}

	initFormData();

	const editing = ref(null);

	watch(
		() => props.entry,
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

	function onSubmit() {
		if (!editing.value) {
			// create new Item
			const entry = new Entry({ ...formData });
			entry.create();
		} else {
			editing.update({ ...formData });
			editing.value = null;
		}

		initFormData();
	}
</script>

<style>
</style>
