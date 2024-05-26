import List from "../model/List";
import { v4 as uuidv4 } from "uuid";

import ListTemplate from "../templates/ListTemplate";
import listItem from "../model/ListItem";

export const addNewItem = () => {
  const form = document.querySelector(".todo-form") as HTMLFormElement;
  const input = document.querySelector("#new-todo") as HTMLInputElement;

  const list = List.getInstance();
  const listTemplate = ListTemplate.getInstance();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input.value) {
      return;
    } else {
      const itemId: string = uuidv4();
      const description = input.value.trim();

      const item = new listItem(itemId, description, false);
      list.addItem(item);
      list.saveList();
      listTemplate.render(list.items);
      input.value = "";
    }
  });
};
