function checkInput () {

  let inputValue = document.getElementById("textInput").value;

  if (inputValue.trim().length === 0) {
    alert("(👉ﾟヮﾟ)👉 Please enter at least something")

  }

  else {

    let ul = document.getElementById("ulOfTasks");
    let li = document.createElement("li");

    //current time
    let currentTime = new Date().toLocaleString();
    let currentTimeSpan = document.createElement("span");
    currentTimeSpan.style.fontSize = "11px";
    currentTimeSpan.style.color = "grey";
    currentTimeSpan.appendChild(document.createTextNode(" (" + currentTime + ")"));

    const span = document.createElement('span')
    span.textContent = inputValue
    li.appendChild(span);
    li.appendChild(currentTimeSpan);


    //edit button
    let editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));

    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));

    deleteButton.addEventListener("click", function() {
      ul.removeChild(li);
    });

    //done function
    li.addEventListener("click", function() {
      if (li.firstElementChild.tagName !== 'INPUT') {
        if (span.style.textDecoration === "line-through") {
          span.style.textDecoration = "none";
          li.appendChild(editButton);
          deleteButton.style.borderRadius = "0 5px 5px 0";
        } else {
          span.style.textDecoration = "line-through";
          editButton.remove()
          deleteButton.style.borderRadius = "5px";
        }
      }
    });

    editButton.addEventListener("click", function() {
      let originalText = li.firstChild.firstChild.nodeValue;
      let input = document.createElement("input");
      input.value = originalText;
      li.replaceChild(input, li.firstChild);
      editButton.remove()
      deleteButton.remove()
      currentTimeSpan.remove()

      let cancelButton = document.createElement("button");
      cancelButton.appendChild(document.createTextNode("Cancel"));
      cancelButton.addEventListener("click", function() {
        li.replaceChild(span, input)
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.appendChild(currentTimeSpan)
        saveButton.remove()
        cancelButton.remove()
        li.click()
        li.click()
        li.click()
      });
      li.appendChild(cancelButton);

      //style settings for cancelButton
      cancelButton.className = 'cancelButton'

      let saveButton = document.createElement("button");
      saveButton.appendChild(document.createTextNode("Save"));
      saveButton.addEventListener("click", function() {
        span.textContent = input.value
        li.removeChild(input);
        li.insertBefore(span, li.firstChild);
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.appendChild(currentTimeSpan)

        saveButton.remove()
        cancelButton.remove()
        li.click()
        li.click()
        li.click()
      });
      li.appendChild(saveButton);

      //style settings for saveButton
      saveButton.className = 'saveButton'
    });

    //appending two main buttons
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    ul.appendChild(li);

    document.getElementById("textInput").value = "";

    //style settings for buttons
    editButton.className = 'editButton';
    deleteButton.className = 'deleteButton';

    const todoList = document.querySelector("#ulOfTasks");
  }

}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});

//
//   const taskInput = document.getElementById("textInput");
//   const addTaskButton = document.getElementById("button-push");
//   const tasksList = document.getElementById("ulOfTasks");
//
//   // Check if there are any tasks stored in local storage
//   if (localStorage.getItem("tasks")) {
//   // If there are, retrieve the tasks and display them
//   let tasks = JSON.parse(localStorage.getItem("tasks"));
//   tasks.forEach(function (task) {
//   let taskItem = document.createElement("li");
//   taskItem.innerHTML = task;
//   tasksList.appendChild(taskItem);
// });
// }
//
//   // Add a task to the list and store it in local storage
//   addTaskButton.addEventListener("click", function () {
//   let task = taskInput.value;
//   if (task) {
//   let taskItem = document.createElement("li");
//   taskItem.innerHTML = task;
//   tasksList.appendChild(taskItem);
//
//   let tasks = [];
//   if (localStorage.getItem("tasks")) {
//   tasks = JSON.parse(localStorage.getItem("tasks"));
// }
//   tasks.push(task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//
//   taskInput.value = "";
// }
// });


// // Save the tasks to local storage
// function saveTasksToLocalStorage() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }
//
// // Load the tasks from local storage
// function loadTasksFromLocalStorage() {
//   const storedTasks = localStorage.getItem("tasks");
//   if (storedTasks) {
//     tasks = JSON.parse(storedTasks);
//   }
// }
//
// // Call loadTasksFromLocalStorage when the page loads
// window.addEventListener("load", loadTasksFromLocalStorage);
//
// // Call saveTasksToLocalStorage when the page unloads (e.g. when the user closes the tab)
// window.addEventListener("beforeunload", saveTasksToLocalStorage);


// let tasks = [];
//
// function addTask() {
//   let task = document.getElementById("textInput").value;
//   tasks.push(task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   displayTasks();
// }
//
// window.onload = function() {
//   tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   displayTasks();
// };

// // Get the task input field
// let taskInput = document.getElementById("textInput");

// // Check if the tasks are stored in local storage
// if (localStorage.getItem("tasks")) {
//   tasks = JSON.parse(localStorage.getItem("tasks"));
// } else {
//   tasks = [];
// }
//
// // Add a new task to the list
// function addTask() {
//   let task = taskInput.value;
//   tasks.push(task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   taskInput.value = "";
//   displayTasks();
// }
//
// // Display the tasks
// function displayTasks() {
//   let taskList = document.getElementById("taskList");
//   taskList.innerHTML = "";
//   for (let i = 0; i < tasks.length; i++) {
//     let task = tasks[i];
//     let li = document.createElement("li");
//     li.innerHTML = task;
//     taskList.appendChild(li);
//   }
// }
//
// // Call the displayTasks function when the page loads
// window.onload = function() {
//   displayTasks();
// };


