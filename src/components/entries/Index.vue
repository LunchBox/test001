<script setup>
	import { computed, h } from "vue";
	import { useRoute, useRouter } from "vue-router";

	import { NDivider } from "naive-ui";
	import { NDataTable } from "naive-ui";

  import Entry from "@/models/entry.js";

  import Form from "./_Form.vue";
  import ListItem from "./_ListItem.vue";

	const router = useRouter();

  const list = Entry.all;
  console.log("list", list)

</script>

<template>
	<div>
    <h2>{{ new Date() }}</h2>

    <div>
      <ListItem v-for="entry in list" :key="entry.id" :entry="entry" />
    </div>

    <Form />
	</div>
</template>

<style>
</style>
