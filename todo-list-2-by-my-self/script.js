function todoApp() {

  const input = document.querySelector(".inputBox");
  const button = document.querySelector(".btn");
  const list = document.querySelector(".list");
  let itemArray = JSON.parse(localStorage.getItem("item")) || [];

  // ----------addItem-function ----------
  function addItem() {
    let value = input.value.trim();
    if (!value) {
      alert("You didn't write anything");
    } else {
      saveData(value);
      createEl(value, itemArray.length - 1);
      input.value = "";
    }
  }

  // --------btn function ------------
  function btn() {
    button.addEventListener("click", addItem);
  }

  // ----------enterKey-function ------------
  function enterKey() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        addItem();
      }
    });
  }

  // -----------createEl-function ---------------

  function createEl(value, index) {
    const li = document.createElement("li");
    li.textContent = value;
    li.classList.add("liItem");
    li.dataset.index = index;
    li.draggable = true;

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-xmark", "x");
    deleteBtn.addEventListener("click", () => deleteEl(index));

    const editBtn = document.createElement("i");
    editBtn.classList.add("fa-solid", "fa-edit", "edit");
    editBtn.addEventListener("click", () => editEl(li, index));

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    list.appendChild(li);
  }

  // -------deleteEl-function----------

  function deleteEl(index) {
    itemArray.splice(index, 1);
    updateLocalStorage();
    loadData();
  }

  // ----------editEl-function---------

  function editEl(li, index) {
    const existingInput = li.querySelector(".edit-input");
    if (existingInput) {
      const newValue = existingInput.value.trim();
      if (newValue) {
        itemArray[index] = newValue;
        updateLocalStorage();
        loadData();
      }
    } else {
      const inputEdit = document.createElement("input");
      inputEdit.classList.add("edit-input");
      inputEdit.value = li.firstChild.textContent.trim();
      li.appendChild(inputEdit);
      inputEdit.focus();

      inputEdit.addEventListener("blur", () => {
        const newValue = inputEdit.value.trim();
        if (newValue) {
          itemArray[index] = newValue;
          updateLocalStorage();
          loadData();
        }
      });
    }
  }


  // --------saveData-function----------
  function saveData(value) {
    itemArray.push(value);
    updateLocalStorage();
  }

  // ---------updateLocalStorage-function--------
  function updateLocalStorage() {
    localStorage.setItem("item", JSON.stringify(itemArray));
  }
  // loadData-function---------------
  function loadData() {
    list.innerHTML = "";
    itemArray.forEach((item, index) => {
      createEl(item, index);
    });
  }

  // ---------draggableList-function--------

  function draggableList() {
    list.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("liItem")) {
        e.target.classList.add("dragging");
      }
    });

    list.addEventListener("dragend", () => {
      const draggingEl = document.querySelector(".dragging");
      if (draggingEl) {
        draggingEl.classList.remove("dragging");
        updateIndexes(); 
      }
    });

    let isTrottle =  false  ;

    function initSortableList(e) {
      e.preventDefault();
      if (isTrottle) {
          return;
      }
      isTrottle = true;
  
      const draggingEl = list.querySelector(".dragging");
      const listItem = [...list.querySelectorAll(".liItem:not(.dragging)")];

      let nextItem = listItem.find((item) => {
        return e.clientY <= item.offsetTop + item.offsetHeight / 2;
      });

      if (draggingEl) {
        list.insertBefore(draggingEl, nextItem);
      }

      updateIndexes();

      setTimeout(() => {
        isTrottle = false;
      }, 100);

    }

    list.addEventListener("dragover", initSortableList);
    list.addEventListener("dragenter", (e) => e.preventDefault());
  }

  // --updateIndexes-function-----

  function updateIndexes() {
    const newArray = [];
    document.querySelectorAll(".liItem").forEach((li, newIndex) => {
        li.dataset.index = newIndex;
        newArray.push(li.textContent.trim()); 
    });

    itemArray = newArray; 
    updateLocalStorage(); 
  }

  // --call the functions ---
  btn();
  enterKey();
  loadData();
  draggableList(); 
  
}

todoApp();
