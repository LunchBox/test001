<template>
	<article v-if="article">
		<h1>{{ article.title }}</h1>
		<div v-html="articleContent"></div>
    <div>
      <router-link :to="`/articles/${article.id}/edit`">Edit</router-link>
    </div>
	</article>
</template>

<script setup>
	import { computed } from "vue";
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
</script>

<style>
</style>
