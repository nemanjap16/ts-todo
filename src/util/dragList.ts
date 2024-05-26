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
