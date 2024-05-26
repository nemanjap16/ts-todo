import ListItem from "./ListItem";

export interface ListInterface {
  items: ListItem[];
  load(): void;
  saveList(): void;
  saveModifiedList(item: ListItem): void;
  removeCompleted: () => void;
  addItem(item: ListItem): void;
  removeItem(item: ListItem): void;
  getCount(): number;
  allItems(): void;
  activeItems(): void;
  completedItems(): void;
}

export default class List implements ListInterface {
  private static instance: List;

  items: ListItem[] = [];

  private constructor() {}

  static getInstance(): List {
    if (!List.instance) {
      List.instance = new List();
    }
    return List.instance;
  }

  load(): void {
    const items = JSON.parse(localStorage.getItem("todo-items") || "[]");
    this.items = items;
  }

  saveList(): void {
    localStorage.setItem("todo-items", JSON.stringify(this.items));
  }

  saveModifiedList(item: ListItem): void {
    const items = JSON.parse(localStorage.getItem("todo-items") || "[]");
    const index = items.findIndex((i: ListItem) => i.id === item.id);
    items[index] = item;
    localStorage.setItem("todo-items", JSON.stringify(items));
  }

  removeCompleted(): void {
    const items = JSON.parse(localStorage.getItem("todo-items") || "[]");
    this.items = items.filter((item: ListItem) => !item.completed);
    localStorage.setItem("todo-items", JSON.stringify(this.items));
  }

  addItem(item: ListItem): void {
    this.items.push(item);
  }

  removeItem(item: ListItem): void {
    const items = JSON.parse(localStorage.getItem("todo-items") || "[]");
    this.items = items.filter((i: ListItem) => i.id !== item.id);
    localStorage.setItem("todo-items", JSON.stringify(this.items));
  }

  allItems(): void {
    this.load();
  }

  activeItems(): void {
    this.load();
    this.items = this.items.filter((item) => !item.completed);
  }

  completedItems(): void {
    this.load();
    this.items = this.items.filter((item) => item.completed);
  }

  getCount(): number {
    return this.items.length;
  }
}
