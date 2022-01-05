<script setup>
  import { ref } from "vue";
	import {
		NSpace,
		NLayout,
		NLayoutHeader,
		NLayoutContent,
		NLayoutFooter,
		NLayoutSider,
		NDivider,
    NButton,
    NDrawer,
    NDrawerContent,
	} from "naive-ui";

	import SiteHeader from "./components/SiteHeader.vue";
	import SiteMenus from "./components/SiteMenus.vue";
	import Article from "./components/Article.vue";

	import CategoryForm from "./components/CategoryForm.vue";
	import ArticleForm from "./components/ArticleForm.vue";

	import { currentArticles } from "./store/current.js";

  const collapsed = ref(false);

  const showDrawer = ref(false);
</script>

<template>
	<n-space vertical size="large">
		<n-layout>
			<n-layout-header style="padding: 24px" bordered>
				<SiteHeader />
			</n-layout-header>
			<n-layout has-sider>
				<n-layout-sider content-style="padding: 24px;" 
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
        <SiteMenus />
				</n-layout-sider>
				<n-layout-content content-style="padding: 24px;">
          <n-button @click="showDrawer = true">Add Article</n-button>
          <router-view></router-view>
					<n-divider />
					<CategoryForm />
				</n-layout-content>
			</n-layout>
		</n-layout>

    <n-drawer v-model:show="showDrawer" :width="502"> 
      <n-drawer-content title="Article Form">
        <ArticleForm />
      </n-drawer-content>
    </n-drawer> 
	</n-space>
</template>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
