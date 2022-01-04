<template>
	<n-form @submit.prevent="onSubmit">
		<label for="">
			Category <br />
			<select v-model="formData.categoryId">
				<option :value="null">- Top Level -</option>
				<option
					v-for="category in topLevelCategories"
					:key="category.name"
					:value="category.id"
				>
					{{ category.name }}
				</option>
			</select>
		</label>

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
	import { reactive } from "vue";
	import { NForm, NFormItem, NInput, NButton } from "naive-ui";

	import { topLevelCategories } from "../store/categories.js";
	import { addToList } from "../store/articles.js";

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