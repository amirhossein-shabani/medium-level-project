const input = document.querySelector(".input-box");
const btn = document.querySelector(".add-item");
const list = document.querySelector(".list");

let storedItems = localStorage.getItem('items');
let itemArray = storedItems ? JSON.parse(storedItems) : [];

loadData();

function addItem() {
  const inputData = input.value.trim();
  console.log(inputData);
  if (!inputData) {
    alert("you have to write something");
  } else {
    const index = itemArray.length;
    createEl(inputData, index, true);
    input.value = "";
  }
}

btn.addEventListener("click", addItem);

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem();
  }
});

function createEl(inputData, index, shouldSave) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  li.appendChild(p);
  p.textContent = inputData;
  li.classList.add("liItem");
  li.dataset.index = index;
  list.appendChild(li);

  const edit = document.createElement("div");
  edit.classList.add("edit");
  edit.textContent = "edit";
  li.appendChild(edit);

  const del = document.createElement("div");
  del.classList.add("delete");
  del.textContent = "\u00D7";
  li.appendChild(del);

  edit.addEventListener("click", () => editData( li, index));

  del.addEventListener("click", () => deleteFun(index));

  if (shouldSave) {
    saveData(inputData, index);
  }
}

function saveData(inputData, index) {
  itemArray.push({ textContent: inputData, count: index });
  console.log(itemArray);
  saveLs(itemArray);
}

function saveLs(itemArray) {
  localStorage.setItem("items", JSON.stringify(itemArray));
}

function loadData() {
  list.innerHTML = "";
  let itemArray = JSON.parse(localStorage.getItem("items")) || [];
  itemArray.forEach((item, index) => {
    createEl(item.textContent, index, false);
  });
}

function deleteFun(index) {
  itemArray.splice(index, 1);
  uppdateIndex();
  saveLs(itemArray);
  loadData();
}

function uppdateIndex() {
  itemArray.forEach((item, index) => {
    item.count = index;
  });
}

function editData( li, index) {
  const existingInput = document.querySelector(".input-e");
  const editbtn = document.querySelector('.edit')
  if (existingInput) {
    const newValue = existingInput.value.trim();
    if (newValue) {
      itemArray[index].textContent = newValue;
      saveLs(itemArray);
      loadData();
    }
  } else {
    const inputE = document.createElement("input");
    inputE.classList.add("input-e");
    inputE.value = li.firstChild.textContent.trim();
    li.appendChild(inputE);
    inputE.focus();

    inputE.addEventListener("blur", () => {
      const newValue = inputE.value.trim();
      if (newValue) {
        itemArray[index].textContent = newValue;
        saveLs(itemArray);
        loadData();
      }
    });
  }
}

function dragData() {}
