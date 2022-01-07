<template>
	<n-form @submit.prevent="onSubmit">
    <h3>
      Add Article
      <span v-if="category">for {{ category.name }}</span>
    </h3>

		<n-form-item label="標題" path="formData.title">
			<n-input v-model:value="formData.title" placeholder="標題" />
		</n-form-item>

		<n-form-item label="內容" path="formData.content">
			<n-input
				v-model:value="formData.content"
				type="textarea"
				placeholder="Content"
				:autosize="{
					minRows: 3,
				}"
			/>
		</n-form-item>

		<n-form-item v-if="!category" label="分類" path="formData.categoryId">
			<n-cascader
				v-model:value="formData.categoryId"
				placeholder="placeholder"
				:expand-trigger="'click'"
				:options="options"
			/>
		</n-form-item>


		<div>
			<n-button attr-type="submit" type="primary">Submit</n-button>
		</div>
	</n-form>
</template>

<script setup>
	import { ref, reactive, computed, watch} from "vue";
	import { NForm, NFormItem, NInput, NButton } from "naive-ui";
	import { NCascader } from "naive-ui";

	import { topLevelCategories } from "../store/categories.js";
	import { addToList, update } from "../store/articles.js";
          
  import Category from "../models/category.js"; 
  import Article from "../models/article.js";

  const props = defineProps({
    category: Category,
    article: Article
  });

	function getOptions(categories = []) {
		return categories.map((cate) => {
			const option = {
				value: cate.id,
				label: cate.name,
			};
			if (cate.$children && cate.$children.length > 0) {
				option.children = getOptions(cate.$children);
			}
			return option;
		});
	}

	const options = computed(() => {
		return getOptions(topLevelCategories.value);
	});

	const formData = reactive({
		categoryId: null,
		title: null,
		content: null,
	});

  const editing = ref(null);

  watch(() => props.article, (newVal) => {
    if (newVal){
      formData.categoryId = newVal.categoryId;
      formData.title = newVal.title;
      formData.content = newVal.content;

      editing.value = newVal;
    }
  }, { immediate: true });

	function onSubmit() {
		const { title, content, categoryId } = formData;
    
    const id = props.category ? props.category.id : categoryId;

    if (!editing.value){ 
      addToList(title, content, id);
    } else {
      update(editing.value, title, content, id)
      editing.value = null;
    }

		formData.categoryId = null;
		formData.title = null;
		formData.content = null;
	}
</script>

<style>
</style>
