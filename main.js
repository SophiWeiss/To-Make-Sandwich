const textInput = document.getElementById("textInput")

const key = 'to-do-items';

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
      let deleteButton = li.getElementsByClassName("deleteButton")[0];
      if (span.style.textDecoration === "line-through") {
        completedTodos--;
        span.style.textDecoration = "none";
        let editButton = createEditButton()
        editButton.classList.add('slide-in')
        li.appendChild(editButton);
        deleteButton.style.borderRadius = "0 5px 5px 0";
      } else {
        completedTodos++;
        span.style.textDecoration = "line-through";
        let editButton = li.getElementsByClassName("editButton")[0]
        editButton.classList.add('slide-out')
        setTimeout(() => editButton.remove(), 300)
        deleteButton.style.borderRadius = "5px";
      }
      updateProgressBar();
    }
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
  event.stopPropagation();
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
    event.stopPropagation();
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
    event.stopPropagation();
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
    let itemsArray = JSON.parse(localStorage.getItem(key)) || [];

    itemsArray.push(inputValue);
    localStorage.setItem(key, JSON.stringify(itemsArray));

  }
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});

function updateProgressBar() {
  let percentage = (completedTodos / totalTodos);
  if (!totalTodos) {
    percentage = 0
  }
  progressBar.style.width = percentage * 100 + "%";
  let RGBArray1 = [238, 132, 215].map(x => percentage * x)
  let RGBArray2 = [142, 223, 252].map(x => (1 - percentage) * x)
  let RGBArray =  Array.from({length: 3}).map((_, index) => RGBArray1[index] + RGBArray2[index])
  progressBar.style.background = `rgb(${RGBArray})`
}

let todoItems = JSON.parse(localStorage.getItem(key)) || {};
let maxId = Object.values(todoItems).length !== 0 ? Math.max(...Object.keys(todoItems).map(id => parseInt(id))) + 1 : 0

Object.entries(todoItems).forEach(([todoId, todoItem]) => {
 addTodo(todoItem, todoId)
})



// let li = createTodoItem(li).currentTarget.parentNode;

// const key = 'to-do-items';
// let li = document.getElementById("li");
// // li.textContent = 'hi';
// const value = li.textContent;
//
// localStorage.setItem(key, value);

// const coco = localStorage.getItem(key)

// const li = document.createElement('li')
// li.textContent = `Hi! I am ${coco}`
// document.body.appendChild(li)