const taskNameInput = document.getElementById("task-name"),
      dueDateInput = document.getElementById("due-date"),
      priorityInput = document.getElementById("priority"),
      filters = document.querySelectorAll(".filters span"),
      clearAll = document.querySelector(".clear-btn"),
      taskBox = document.querySelector(".task-box");

let editId,
    isEditedTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list")) || [];

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

function showTodo(filter) {
  let li = "";
  if (todos.length) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status === "completed" ? "checked" : "";
      if (filter === todo.status || filter === "all") {
        li += `
          <li class="task">
            <label for="${id}">
              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
            <div>
                <p class="${isCompleted}">${todo.name}</p>
                <div class="task-details">
                    Due: ${todo.due || "No date"} | Priority: ${todo.priority || "Medium"}
                </div>
            </div>

            </label>
            <div class="settings">
              <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
              <ul class="task-menu">
                <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i> Edit</li>
                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i> Delete</li>
              </ul>
            </div>
          </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName !== "I" || e.target !== selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskNameInput.value = taskName;
  dueDateInput.value = todos[taskId].due || "";
  priorityInput.value = todos[taskId].priority || "Medium";
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(document.querySelector("span.active").id);
}

clearAll.addEventListener("click", () => {
  todos = [];
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo("all");
});

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.querySelector("p");
  todos[selectedTask.id].status = selectedTask.checked ? "completed" : "pending";
  taskName.classList.toggle("checked", selectedTask.checked);
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskNameInput.addEventListener("keyup", e => {
  if (e.key === "Enter") addOrEditTask();
});

dueDateInput.addEventListener("keyup", e => {
  if (e.key === "Enter") addOrEditTask();
});

function addOrEditTask() {
  let name = taskNameInput.value.trim(),
      due = dueDateInput.value,
      priority = priorityInput.value;

  if (!name) return;

  if (!todos) todos = [];

  if (isEditedTask) {
    isEditedTask = false;
    todos[editId].name = name;
    todos[editId].due = due;
    todos[editId].priority = priority;
  } else {
    todos.push({ name, due, priority, status: "pending" });
  }

  taskNameInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "Medium";

  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(document.querySelector("span.active").id);
}
