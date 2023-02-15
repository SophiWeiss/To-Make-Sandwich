const textInput = document.getElementById("textInput")

let totalTodos = 0;
let completedTodos = 0;
const progressBar = document.getElementById("progress-bar");


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
    if (span.style.textDecoration === "line-through") {
      completedTodos++;
    } else {
      completedTodos--;
    }
    updateProgressBar();
  });

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
  totalTodos++;
  updateProgressBar();
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
  cancelButton.addEventListener("click", function(event) {
    span.value = input.value;
    li.replaceChild(span, input);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(currentTimeSpan);
    saveButton.remove();
    cancelButton.remove();
    event.stopPropagation();
  });
  cancelButton.className = 'cancelButton';
  li.appendChild(cancelButton);

  let saveButton = document.createElement("button");
  saveButton.appendChild(document.createTextNode("Save"));
  saveButton.addEventListener("click", function(event) {
    span.textContent = input.value;
    li.removeChild(input);
    li.insertBefore(span, li.firstChild);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(currentTimeSpan);
    saveButton.remove();
    cancelButton.remove();
    event.stopPropagation();
  });
  saveButton.className = 'saveButton';

  li.appendChild(saveButton);

  li.appendChild(cancelButton);
}

function deleteTodo(event) {
  event.stopPropagation();
  let li = event.currentTarget.parentNode;
  let ul = document.getElementById("ulOfTasks");
  ul.removeChild(li);

  let spam = li.firstChild;
  if (spam.style.textDecoration === "line-through") {
    completedTodos--;
  }
  totalTodos--;
  updateProgressBar();
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

function updateProgressBar() {
  let percentage = (completedTodos / totalTodos) * 100;
  if (!totalTodos) {
    percentage = 0
  }
  progressBar.style.width = percentage + "%";
}

// // let li = createTodoItem(li).currentTarget.parentNode;
//
// const key = 'to-do-items';
// const value = "cococoocococo";
//
// localStorage.setItem(key, value);
//
// const coco = localStorage.getItem(key)
//
// const li = document.createElement('li')
// li.textContent = `Hi! I am ${coco}`
// document.body.appendChild(li)