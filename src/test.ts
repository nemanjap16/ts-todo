import List from "./model/List";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

let totalItems = document.querySelector(".total-items") as HTMLSpanElement;

const initApp = () => {
  const list = List.getInstance();
  const listItem = ListItem;
  const listTemplate = ListTemplate.instance;
  listTemplate.clear();
  // list.clearList();
  list.load();
  listTemplate.render(list);

  const form = document.querySelector(".todo-form") as HTMLFormElement;
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.querySelector(".todo") as HTMLInputElement;
    const itemId: number = list.getCount() + 1;
    const description = input.value.trim();

    if (input.value) {
      const item = new listItem(itemId, description, false);
      list.addItem(item);
      listTemplate.render(list);
      input.value = "";
    }

    totalItems.textContent = list.getCount().toString();
  });

  const clearButton = document.querySelector(
    ".clear-completed"
  ) as HTMLButtonElement;
  clearButton.addEventListener("click", () => {
    list.clearList();
    listTemplate.render(list);
    totalItems.innerText = list.getCount().toString();
  });
};

document.addEventListener("DOMContentLoaded", initApp);
