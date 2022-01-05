<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { findById } from "../store/articles.js";

import ArticleForm from "../components/_ArticleForm.vue";

import CategoryBreadcrumb from "../components/CategoryBreadcrumb.vue";

const route = useRoute();

const article = computed(() => findById(route.params.id));
</script>

<template>
  <div>
    <CategoryBreadcrumb v-if="article" :category="article.$category" />

    <ArticleForm :article="article" />
  </div>
</template>

<style>
</style>
