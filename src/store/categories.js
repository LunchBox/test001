import { ref, computed, watch } from "vue";
import Category from "../models/category.js";
import propertyFilter from "../utils/property_filter.js";
import useAutoSaveList from "./useAutoSaveList.js";

const Model = Category;
const storageKey = "categories";
const counterKey = `${storageKey}_counter`;
const { list, nextId, findById, idCounter } = useAutoSaveList(storageKey);

function create(attrs = {}) {
	// TODO: validation will be placed here

	const { name, parentId, projectId } = attrs;

	const id = nextId();
	const model = new Model(id, name);

	if (parentId != null) {
		const parent = findById(parentId);
		if (parent) {
			model.parentId = parentId;
			model.$parent = parent;
			parent.$children.push(model);
		}
	}

	list.value.push(model);
}

const topLevelCategories = computed(() => {
	return list.value.filter((cate) => cate.$parent === null);
});

function loadFromStorage() {
	const item = window.localStorage.getItem(storageKey);
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

	idCounter.value = +window.localStorage.getItem(counterKey) || 0;
}

loadFromStorage();

export { list, create, topLevelCategories, findById };
