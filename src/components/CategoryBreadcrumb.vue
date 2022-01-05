<script setup>
import { computed } from "vue";

import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";

import { findById } from "../store/categories.js";

import Category from "../models/category.js";

const props = defineProps({
  category: Category
});

function setPath(path = [], cate) {
	path.unshift(cate);
	if (cate.$parent){
		setPath(path, cate.$parent);
	}
}

const categoryPath = computed(() => {
	const path = [];
	setPath(path, props.category);
	return path;
});


</script>

<template>
	<n-breadcrumb>
    <n-breadcrumb-item v-for="cate in categoryPath" :key="cate.id"> 
      <router-link :to="`/categories/${cate.id}`">{{ cate.name }}</router-link>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style>
</style>
