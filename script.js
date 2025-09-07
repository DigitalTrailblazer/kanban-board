// const cards = document.querySelectorAll(".card")
// const lists = document.querySelectorAll(".list")

// // events

// for(const card of cards){
//     card.addEventListener("dragstart", dragStart);
//     card.addEventListener("dragend", dragEnd);
// }

// function dragStart(e){
//     // it allows the drop location to know which element is being moved when you release it.
//     e.dataTransfer.setData("text/plain", this.id)
// }

// function dragEnd(){
//     console.log("drag ended")
// }


// for(const list of lists){
//     list.addEventListener("dragover", dragOver)
//     list.addEventListener("dragenter", dragEnter)
//     list.addEventListener("dragleave", dragleave)
//     list.addEventListener("drop", dragDrop)
// }

// function dragOver(e){
//     // needed, bcz by default, browsers don't allow us to drop element from one to other element
//     e.preventDefault();
// }

// function dragEnter(e){
//     e.preventDefault();
//     this.classList.add("over");
// }

// function dragleave(e){
//     this.classList.remove("over");
// }

// function dragDrop(e){
//     const id = e.dataTransfer.getData("text/plain")

//     const card = document.getElementById(id)

//     this.appendChild(card);
//     this.classList.remove("over");
// }
// select lists
const lists = document.querySelectorAll(".list");

// input + button
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

// drag handlers
function addDragHandlers(card) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "listitem");
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
  e.dataTransfer.effectAllowed = "move";
  this.classList.add("dragging");
}

function dragEnd() {
  this.classList.remove("dragging");
}

// list handlers
for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  if (card) {
    this.appendChild(card);
    this.classList.remove("over");
    saveState();
  }
}

// add handlers to initial cards
document.querySelectorAll(".card").forEach(addDragHandlers);

// task creation
const FORCE_LOWERCASE = true;

function generateCardId() {
  return "card-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

function createCardElement(text) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = generateCardId();
  const safeText = String(text).trim();
  card.textContent = FORCE_LOWERCASE ? safeText.toLowerCase() : safeText;
  card.draggable = true;
  addDragHandlers(card);
  return card;
}

function addTaskToTodo(text) {
  const todoList = document.getElementById("list1");
  if (!todoList) return;
  const card = createCardElement(text);
  todoList.appendChild(card);
  saveState();
}

addTaskBtn.addEventListener("click", () => {
  const value = newTaskInput.value.trim();
  if (!value) {
    newTaskInput.focus();
    return;
  }
  addTaskToTodo(value);
  newTaskInput.value = "";
  newTaskInput.focus();
});

newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});