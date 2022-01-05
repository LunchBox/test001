import { ref, watch } from "vue";
import propertyFilter from "../utils/property_filter.js";

export default function (itemKey) {
	const idCounter = ref(0);

	function nextId() {
		idCounter.value += 1;
		return idCounter.value;
	}

	const list = ref([]);

	function findById(id) {
		return list.value.find((cate) => cate.id === +id);
	}

	function saveToStorage() {
		window.localStorage.setItem(
			itemKey,
			JSON.stringify(list.value, propertyFilter),
		);

		window.localStorage.setItem(itemKey + "_counter", idCounter.value);
	}

	watch(
		list,
		() => {
			console.log("value changed, save to storage");

			console.log(list);

			saveToStorage();
		},
		{ deep: true },
	);

	return {
		list,
		idCounter,
		nextId,
		findById,
	};
}
