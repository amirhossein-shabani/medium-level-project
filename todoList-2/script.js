
//* modal */

const btns = document.querySelectorAll("[data-target-modal]");
const close_modals =
 document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");  
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) { 
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};
  

/* create todo */

const todo_submit = document.getElementById('todo_submit');

todo_submit.addEventListener('click' , createTodo)

function createTodo(){

  const todo_div = document.createElement('div');
  const input_val = document.getElementById('todo_input').value ;
  const txt = document.createTextNode(input_val);
  todo_div.appendChild(txt);
  todo_div.classList.add('todo');
  todo_div.setAttribute('draggable' , 'true');

  // create span =
  const span  = document.createElement('span');
  const span_txt = document.createTextNode('\u00D7');
  span.appendChild(span_txt)
  span.classList.add('close');


  todo_div.appendChild(span);
  no_status.appendChild(todo_div);


  span.addEventListener('click' , ()=>{
    span.parentElement.style.display = 'none';
  });

  todo_div.addEventListener('dragstart' , dragStrat);
  todo_div.addEventListener('dragend' , dragEnd);

  document.getElementById('todo_input').value = '' ;

  todo_form.classList.remove('active');
  overlay.classList.remove('active');

}


// ---drop and drag-todo ---

const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;


// todos.forEach((todo) => {
//   todo.addEventListener("dragstart", dragStrat);
//   todo.addEventListener("dragend", dragEnd);
// });

function dragStrat() {
  draggableTodo = this;
  setTimeout(()=>{
    this.style.display = 'none';
  },0)
  console.log(dragStrat)
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(()=>{
    this.style.display = 'block';
  },0)
  console.log("dragEnd");
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dargOver);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("drop", dragDrop);
});

function dargOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("drageDrop");
}
