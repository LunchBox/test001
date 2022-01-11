import { ref, computed, watch } from "vue";
import propertyFilter from "../utils/property_filter.js";
import axios from "axios";

export default class {
	static get list() {
		if (!this._list) {
			this._list = ref([]);
		}

		return this._list;
	}

	static async fetchAll() {
		try {
			const res = await axios.get(`/api/${this.modelKey}`);

			this.list.value = await this.fetch(res.data);
		} catch (err) {
			// just do nothing.
		}
	}

	static async fetch(ids = []) {
		const res = ids.map((id) => axios.get(`/api/${this.modelKey}/${id}`));
		const dataList = await Promise.all(res);

		const list = this.list.value;
		return dataList.map((res, idx) => {
			const model = this.fromStorage(res.data);
			model.id = ids[idx];

			const i = list.findIndex((item) => item.id === model.id);
			if (i > -1) {
				list.splice(i, 1);
			}

			list.push(model);
			return model;
		});
	}

	static async create(item) {
		const data = JSON.stringify(item, propertyFilter);
		const res = await axios.post(`/api/${this.modelKey}`, data, {
			headers: { "Content-Type": "application/json" },
		});
		const { id } = res.data;
		item.id = id;

		this.list.value.push(item);
	}

	static async update(item, attrs) {
		const { id, ...rest } = item;
		const data = JSON.stringify(attrs, propertyFilter);
		const res = await axios.put(`/api/${this.modelKey}/${id}`, data, {
			headers: { "Content-Type": "application/json" },
		});

		const model = this.fromStorage(res.data);
		model.id = id;

		const idx = this.list.value.findIndex((item) => item.id === id);
		if (idx > -1) {
			this.list.value.splice(idx, 1, model);
		}
	}

	static async destroy(item) {
		const { id, ...rest } = item;
		const data = JSON.stringify(rest, propertyFilter);
		const res = await axios.delete(`/api/${this.modelKey}/${id}`);

		const idx = this.list.value.findIndex((item) => item.id === id);
		if (idx > -1) {
			this.list.value.splice(idx, 1);
		}
	}

	static fromStorage(values = {}) {
		const model = new this(values);
		return model;
	}

	static get modelKey() {
		throw new Error("override this method to provide the model Key");
	}

	static get all() {
		return this.list;
	}

	static find(id) {
		return this.list.value.find((model) => model.id === id) || null;
	}

	static findById(id) {
		return this.find(id);
	}

	static where(conds = {}) {
		let res = this.all.value;
		for (let key in conds) {
			res = res.filter((model) => model[key] === conds[key]);
		}

		return res;
	}

	constructor(attrs = {}) {
		const config = this.constructor.attributes;
		for (let key in config) {
			const val = attrs[key];
			this[key] = val === undefined ? config[key]?.default || null : val;
		}
	}

	get $list() {
		return this.constructor.list.value;
	}

	async create() {
		this.beforeSave();
		this.beforeCreate();
		await this.constructor.create(this);
		this.afterCreate();
		this.afterSave();
	}

	async update(attrs = {}) {
		this.beforeSave();
		this.beforeUpdate();

		const { id, ...rest } = this;
		await this.constructor.update(this, { ...rest, ...attrs });

		this.afterUpdate();
		this.afterSave();
	}

	async destroy() {
		this.beforeDestroy();
		await this.constructor.destroy(this);
		this.afterDestroy();
	}

	// override these callbacks for further actions
	beforeCreate() {}
	afterCreate() {}

	beforeSave() {}
	afterSave() {}

	beforeUpdate() {}
	afterUpdate() {}

	beforeDestroy() {}
	afterDestroy() {}
}
