<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";

	import { findById as findCategoryById } from "@/store/categories.js";
	import { findById } from "@/store/articles.js";

	import ArticleForm from "./_Form.vue";

	import CategoryBreadcrumb from "../categories/_Breadcrumb.vue";

	const route = useRoute();

	console.log(route);
	const category = computed(() => findCategoryById(route.query.categoryId));

	const article = computed(() => findById(route.params.id));
</script>

<template>
	<div>
		<CategoryBreadcrumb v-if="article" :category="article.$category" />

		<ArticleForm :article="article" :category="category" />
	</div>
</template>

<style>
</style>
