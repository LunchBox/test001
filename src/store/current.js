import { ref, computed } from "vue";
import { list } from "./articles";

const currentCategory = ref(null);

const currentArticles = computed(() => {
	if (currentCategory.value) {
		return currentCategory.value.$articles;
	} else {
		return list.value.filter((doc) => doc.$category === null);
	}
});

export { currentCategory, currentArticles };
