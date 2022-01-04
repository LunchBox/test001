<template>
	<form @submit.prevent="onSubmit">
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

		<div>
			<label for="">
				Title <br />
				<input type="text" v-model="formData.title" />
			</label>
		</div>

		<div>
			<label for="">
				Content <br />
				<textarea v-model="formData.content"></textarea>
			</label>
		</div>

		<div>
			<button type="submit">Submit</button>
		</div>
	</form>
</template>

<script setup>
	import { reactive } from "vue";

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