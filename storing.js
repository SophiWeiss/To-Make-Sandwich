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
      if (span.style.textDecoration === "line-through") {
        span.style.textDecoration = "none";
        createDeleteButton.style.borderRadius = "0 5px 5px 0";
      } else {
        span.style.textDecoration = "line-through";
        createEditButton.remove()
        createDeleteButton.style.borderRadius = "5px";
      }
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
}

function editTodo(event) {
  let li = event.currentTarget.parentNode;
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
    let span = li.getElementsByTagName("span");
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
    let span = li.firstChild;
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
}

function deleteTodo(event) {
  let li = event.currentTarget.parentNode;
  let ul = document.getElementById("ulOfTasks");
  ul.removeChild(li);
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