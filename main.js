const textInput = document.getElementById("textInput")

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

  li.appendChild(createDeleteButton());
  li.appendChild(createEditButton());

  //done function
  li.addEventListener("click", function() {
    if (li.firstElementChild.tagName !== 'INPUT') {
      let editButton = createEditButton()
      let deleteButton = li.getElementsByClassName("deleteButton")[0];
      if (span.style.textDecoration === "line-through") {
        span.style.textDecoration = "none";
        deleteButton.style.borderRadius = "0 5px 5px 0";
        li.appendChild(editButton);
      } else {
        span.style.textDecoration = "line-through";
        li.getElementsByClassName("editButton")[0].remove();
        // li.removeChild(createEditButton());
        deleteButton.style.borderRadius = "5px";
      }
    }
  });

  return li;
}

function createCurrentTime() {2
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

function addTodo(event) {
  let input = document.getElementById("inputTodo");
  let li = document.createElement("li");
  let text = document.createTextNode(input.value);
  li.appendChild(text);
  document.getElementById("ulOfTasks").appendChild(li);
  input.value = "";

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todo = {
    text: input.value,
    time: new Date()
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function editTodo(event) {
  let li = event.currentTarget.parentNode;
  let span = li.firstChild;
  let originalText = li.firstChild.firstChild.nodeValue;
  let input = document.createElement("input");
  input.value = originalText;
  li.replaceChild(input, li.firstChild);
  let deleteButton = li.getElementsByClassName("deleteButton")[0];
  let editButton = li.getElementsByClassName("editButton")[0];
  let currentTimeSpan = li.getElementsByTagName("span")[0];
  deleteButton.remove();
  editButton.remove();
  currentTimeSpan.remove();

  let cancelButton = document.createElement("button");
  cancelButton.appendChild(document.createTextNode("Cancel"));
  cancelButton.addEventListener("click", function() {
    span.value = input.value;
    li.replaceChild(span, input);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(currentTimeSpan);
    saveButton.remove();
    cancelButton.remove();
    li.click();
    li.click();
    li.click();
  });
  cancelButton.className = 'cancelButton';
  li.appendChild(cancelButton);

  let saveButton = document.createElement("button");
  saveButton.appendChild(document.createTextNode("Save"));
  saveButton.addEventListener("click", function() {
    span.textContent = input.value;
    li.removeChild(input);
    li.insertBefore(span, li.firstChild);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(currentTimeSpan);
    saveButton.remove();
    cancelButton.remove();
    li.click();
    li.click();
    li.click();
  });
  saveButton.className = 'saveButton';

  li.appendChild(saveButton);

  li.appendChild(cancelButton);
}

function deleteTodo(event) {
  let li = event.currentTarget.parentNode;
  let ul = document.getElementById("ulOfTasks");
  ul.removeChild(li);

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let index = todos.findIndex(function(todo) {
    return todo.text === li.textContent;
  });
  if (index !== -1) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function onAddButtonClick() {
  let inputValue = textInput.value;

  if (inputValue.trim().length === 0) {
    showAlert();
  } else {
    addTodo(inputValue);
    textInput.value = "";
  }
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});


// Save the to-do list to local storage
function saveTodoList() {
  const todoList = getTodoList();
  const todoListArray = [];

  for (let i = 0; i < todoList.children.length; i++) {
    todoListArray.push(todoList.children[i].textContent.trim());
  }

  localStorage.setItem("todoList", JSON.stringify(todoListArray));
}

// Load the to-do list from local storage
function loadTodoList() {
  const todoListArray = JSON.parse(localStorage.getItem("todoList"));

  if (!todoListArray) return;

  const todoList = getTodoList();

  for (let i = 0; i < todoListArray.length; i++) {
    const todoItem = createTodoItem(todoListArray[i]);
    todoList.appendChild(todoItem);
  }
}

// Call loadTodoList when the page loads
window.addEventListener("load", loadTodoList);

// Call saveTodoList when a new to-do item is added
const addButton = document.getElementById("button-push");
addButton.addEventListener("click", function() {
  addTodo();
  saveTodoList();
});

// Remove a to-do item from local storage
function removeToDo(index) {
  let todos = getToDos();
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}