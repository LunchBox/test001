import { ref, computed, watch } from "vue";
import Project from "../models/project.js";
import propertyFilter from "../utils/property_filter.js";
import useAutoSaveList from "./useAutoSaveList.js";


const Model = Project;
const storageKey = "projects";
const counterKey = `${storageKey}_counter`;

const { list, nextId, findById, idCounter } = useAutoSaveList(storageKey);

function addToList(name, description = null) {
	const id = nextId();
	const model = new Model(id, name, description);

	list.value.push(model);
}


function loadFromStorage() {
	const item = window.localStorage.getItem(storageKey);
	if (typeof item === "string") {

		const data = JSON.parse(item);
		const models = data.map((cData) => Model.fromStorage(cData));

		list.value.splice(0);
		list.value.push(...models);
	}

	idCounter.value = +window.localStorage.getItem(counterKey) || 0;
}

loadFromStorage();

function update(model, name, description){
  model.name = name 
  model.description = description 
} 

export { list, addToList, findById, update };
