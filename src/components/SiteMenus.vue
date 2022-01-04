<template>
	<!-- <ul>
		<li v-for="category in topLevelCategories" :key="category.name">
			<a @click.prevent="setCurrentCategory(category)">
				{{ category.name }} ({{ category.$children.length }})
			</a>
		</li>
	</ul> -->
	<!-- <n-tree block-line :data="data" selectable /> -->

	<n-space vertical>
		<n-switch v-model:value="collapsed" />
		<n-layout has-sider>
			<n-layout-sider
				bordered
				collapse-mode="width"
				:collapsed-width="64"
				:width="240"
				:collapsed="collapsed"
				show-trigger
				@collapse="collapsed = true"
				@expand="collapsed = false"
			>
				<n-menu
					:collapsed="collapsed"
					:collapsed-width="64"
					:collapsed-icon-size="22"
					:options="data"
					v-model:value="activeKey"
				/>
			</n-layout-sider>
			<n-layout>
				<span>内容</span>
			</n-layout>
		</n-layout>
	</n-space>
</template>

<script setup>
	import { ref, computed, watch } from "vue";
	import { NTree, NSpace, NLayout, NLayoutSider, NMenu, NSwitch } from "naive-ui";
	import { findById, topLevelCategories } from "../store/categories";
	import { currentCategory } from "../store/current";

	function setCurrentCategory(category) {
		currentCategory.value = category;
	}

	function getData(categories = []) {
		return categories.map((cate) => {
			const option = {
				label: cate.name,
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
</script>

<style>
</style>