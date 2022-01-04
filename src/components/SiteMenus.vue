<template>
	<ul>
		<li v-for="category in topLevelCategories" :key="category.name">
			<a @click.prevent="setCurrentCategory(category)">
				{{ category.name }} ({{ category.$children.length }})
			</a>
		</li>
	</ul>
</template>

<script setup>
	import { topLevelCategories } from "../store/categories";
	import { currentCategory } from "../store/current";

	function setCurrentCategory(category) {
		currentCategory.value = category;
	}
</script>

<style>
</style>