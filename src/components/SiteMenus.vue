<template>
	<n-space vertical>
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="data"
      v-model:value="activeKey"
      @update:value="setCategory"
    />
	</n-space>
</template>

<script setup>
	import { ref, computed, watch, h, resolveComponent } from "vue";
	import { NTree, NSpace, NLayout, NLayoutSider, NMenu, NSwitch } from "naive-ui";
	import { findById, topLevelCategories } from "../store/categories";
	import { currentCategory } from "../store/current";

	function setCurrentCategory(category) {
		currentCategory.value = category;
	}

	function getData(categories = []) {
		return categories.map((cate) => {
			const option = {
        label: () => h(resolveComponent('router-link'), { to: { path: `/categories/${cate.id}`}}, { default: () => cate.name}),
				key: cate.id,
			};

			if (cate.$children && cate.$children.length > 0) {
				option.children = getData(cate.$children);
			}

			return option;
		});
	}

	const data = computed(() => {
		return getData(topLevelCategories.value);
	});

	const activeKey = ref(null);
	const collapsed = ref(false);

	watch(activeKey, (newVal) => {
		currentCategory.value = findById(newVal);
	});

	function setCategory(val) {
		console.log(val);
	}
</script>

<style>
</style>
