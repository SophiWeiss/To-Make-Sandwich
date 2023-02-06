// // Load to-do items from local storage
// const loadTodos = () => {
//   const todos = JSON.parse(localStorage.getItem("todos")) || [];
//
//   todos.forEach(todo => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       ${todo.text}
//       <small>${todo.currentTimeSpan}</small>
//       <button id="editButton" >Edit</button>
//       <button id="deleteButton" >Delete</button>
//     `;
//     todoList.appendChild(li);
//   });
// };
//
// // Save to-do items to local storage
// const saveTodos = todos => {
//   localStorage.setItem("todos", JSON.stringify(todos));
// };
//
// loadTodos();

function getInputValue() {
  return document.getElementById("textInput").value;
}

function clearInput() {
  document.getElementById("textInput").value = "";
}

function showAlert() {
  alert("(👉ﾟヮﾟ)👉 Please enter at least something");
}

function getTodoList() {
  return document.getElementById("ulOfTasks");
}

function createTodoItem(value) {
  let li = document.createElement("li");

  const span = document.createElement('span')
  span.textContent = value
  li.appendChild(span);
  li.appendChild(createCurrentTime());

  li.appendChild(createEditButton());
  li.appendChild(createDeleteButton());

  return li;
}

function createCurrentTime() {
  let currentTime = new Date().toLocaleString();
  let currentTimeSpan = document.createElement("span");
  currentTimeSpan.style.fontSize = "11px";
  currentTimeSpan.style.color = "grey";
  currentTimeSpan.appendChild(document.createTextNode(" (" + currentTime + ")"));
  return currentTimeSpan;
}

function createEditButton() {
  let editButton = document.createElement("button");
  editButton.appendChild(document.createTextNode("Edit"));
  editButton.className = 'editButton';
  editButton.addEventListener("click", editTodo);
  return editButton;
}

function createDeleteButton() {
  let deleteButton = document.createElement("button");
  deleteButton.appendChild(document.createTextNode("Delete"));
  deleteButton.className = 'deleteButton';
  deleteButton.addEventListener("click", deleteTodo);
  return deleteButton;
}

function addTodo(value) {
  let todoList = getTodoList();
  let todoItem = createTodoItem(value);
  todoList.appendChild(todoItem);
}

function editTodo() {
  // code for editing a todo item
}

function deleteTodo() {
  // code for deleting a todo item
}

function checkInput() {
  let inputValue = getInputValue();

  if (inputValue.trim().length === 0) {
    showAlert();
  } else {
    addTodo(inputValue);
    clearInput();
  }
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});