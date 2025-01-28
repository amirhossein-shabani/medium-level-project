const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    //Adding dragging class toitem after a delay
    setTimeout(() => item.classList.add("dragging"), 0);
  });
  // Removing dragging class from on dragend event
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

//we use isThrottled and setTimeout for debouncing this function To stop be implemented many hundred time in second -- this is can improve our website speed .

let isThrottled = false;

const initSortableList = (e) => {
  e.preventDefault();

  if (isThrottled) {
    return;
  }

  isThrottled = true;

  const draggingItem = sortableList.querySelector(".dragging");

  // Getting all items expect currently dragging and makiing array of them .
  const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  //Finding the sibling after which the dragging item should be placed
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  //inserting the dragging item before the found sibling
  sortableList.insertBefore(draggingItem, nextSibling);

  setTimeout(() => {
    isThrottled = false;
  }, 100);
};

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());
