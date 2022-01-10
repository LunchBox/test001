import { ref, watch } from "vue";
import propertyFilter from "../utils/property_filter.js";

export default class {
  static list = ref([]);
	static idCounter = ref(0);

	static nextId() {
		this.idCounter.value += 1;
		return this.idCounter.value;
	}

	static saveToStorage() {
		window.localStorage.setItem(
			this.modelKey,
			JSON.stringify(this.list.value, propertyFilter),
		);

		window.localStorage.setItem(this.counterKey, this.idCounter.value);
	}

  static loadFromStorage() {
    const data = window.localStorage.getItem(this.modelKey);
    if (typeof data === "string") {
      const models = JSON.parse(data).map((values) => this.fromStorage(values));

      this.list.value.splice(0);
      this.list.value.push(...models);
    }

    this.idCounter.value = +window.localStorage.getItem(this.counterKey) || 0;
  }

  static fromStorage(values = {}){
    const model = new this(values);

    model.id = +values.id;

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

  static find_by(conds = {}){
    let res = this.all;
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
    this.id = this.constructor.nextId();
    
    // TODO: validation goes here
    this.$list.push(this);

    this.constructor.saveToStorage();
  }

  update(attrs = {}){

    // TODO: validation goes here
    Object.assign(this, attrs);

    this.constructor.saveToStorage();
  }

  destroy(){
    const idx = this.$list.findIndex((model) => model.id === this.id)
    if (idx > -1){
      this.$list.splice(idx, 1)
    }

    this.constructor.saveToStorage();
  }
}
