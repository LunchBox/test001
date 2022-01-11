import { ref, watch } from "vue";
import propertyFilter from "../utils/property_filter.js";
import axios from "axios";

export default class {
  static get list(){
    if (!this._list) {
      this._list = ref([]);
    }

    return this._list;
  }

  static loadFromStorage() {
    this.fetchAll();
  }

  static async fetchAll(){
    try {
      const res = await axios.get(`/api/${this.modelKey}`);

      this.list.value.splice(0);

      res.data.forEach((id) => {
        this.fetch(id);
      })
    } catch (err) {
      // just do nothing.
    }
  }
  
  static async fetch(id){
    const res = await axios.get(`/api/${this.modelKey}/${id}`);
    
    const model = this.fromStorage(res.data);
    model.id = id;

    const idx = this.list.value.findIndex((item) => item.id === model.id);
    if (idx > -1) {
      this.list.value.splice(idx, 1);
    }

    this.list.value.push(model);
    return model;
  }
  
  static async create(item){
    const data = JSON.stringify(item, propertyFilter);
    const res = await axios.post(`/api/${this.modelKey}`, data, { headers: { 'Content-Type': 'application/json' } });
    const { id } = res.data;
    item.id = id;

    this.list.value.push(item);
  }

  static async update(item, attrs){
    const { id, ...rest } = item;
    const data = JSON.stringify(attrs, propertyFilter);
    const res = await axios.put(`/api/${this.modelKey}/${id}`, data, { headers: { 'Content-Type': 'application/json' } });

    const model = this.fromStorage(res.data);
    model.id = id;

    const idx = this.list.value.findIndex((item) => item.id === id);
    if (idx > -1) {
      this.list.value.splice(idx, 1, model);
    }
  }

  static async destroy(item){
    const { id, ...rest } = item;
    const data = JSON.stringify(rest, propertyFilter);
    const res = await axios.delete(`/api/${this.modelKey}/${id}`);

    const idx = this.list.value.findIndex((item) => item.id === id);
    if (idx > -1) {
      this.list.value.splice(idx, 1);
    }
  }

  static fromStorage(values = {}){
    const model = new this(values);

    // model.id = +values.id;

    return model;
  }

  static get counterKey(){
    return this.modelKey + "_counter";
  }

  static get modelKey(){
    throw new Error("override this method to provide the model Key")
  }

  static get all(){
    return this.list;
  }

  static find(id){
		return this.list.value.find((model) => model.id === +id);
  }

	static findById(id) {
    return this.find(id);
	}

  static where(conds = {}){
    let res = this.all.value;
    for(let key in conds){
      res = res.filter((model) => model[key] === conds[key]);
    }

    return res;
  } 

  constructor(attrs = {}){
    const config = this.constructor.attributes;
    for (let key in config){
      const val = attrs[key];
      this[key] = val === undefined ? (config[key]?.default || null) : val;
    }
  }


  get $list(){
    return this.constructor.list.value;
  }

  create() {
    this.constructor.create(this);
  }

  update(attrs = {}){
    this.constructor.update(this, attrs);
  }

  destroy(){
    this.constructor.destroy(this);
  }
}
