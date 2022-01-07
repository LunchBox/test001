<script setup>
import { computed, h } from "vue";
import { useRoute, useRouter } from "vue-router";

import { NDivider } from "naive-ui";
import { NDataTable, NButton } from "naive-ui";

import { findById } from "../store/categories.js";

import Category from "../models/category.js";
import Article from "../components/_Article.vue";
import ArticleForm from "../components/_ArticleForm.vue";

import CategoryBreadcrumb from "../components/CategoryBreadcrumb.vue";

const route = useRoute();
const router = useRouter();

const category = computed(() => findById(route.params.id));

const articles = computed(() => category.value ? category.value.$articles : []);


const columns = [
  {
    title: "",
    key: "id",
    align: "left"
  },
  {
    title: "Title",
    key: "title",
    align: "left",
    render(cell){
      return h(
        NButton, 
        { 
          text: true, 
          onClick: () => {
            router.push({ path: `/articles/${cell.id}` })
          } 
        },
        { default: () => cell.title }
      )
    }
  }
]


const data = articles;


</script>

<template>
  <div v-if="category">
    <CategoryBreadcrumb :category="category" />

    <n-data-table :columns="columns" :data="data" :pagination="pagination" />

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
