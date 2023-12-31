import uniqid from "uniqid";
export default class List {
  constructor() {
    this.items = [];
  }

  deleteItem(id) {
    // id aar indexiig haih
    const index = this.items.findIndex((el) => el.id === id);
    // ug indextei element ustgah
    this.items.splice(index, 1);
  }

  addItem(item) {
    let newItem = {
      id: uniqid(),
      item,
    };
    this.items.push();
    return newItem;
  }
}
