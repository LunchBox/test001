import Base from "./base.js"

class EntryItem extends Base {

  static modelKey = "entry_items";

  static attributes = {
    entryId: { type: "integer" },
    comment: { type: "text" },
  };
}

EntryItem.loadFromStorage();

export default EntryItem;
