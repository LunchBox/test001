<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { findById } from "../store/categories.js";

import CategoryForm from "../components/_CategoryForm.vue";

import CategoryBreadcrumb from "../components/CategoryBreadcrumb.vue";

const route = useRoute();

const category = computed(() => findById(route.params.id));
</script>

<template>
  <div> 
    <CategoryBreadcrumb v-if="category" :category="category" />

    <CategoryForm :category="category" />
  </div>
</template>

<style>
</style>
