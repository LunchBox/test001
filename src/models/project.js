export default class {
	constructor(id, name, description = null) {
		this.id = id;
		this.name = name;
    this.description = description;
	}

	static fromStorage(data) {
		const { id, name, description} = data;
		return new this(id, name, description);
	}
}
