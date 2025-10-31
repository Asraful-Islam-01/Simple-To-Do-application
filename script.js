// Line-by-line explanation added next to each original line for clarity.

// Grab the input element where the user types a new task
const input = document.getElementById("task-input");
// -> document.getElementById looks up an element in the page by its id attribute.
//    We store that element in the variable `input` so we can read its value and set focus later.

// Grab the button that the user clicks to add a task
const addBtn = document.getElementById("add-task");
// -> `addBtn` now references the DOM element with id="add-task" (usually a <button>).

// Grab the <ul> or <ol> element that will hold the list of tasks
const taskList = document.getElementById("task-list");
// -> `taskList` will be the container where we append <li> items for each task.

// When the add button is clicked, call the addTask function
addBtn.addEventListener("click", addTask);
// -> addEventListener registers an event handler. When the user clicks the button,
//    the function `addTask` will run.

// allow pressing Enter to add
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
// -> We listen for the keyboard event "keydown" on the input element.
//    The event object is passed in as `e`.
//    If the key pressed is exactly the string "Enter", we call addTask().
//    This lets users press Enter instead of clicking the button.

function addTask() {
  // Read the value the user typed and trim whitespace from both ends
  const taskText = input.value.trim();
  // -> input.value is the raw text inside the input field.
  //    .trim() removes leading/trailing spaces so "  buy milk  " becomes "buy milk".

  // If the string is empty after trimming, stop here (don't add an empty task)
  if (!taskText) return; // same guard clause
  // -> This `if` uses the fact that an empty string is falsy in JavaScript.
  //    If taskText is "", the function returns immediately; nothing else runs.

  // Create a new list item element <li>
  const li = document.createElement("li");
  // -> document.createElement makes a new DOM element we can customize and append.

  // Create a <span> to hold the task text (so the text and delete button are separate)
  const span = document.createElement("span");
  span.textContent = taskText; // safe — no HTML injected
  // -> textContent sets the text inside the span. It treats the value as plain text,
  //    so if the user types HTML tags they won't be interpreted (prevents injection).

  // Create a delete button
  const del = document.createElement("button");
  del.type = "button"; // accessible: avoid implicit form submit
  del.className = "delete-btn";
  del.textContent = "❌";
  // -> We set del.type to "button" so clicking it doesn't submit a surrounding form.
  //    className allows styling via CSS. textContent puts the cross emoji inside the button.

  // Add the span and the delete button into the list item
  li.appendChild(span);
  li.appendChild(del);
  // -> appendChild attaches child elements to the li. Order matters: span first, then button.

  // toggle completed when clicking the text only
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
  // -> We add a click listener to the span (not the entire li).
  //    When clicked, it toggles the CSS class "completed" on the li.
  //    Toggling means: if the class is present, remove it; if missing, add it.
  //    CSS can use .completed to style completed tasks (strike-through, lighter color, etc.).

  // delete when clicking the button
  del.addEventListener("click", (e) => {
    e.stopPropagation(); // not strictly needed now but harmless
    li.remove();
  });
  // -> When the delete button is clicked we run this handler.
  //    e.stopPropagation() prevents the click from "bubbling" up to parent elements.
  //    Without it, clicking the delete button could also trigger other click handlers
  //    on ancestor elements (e.g., li or span). Here it is safe but conservative.
  //    li.remove() removes the list item from the DOM, effectively deleting the task.

  // Finally append the new <li> to the task list container
  taskList.appendChild(li);
  // -> This makes the new task appear on the page.

  // Clear the input box and move focus back to it so the user can type the next task
  input.value = "";
  input.focus();
  // -> input.value = "" clears the text; input.focus() puts the cursor back into the field.
}

/*
Notes and suggestions for improvement (optional):
- If you want to keep tasks between page loads, store them in localStorage and restore on load.
- For accessibility, consider adding aria-labels to the delete buttons.
- To support editing a task, replace the span with an input on double-click, then save changes.
- Use event delegation (one listener on `taskList`) if you expect many tasks to improve performance.
*/
