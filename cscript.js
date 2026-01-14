let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editId = null;

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  if (editId) {
    tasks = tasks.map(task =>
      task.id === editId ? { ...task, text: inputBox.value } : task
    );
    editId = null;
    addBtn.innerText = "Add";
  } else {
    tasks.push({
      id: Date.now(),
      text: inputBox.value,
      completed: false
    });
  }

  inputBox.value = "";
  saveTasks();
  renderTasks(tasks);
}

function renderTasks(taskList) {
  listContainer.innerHTML = "";

  taskList.forEach(task => {
    const li = document.createElement("li");
    li.innerText = task.text;

    if (task.completed) li.classList.add("checked");

    const editBtn = document.createElement("span");
    editBtn.innerText = "✏️";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      editTask(task.id);
    };

    const delBtn = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);

    li.onclick = () => toggleTask(task.id);

    listContainer.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks(tasks);
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks(tasks);
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  inputBox.value = task.text;
  editId = id;
  addBtn.innerText = "Update";
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks(tasks);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks(tasks);
