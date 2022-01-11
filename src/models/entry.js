import { computed } from "vue";
import Base from "./base.js";
import EntryItem from "./entry_item.js";

class Entry extends Base {
	static modelKey = "entries";

	static attributes = {
		name: { type: "string" },
		entryItemIds: { type: "array", default: [] },
	};

	get $entryItems() {
		return computed(() =>
			this.entryItemIds
				.map((id) => EntryItem.find(id))
				.filter((ei) => ei !== null),
		);
	}
}

export default Entry;
