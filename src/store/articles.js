import { ref, computed, watch } from "vue";
import Article from "../models/article.js";
import Category from "../models/category.js";
import propertyFilter from "../utils/property_filter.js";

import { findById as findCategoryById } from "./categories.js";

import useAutoSaveList from "./useAutoSaveList.js";

const ITEM_KEY = "articles";

const { list, nextId, findById, idCounter } = useAutoSaveList(ITEM_KEY);

function addToList(title, content, categoryId = null) {
	const id = nextId();

	const article = new Article(id, title, content, categoryId);

	if (categoryId != null) {
		const category = findCategoryById(categoryId);
		if (category) {
			article.categoryId = categoryId;
			article.$category = category;
			category.$articles.push(article);
		}
	}

	list.value.push(article);
}


function loadFromStorage() {
	const item = window.localStorage.getItem(ITEM_KEY);
	if (typeof item === "string") {
		const data = JSON.parse(item);

		const articles = data.map((cData) => Article.fromStorage(cData));

		list.value.splice(0);
		list.value.push(...articles);

		articles.forEach((doc) => {
			if (doc.categoryId !== null) {
				const category = findCategoryById(doc.categoryId);
				if (category) {
					doc.$category = category;
					category.$articles.push(doc);
				}
			}
		});
	}

	idCounter.value = +window.localStorage.getItem(ITEM_KEY + "_counter");
}

loadFromStorage();

export { list, addToList };
