<template>
	<n-grid x-gap="12" :cols="3">
    <n-grid-item>
			<router-link to="/">Documents</router-link>
    </n-grid-item>
    <n-grid-item>
      <div class="green"></div>
    </n-grid-item>
    <n-grid-item>
      <n-space justify="end">
        <n-button quaternary @click="addArticle">Add Article</n-button>
        <n-button quaternary @click="addCategory">Add Category</n-button>
        <n-button quaternary @click="toProjects">Projects</n-button>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { NGrid, NGridItem, NButton, NSpace } from "naive-ui";

  const router = useRouter();

  function addArticle(){
    router.push({ path: `/articles/add` });
  }

  function addCategory(){
    router.push({ path: `/categories/add` });
  }

  function toProjects(){
    router.push({ path: `/projects` });
  }
</script>

<style scoped>
	a {
		font-weight: bold;
		font-size: 1.5em;
		text-decoration: none;
    color: rgb(51, 54, 57);
	}
</style>
