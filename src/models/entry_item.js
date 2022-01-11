import { computed } from "vue";
import Base from "./base.js";
import Entry from "./entry.js";

class EntryItem extends Base {
	static modelKey = "entry_items";

	static attributes = {
		entryId: { type: "integer" },
		comment: { type: "text" },
	};

	get $entry() {
		return computed(() => Entry.find(this.entryId));
	}

	afterCreate() {
		const entry = this.$entry.value;
		entry.entryItemIds.push(this.id);
		entry.update();
	}
}

// EntryItem.fetchAll();

export default EntryItem;
