<template>
	<n-form @submit.prevent="onSubmit">
		<n-form-item label="父級分類" path="formData.parentId">
			<n-cascader
				v-model:value="formData.parentId"
				placeholder="placeholder"
				:expand-trigger="'click'"
				:options="options"
			/>
		</n-form-item>

		<n-form-item label="名稱" path="formData.name">
			<n-input v-model:value="formData.name" placeholder="名稱" />
		</n-form-item>

		<div>
			<n-button attr-type="submit" type="primary">Submit</n-button>
		</div>
	</n-form>
</template>

<script setup>
	import { ref, reactive, computed, watch } from "vue";
	import { NForm, NFormItem, NInput } from "naive-ui";
	import { NCascader } from "naive-ui";

	import Category from "@/models/category.js";
	import Project from "@/models/project.js";
	import { addToList, topLevelCategories } from "@/store/categories.js";

	const props = defineProps({
		parent: Category,
		category: Category,
		project: Project,
	});

	function getOptions(categories = []) {
		return categories.map((cate) => {
			const option = {
				value: cate.id,
				label: cate.name,
			};
			if (cate.$children && cate.$children.length > 0) {
				option.children = getOptions(cate.$children);
			}
			return option;
		});
	}

	const options = computed(() => {
		return getOptions(topLevelCategories.value);
	});

	const editing = ref(null);

	const formData = reactive({
		name: null,
		parentId: null,
		projectId: null,
	});

	function reset() {
		formData.name = null;
		formData.projectId = null;
		formData.parentId = null;

		editing.value = null;
	}
	function onSubmit() {
		addToList({ ...formData });
		reset();
	}

	watch(
		() => props.parent,
		(cate) => {
			console.log(cate);
			if (cate) {
				formData.parentId = cate.id;
			}
		},
		{ immediate: true }
	);
</script>

<style>
</style>