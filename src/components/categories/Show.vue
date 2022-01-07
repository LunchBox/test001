<script setup>
	import { computed, h } from "vue";
	import { useRoute, useRouter } from "vue-router";

	import { NDivider } from "naive-ui";
	import { NDataTable } from "naive-ui";

	import { findById } from "@/store/categories.js";
	import Category from "@/models/category.js";

	import CategoryBreadcrumb from "./_Breadcrumb.vue";

	const route = useRoute();
	const router = useRouter();

	const category = computed(() => findById(route.params.id));

	const articles = computed(() =>
		category.value ? category.value.$articles : []
	);

	function addArticle() {
		router.push({
			path: `/articles/new`,
			query: { categoryId: category.value.id },
		});
	}

	function addCategory() {
		router.push({
			path: `/categories/new`,
			query: { categoiryId: category.value.id },
		});
	}

	const columns = [
		{
			title: "",
			key: "id",
			align: "left",
		},
		{
			title: "Title",
			key: "title",
			align: "left",
			render(cell) {
				return h(
					"n-button",
					{
						text: true,
						onClick: () => {
							router.push({ path: `/articles/${cell.id}` });
						},
					},
					{ default: () => cell.title }
				);
			},
		},
	];

	const data = articles;
</script>

<template>
	<div v-if="category">
		<CategoryBreadcrumb :category="category" />

		<n-space justify="end">
			<n-button quaternary @click="addArticle">Add Article</n-button>
			<n-button quaternary @click="addCategory">Add Category</n-button>
		</n-space>

		<n-data-table
			:columns="columns"
			:data="data"
			:pagination="pagination"
		/>
	</div>
</template>

<style>
</style>
