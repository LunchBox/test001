<template>
	<form @submit.prevent="onSubmit">
		<label for="">
			Parent <br />
			<select v-model="formData.parentId">
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

		<label for="">
			Name <br />
			<input type="text" v-model="formData.name" />
		</label>

		<div>
			<button type="submit">Submit</button>
		</div>
	</form>
</template>

<script setup>
	import { reactive } from "vue";

	import { addToList, topLevelCategories } from "../store/categories.js";

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