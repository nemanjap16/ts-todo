import "./style.css";
import { dragList } from "./util/dragList";
import List from "./model/List";
import ListTemplate from "./templates/ListTemplate";
import { addNewItem } from "./util/addNewItem";

const clearCompleted = document.querySelector(
  ".clear-completed"
) as HTMLSpanElement;

const showAllItems = document.querySelector(".all-filter") as HTMLSpanElement;

const activeItems = document.querySelector(".active-filter") as HTMLSpanElement;

const completedItems = document.querySelector(
  ".completed-filter"
) as HTMLSpanElement;

const initApp = () => {
  let list = List.getInstance();
  const listTemplate = ListTemplate.getInstance();

  listTemplate.clear();
  list.load();
  listTemplate.render(list.items);
  addNewItem();

  showAllItems.addEventListener("click", () => {
    listTemplate.clear();
    list.allItems();
    listTemplate.render(list.items);
  });

  activeItems.addEventListener("click", () => {
    listTemplate.clear();
    list.activeItems();
    listTemplate.render(list.items);
  });

  completedItems.addEventListener("click", () => {
    listTemplate.clear();
    list.completedItems();
    listTemplate.render(list.items);
  });

  clearCompleted.addEventListener("click", () => {
    list.removeCompleted();
    listTemplate.render(list.items);
  });

  dragList();
};

document.addEventListener("DOMContentLoaded", initApp);
