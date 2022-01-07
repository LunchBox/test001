<script setup>
	import { computed } from "vue";
	import { useRoute } from "vue-router";

	import { NDivider } from "naive-ui";
	import { NDataTable } from "naive-ui";

	import { findById } from "@/store/articles.js";

	import Category from "@/models/category.js";
	import Article from "./_Article.vue";

	import CategoryBreadcrumb from "../categories/_Breadcrumb.vue";

	const route = useRoute();

	const article = computed(() => findById(route.params.id));

	const category = computed(() => article.value.$category);
</script>

<template>
	<div v-if="article">
		<CategoryBreadcrumb :category="category" />

		<Article :article="article" />
	</div>
</template>

<style>
</style>
