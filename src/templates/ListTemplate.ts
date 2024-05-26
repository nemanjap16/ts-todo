import List from "../model/List";
import ListItem from "../model/ListItem";

const totalItems = document.querySelector(".total-items") as HTMLSpanElement;

interface ListTemplateInterface {
  clearListItems(): void;
  render(items: ListItem[]): void;
}

const list = List.getInstance();

export default class ListTemplate implements ListTemplateInterface {
  private static instance: ListTemplate;

  private constructor() {}

  static getInstance(): ListTemplate {
    if (!ListTemplate.instance) {
      ListTemplate.instance = new ListTemplate();
    }
    return ListTemplate.instance;
  }

  clearListItems(): void {
    const tasks = document.querySelector("ul.tasks") as HTMLUListElement;
    tasks.innerHTML = "";
  }

  render(items: ListItem[]): void {
    const tasks = document.querySelector("ul.tasks") as HTMLUListElement;
    tasks.innerHTML = "";

    totalItems.textContent = list.getCount().toString();

    items.forEach((item: ListItem) => {
      const todo = document.createElement("li") as HTMLLIElement;
      todo.draggable = true;
      todo.classList.add("todo");
      const label = document.createElement("label") as HTMLLabelElement;
      const input = document.createElement("input") as HTMLInputElement;

      input.type = "checkbox";
      input.id = item.id;
      input.checked = item.completed;
      const span = document.createElement("span") as HTMLSpanElement;
      input.addEventListener("change", () => {
        item.completed = input.checked;
        list.saveModifiedList(item);
      });
      span.classList.add("todo-text");
      span.textContent = item.description;
      label.htmlFor = item.id;
      label.appendChild(input);
      label.appendChild(span);
      todo.appendChild(label);

      const div = document.createElement("div");
      div.classList.add("todo-actions");
      todo.appendChild(div);

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.textContent = "edit";
      div.appendChild(editBtn);

      editBtn.addEventListener("click", () => {
        const description = prompt("Enter new description", item.description);
        if (description) {
          item.description = description.trim();
          list.saveModifiedList(item);
          this.render(list.items);
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "delete";
      div.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this item?")) {
          list.removeItem(item);
          this.render(list.items);
        }
      });

      tasks.appendChild(todo);
    });
  }
}
