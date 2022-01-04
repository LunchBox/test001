import { ref, computed, watch } from "vue";
import Category from "../models/category.js";
import propertyFilter from "../utils/property_filter.js";
import useAutoSaveList from "./useAutoSaveList.js";

// const idCounter = ref(0);

// const list = ref([]);

// function findById(id) {
// 	return list.value.find((cate) => cate.id === id);
// }

const { list, nextId, findById, idCounter } = useAutoSaveList("categories");

function addToList(name, parentId = null) {
	// TODO: validation will be placed here

	const id = nextId();
	const category = new Category(id, name);

	if (parentId != null) {
		const parent = findById(parentId);
		if (parent) {
			category.parentId = parentId;
			category.$parent = parent;
			parent.$children.push(category);
		}
	}

	list.value.push(category);
}

const topLevelCategories = computed(() => {
	return list.value.filter((cate) => cate.$parent === null);
});

// function saveToStorage() {
// 	window.localStorage.setItem(
// 		"categories",
// 		JSON.stringify(list.value, propertyFilter),
// 	);
// }

function loadFromStorage() {
	const item = window.localStorage.getItem("categories");
	if (typeof item === "string") {
		const data = JSON.parse(item);

		const categories = data.map((cData) => Category.fromStorage(cData));

		list.value.splice(0);
		list.value.push(...categories);

		categories.forEach((c) => {
			if (c.parentId !== null) {
				const parent = findById(c.parentId);
				if (parent) {
					c.$parent = parent;
					parent.$children.push(c);
				}
			}
		});
	}

	idCounter.value = +window.localStorage.getItem("categories_counter") || 0;
}

loadFromStorage();

// watch(
// 	list,
// 	() => {
// 		console.log("value changed, save to storage");

// 		console.log(list);

// 		saveToStorage();
// 	},
// 	{ deep: true },
// );

// const { list, findById } = useAutoSave("categories");

export { list, addToList, topLevelCategories, findById };
