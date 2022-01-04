export default class {
	constructor(id, name, parentId = null) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;

		this.$parent = null;
		this.$children = [];
		this.$articles = [];
	}

	static fromStorage(data) {
		const { id, name, parentId } = data;
		return new this(id, name, parentId);
	}
}
