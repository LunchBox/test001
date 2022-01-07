<script setup>
import { computed, h } from "vue";
import { useRoute, useRouter } from "vue-router";

import { NDivider } from "naive-ui";
import { NDataTable, NButton } from "naive-ui";

import { list } from "../store/projects.js";

const columns = [
  {
    title: "",
    key: "id",
    align: "left"
  },
  {
    title: "Name",
    key: "name",
    align: "left",
    render(cell){
      return h(
        NButton, 
        { 
          text: true, 
          onClick: () => {
            router.push({ path: `/projects/${cell.id}` })
          } 
        },
        { default: () => cell.name }
      )
    }
  }
]

</script>

<template>
  <div>
    <h2>Projects</h2> 
    <n-data-table :columns="columns" :data="list" :pagination="pagination" />
  </div>
</template>

<style>
</style>
