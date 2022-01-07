<template>
	<n-form @submit.prevent="onSubmit">
		<h3>Add Project</h3>

		<n-form-item label="標題" path="formData.name">
			<n-input v-model:value="formData.name" placeholder="標題" />
		</n-form-item>

		<n-form-item label="內容" path="formData.description">
			<n-input
				v-model:value="formData.description"
				type="textarea"
				placeholder="Description"
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

	import Project from "@/models/project.js";

	const props = defineProps({
		project: Project,
	});

	const formData = reactive({
		name: null,
		description: null,
	});

	const editing = ref(null);

	watch(
		() => props.article,
		(newVal) => {
			if (newVal) {
				formData.name = newVal.name;
				formData.description = newVal.description;

				editing.value = newVal;
			}
		},
		{ immediate: true }
	);

	function onSubmit() {
		const { name, description } = formData;

		if (!editing.value) {
			addToList(name, description);
		} else {
			update(editing.value, name, description);
			editing.value = null;
		}

		formData.name = null;
		formData.description = null;
	}
</script>

<style>
</style>
