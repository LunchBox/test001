<template>
	<article v-if="article">
    <div style="display: flex">
      <h1 style="margin-right: 1em;" :id="`a${article.id}`">
        <a @click.prevent="toArticle">#</a>
        {{ article.title }}
      </h1>
      <n-button @click="edit" text>
        Edit
      </n-button>
    </div>
    <div v-html="articleContent"></div>
	</article>
</template>

<script setup>
	import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { NButton, NGrid, NGridItem } from "naive-ui";
	import Article from "../models/article.js";
	import { marked } from "marked";

	const props = defineProps({
		article: Article,
	});

	const articleContent = computed(() => {
		if (props.article && props.article.content) {
			return marked(props.article.content);
		}
	});

  const router = useRouter();
  function edit() {
    router.push({path: `/articles/${props.article.id}/edit`})
  }

  function toArticle(){
    router.push({path: `/categories/${props.article.categoryId}`, hash: `#a${props.article.id}`})
  }
</script>

<style>
</style>
