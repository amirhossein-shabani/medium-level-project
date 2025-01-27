const inputBox = document.getElementById("input-box");
const listContaienr = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContaienr.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = "\u00d7"
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData()
};

listContaienr.addEventListener("click" , (e)=>{
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData()
  }else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove()
    saveData()
  }
} , false);

function saveData(){
  localStorage.setItem("data" , listContaienr.innerHTML);
}

function showTask(){
  listContaienr.innerHTML = localStorage.getItem("data");
}

showTask();