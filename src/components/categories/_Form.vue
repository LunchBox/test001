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
	import { reactive, computed } from "vue";
	import { NForm, NFormItem, NInput, NButton } from "naive-ui";
	import { NCascader } from "naive-ui";

	import { addToList, topLevelCategories } from "@/store/categories.js";

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

	// const options = getOptions(topLevelCategories.value);

	const formData = reactive({
		name: null,
		parentId: null,
	});

	function onSubmit() {
		const { name, parentId } = formData;

		addToList(name, parentId);

		formData.name = null;
		formData.parentId = null;
	}
</script>

<style>
</style>