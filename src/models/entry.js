import Base from "./base.js"

class Entry extends Base {

  static modelKey = "entries";

  static attributes = {
    name: { type: "string" }
  };
}

Entry.loadFromStorage();

export default Entry;
