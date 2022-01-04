<template>
	<n-form @submit.prevent="onSubmit">
		<n-form-item label="分類" path="formData.categoryId">
			<n-cascader
				v-model:value="formData.categoryId"
				placeholder="placeholder"
				:expand-trigger="'click'"
				:options="options"
			/>
		</n-form-item>

		<n-form-item label="標題" path="formData.title">
			<n-input v-model:value="formData.title" placeholder="標題" />
		</n-form-item>

		<n-form-item label="內容" path="formData.content">
			<n-input
				v-model:value="formData.content"
				type="textarea"
				placeholder="Content"
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
	import { reactive, computed } from "vue";
	import { NForm, NFormItem, NInput, NButton } from "naive-ui";
	import { NCascader } from "naive-ui";

	import { topLevelCategories } from "../store/categories.js";
	import { addToList } from "../store/articles.js";

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

	const formData = reactive({
		categoryId: null,
		title: null,
		content: null,
	});

	function onSubmit() {
		const { title, content, categoryId } = formData;

		addToList(title, content, categoryId);

		formData.categoryId = null;
		formData.title = null;
		formData.content = null;
	}
</script>

<style>
</style>