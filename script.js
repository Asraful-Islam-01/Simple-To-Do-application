const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">❌</button>
  `;

  li.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        li.classList.toggle("completed");
    }
  });

  li.querySelector(".delete-btn").addEventListener("click", function(e) {
    e.stopPropagation();
    li.remove();
  });

  taskList.appendChild(li);
  input.value = "";
}

