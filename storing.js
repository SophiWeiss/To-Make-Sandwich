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

function editTodo(li) {
  let originalText = li.firstChild.firstChild.nodeValue;
  let input = document.createElement("input");
  input.value = originalText;
  li.replaceChild(input, li.firstChild);
  let deleteButton = li.getElementsByClassName("deleteButton")[0];
  let editButton = li.getElementsByClassName("editButton")[0];
  let currentTimeSpan = li.getElementsByTagName("span")[1];
  deleteButton.remove();
  editButton.remove();
  currentTimeSpan.remove();

  // let cancelButton = document.createElement("button");
  // cancelButton.appendChild(document.createTextNode("Cancel"));
  // cancelButton.addEventListener("click", function() {
  //   li.replaceChild(span, input);
  //   li.appendChild(deleteButton);
  //   li.appendChild(editButton);
  //   li.appendChild(currentTimeSpan);
  //   saveButton.remove();
  //   cancelButton.remove();
  //   li.click();
  //   li.click();
  //   li.click();
  // });
  // li.appendChild(cancelButton);
  //
  // let saveButton = document.createElement("button");
  // saveButton.appendChild(document.createTextNode("Save"));
  // saveButton.addEventListener("click", function() {
  //   let span = li.firstChild;
  //   span.textContent = input.value;
  //   li.removeChild(input);
  //   li.insertBefore(span, li.firstChild);
  //   li.appendChild(deleteButton);
  //   li.appendChild(editButton);
  //   li.appendChild(currentTimeSpan);
  //   saveButton.remove();
  //   cancelButton.remove();
  //   li.click();
  //   li.click();
  //   li.click();
  // });
  // li.appendChild(saveButton);
}

function deleteTodo(event) {
  let li = event.currentTarget.parentNode;
  let ul = document.getElementById("ulOfTasks");
  ul.removeChild(li);
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