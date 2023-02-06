// Load to-do items from local storage
const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.text}
      <small>${todo.currentTimeSpan}</small>
      <button id="editButton" >Edit</button>
      <button id="deleteButton" >Delete</button>
    `;
    todoList.appendChild(li);
  });
};

// Save to-do items to local storage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();