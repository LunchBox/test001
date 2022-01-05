<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { findById } from "../store/categories.js";

import Category from "../models/category.js";
import Article from "../components/Article.vue";


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
  </div>
</template>

<style>
</style>
