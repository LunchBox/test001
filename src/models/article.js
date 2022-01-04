export default class {
	constructor(id, title = "Untitled", content, categoryId = null) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.categoryId = categoryId;

		this.$category = null;
	}

	static fromStorage(data) {
		const { id, title, content, categoryId } = data;
		return new this(id, title, content, categoryId);
	}
}
