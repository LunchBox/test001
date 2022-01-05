<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { NDivider } from "naive-ui";

import { findById } from "../store/categories.js";

import Category from "../models/category.js";
import Article from "../components/Article.vue";
import ArticleForm from "../components/ArticleForm.vue";


const route = useRoute();

const category = computed(() => findById(route.params.cid));

const articles = computed(() => category.value ? category.value.$articles : []);

</script>

<template>
  <div v-if="category">
    <h1>Articles in {{ category.name }}</h1>
    <Article
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
    <n-divider />

    <h3>Add Article</h3>
    <ArticleForm :category="category" />
  </div>
</template>

<style>
</style>
