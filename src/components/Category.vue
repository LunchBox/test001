<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { NDivider } from "naive-ui";

import { findById } from "../store/categories.js";

import Category from "../models/category.js";
import Article from "../components/Article.vue";
import ArticleForm from "../components/_ArticleForm.vue";

import CategoryBreadcrumb from "../components/CategoryBreadcrumb.vue";

const route = useRoute();

const category = computed(() => findById(route.params.cid));

const articles = computed(() => category.value ? category.value.$articles : []);

</script>

<template>
  <div v-if="category">
    <CategoryBreadcrumb :category="category" />
    <h1># {{ category.name }}</h1>

    <template v-for="article in articles">
      <Article
        :article="article"
      />
    </template>


    <ArticleForm :category="category" />
  </div>
</template>

<style>
</style>
