const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);

//allow pressing "Enter" to add a task
input.addEventListener("keydown", (e) => {
    if (e.key = "Enter") addTask();
});

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    
    const span = document.createElement("span");
    span.textContent = taskText; // safe-no HTML injected

    const del = document.createElement("button");
    del.type = "button" //accessible: avoid implicit form submit
    del.className = "delete-btn";
    del.textContent = "❌";

    //toggle completed when clicking the text only 
    span.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    //delete when clicking the button
    del.addEventListener("click", (e) => {
        e.stopPropagation(); //not strickly need now but harmless
        li.remove();
    });

    taskList.appendChild(li);
    input.value = "";
    input.focus();
}