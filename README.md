### **_Description_**

The TS-TODO app was made with Typescript. This is vanilla TS app. Utilizing OOP paradigm. Main goal was to practice OOP and Typescript.
This app is good for learning and practice. Also has many features like drag and drop, filtering and CRUD operations.

**Live preview:** [https://ts-todo-chi.vercel.app/](https://ts-todo-chi.vercel.app/)

#### Features

- Dark and light mode
- You can add, edit, create and delete todo's
- Mark todo's as completed
- You can filter by status (Completed, Active, All)
- Select todo's and change their status
- Delete selected todo's
- clear all completed todo's
- Drag and drop todo's

> In this project I learned how to use drag and drop API.
>
> > Example of drag and drop:

```js
export const dragList = () => {
  // Script.js
  const sortableList = document.getElementById(
    "draggable-list"
  ) as HTMLUListElement;
  let draggedItem: any = null;

  sortableList.addEventListener("dragstart", (e: DragEvent) => {
    draggedItem = e.target as HTMLLIElement;
    draggedItem.classList.add("dragging");
    setTimeout(() => {
      draggedItem.style.display = "none";
    }, 0);
  });

  sortableList.addEventListener("dragend", (e: DragEvent) => {
    draggedItem = e.target as HTMLLIElement;
    draggedItem.classList.remove("dragging");
    setTimeout(() => {
      draggedItem.style.display = "";
      draggedItem = null;
    }, 0);
  });

  sortableList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(sortableList, e.clientY);
    // const currentElement = document.querySelector(".dragging");
    if (afterElement == null) {
      sortableList.appendChild(draggedItem);
    } else {
      sortableList.insertBefore(draggedItem, afterElement);
    }
  });

  const getDragAfterElement = (container: any, y: any) => {
    const draggableElements = [
      ...container.querySelectorAll("li:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return {
            offset: offset,
            element: child,
          };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    ).element;
  };
};
```
