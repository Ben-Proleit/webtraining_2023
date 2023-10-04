//#region classes

class Todo {
  /**
   * Creates a Todo
   * @param {string} description Free text description of the todo
   * @param {boolean} isDone Represents if the todo is active or done
   */
  constructor(description, isDone) {
    this.description = description ?? "";
    this.isDone = isDone ?? false;
  }
}

class Options {
  /**
   * Creates an Option
   * @param {boolean} canEditDoneTodos
   * @param {boolean} autoDeleteDoneTodos
   */
  constructor(canEditDoneTodos, autoDeleteDoneTodos) {
    this.canEditDoneTodos = canEditDoneTodos ?? false;
    this.autoDeleteDoneTodos = autoDeleteDoneTodos ?? false;
  }
}

//#endregion classes

//#region functions

//#region options

function showOptionsDialog() {
  optionsForm["canEdit"].checked = options.canEditDoneTodos;
  optionsForm["autoDelete"].checked = options.autoDeleteDoneTodos;
  optionsDialog.showModal();
}

function applyOptionsDialog(e) {
  e.preventDefault();

  const canEdit = optionsForm["canEdit"].checked;
  const autoDelete = optionsForm["autoDelete"].checked;

  saveAndApplyOptions(canEdit, autoDelete);

  closeOptionsDialog();
}

function closeOptionsDialog() {
  optionsDialog.close();
}

function saveAndApplyOptions(canEdit, autoDelete) {
  options.canEditDoneTodos = canEdit;
  options.autoDeleteDoneTodos = autoDelete;

  localStorage.setItem("options", JSON.stringify(options));

  if (autoDelete) {
    doneTodos = [];

    doneTodoTableBody.replaceChildren();

    saveTodos();
  }
  toggleTodoSectionsVisibility();
}

function loadOptions() {
  options = Object.assign(
    new Options(),
    JSON.parse(localStorage.getItem("options"))
  );
}

//#endregion Options

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));

  if (options.autoDeleteDoneTodos) {
    localStorage.removeItem("doneTodos");
  } else {
    localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
  }
}

function loadTodos() {
  // not done todos
  JSON.parse(localStorage.getItem("todos"))?.forEach((item) => {
    const todo = Object.assign(new Todo(), item);
    todos.push(todo);
  });

  todosTableBody.replaceChildren();

  for (let todo of todos) {
    todosTableBody.append(createTodoTableRow(todo));
  }

  // done todos
  if (!options.autoDeleteDoneTodos) {
    JSON.parse(localStorage.getItem("doneTodos"))?.forEach((item) => {
      const todo = Object.assign(new Todo(), item);
      doneTodos.push(todo);
    });

    doneTodoTableBody.replaceChildren();

    for (let todo of doneTodos) {
      doneTodoTableBody.append(createTodoTableRow(todo));
    }
  }
}

function addTodo() {
  todoForm["description"].value = "";
  todoDialog.showModal();
}

function editTodo() {
  todoForm["description"].value = selectedTodo.description;
  todoDialog.showModal();
}

function deleteTodo() {
  if (selectedTodo.isDone) {
    doneTodos.splice(doneTodos.indexOf(selectedTodo), 1);
    doneTodoTableBody.removeChild(selectedRow);
  } else {
    todos.splice(todos.indexOf(selectedTodo), 1);
    todosTableBody.removeChild(selectedRow);
  }

  saveTodos();
  closeTodoDialog();
  toggleTodoSectionsVisibility();
}

/**
 *
 * @param {SubmitEvent} e
 */
function saveTodoDialog(e) {
  e.preventDefault();

  const descriptionInput = todoForm["description"];
  const value = descriptionInput.value.trim();

  // Make shure string is not empty
  if (isEmptyOrSpaces(value)) {
    descriptionInput.setCustomValidity("Description can't be empty");
    descriptionInput.reportValidity();
    return;
  }

  if (selectedTodo == null && selectedRow == null) {
    const todo = new Todo(value, false);
    const row = createTodoTableRow(todo);

    todosTableBody.prepend(row);
    todos.unshift(todo);
  } else {
    const todo = selectedTodo;
    todo.description = value;
    const row = createTodoTableRow(todo);

    if (!todo.isDone) {
      todosTableBody.replaceChild(row, selectedRow);
      todos[todos.indexOf(selectedRow)] = todo;
    } else if (!options.autoDeleteDoneTodos) {
      doneTodoTableBody.replaceChild(row, selectedRow);
      doneTodos[doneTodos.indexOf(selectedRow)] = todo;
    }
  }

  saveTodos();
  closeTodoDialog();
  toggleTodoSectionsVisibility();
}

function closeTodoDialog() {
  selectedTodo = null;
  selectedRow = null;

  todoDialog.close();
}

/**
 * Creates a table row element for the given todo
 * @param {Todo} todo - the Todo to add to the table
 * @returns {HTMLTableRowElement}
 */
function createTodoTableRow(todo) {
  const row = document.createElement("tr");
  const tdIsDone = document.createElement("td");
  const tdDescription = document.createElement("td");
  const button = document.createElement("button");
  const i = document.createElement("i");

  i.classList.add(todo.isDone ? "gg-close-o" : "gg-check-o");
  button.classList.add("icon-btn");
  tdIsDone.classList.add("btn-column");
  tdDescription.textContent = todo.description;

  row.addEventListener(
    "contextmenu",
    (e) => openContextMenu(todo, row, e),
    false
  );
  button.addEventListener("click", () => changeTodoState(todo, row), false);

  button.append(i);
  tdIsDone.append(button);
  row.append(tdIsDone);
  row.append(tdDescription);
  return row;
}

// #region ContextMenu

/**
 *
 * @param {Todo} todo
 * @param {HTMLTableRowElement} row
 * @param {MouseEvent} e
 */
function openContextMenu(todo, row, e) {
  e.preventDefault();

  if (todoContextMenu.style.display == "block") {
    hideContextMenu(true);
  }

  const editButtonHidden = todo.isDone && !options.canEditDoneTodos;
  todoButtonEdit.style.display = editButtonHidden ? "none" : "inherit";

  row.classList.add("tr-highlighted");

  todoContextMenu.style.display = "block";
  todoContextMenu.style.left = e.pageX + "px";
  todoContextMenu.style.top = e.pageY + "px";

  selectedTodo = todo;
  selectedRow = row;
}

function hideContextMenu(deleteSelected = true) {
  todoContextMenu.style.display = "none";
  Array.from(todosTable.getElementsByClassName("tr-highlighted")).forEach(
    (tr) => tr.classList.remove("tr-highlighted")
  );
  Array.from(doneTodoTable.getElementsByClassName("tr-highlighted")).forEach(
    (tr) => tr.classList.remove("tr-highlighted")
  );

  if (deleteSelected) {
    selectedTodo = null;
    selectedRow = null;
  }
}

// #endregion ContextMenu

/**
 *
 * @param {Todo} todo
 * @param {HTMLTableRowElement} row
 */
function changeTodoState(todo, row) {
  if (todo.isDone) {
    doneTodos.splice(doneTodos.indexOf(todo), 1);
    doneTodoTableBody.removeChild(row);

    todo.isDone = false;

    todos.unshift(todo);
    todosTableBody.prepend(createTodoTableRow(todo));
  } else {
    todos.splice(todos.indexOf(todo), 1);
    todosTableBody.removeChild(row);

    todo.isDone = true;

    if (!options.autoDeleteDoneTodos) {
      doneTodos.unshift(todo);
      doneTodoTableBody.prepend(createTodoTableRow(todo));
    }
  }

  saveTodos();
  toggleTodoSectionsVisibility();
}

/**
 * Returns if a string is null, empty or only whitespace
 * @param {String} str string to validate
 * @returns {Boolean}
 */
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function toggleTodoSectionsVisibility() {
  const doneHidden = options.autoDeleteDoneTodos || doneTodos.length === 0;
  doneTodosSection.style.display = doneHidden ? "none" : "inherit";

  const todosHidden = todos.length === 0;
  todosSection.style.display = todosHidden ? "none" : "inherit";

  const noTodosHidden = !(todos.length === 0 && doneTodos.length === 0);
  noTodosSection.style.display = noTodosHidden ? "none" : "inherit";
}

//#endregion functions

//#region HTML Elements

/**
 * @type {HTMLButtonElement}
 */
const optionsButton = document.getElementById("optionsButton");

/**
 * @type {HTMLDialogElement}
 */
const optionsDialog = document.getElementById("optionsDialog");

/**
 * @type {HTMLFormElement}
 */
const optionsForm = document.getElementById("optionsForm");

/**
 * @type {HTMLButtonElement}
 */
const optionsButtonDiscard = document.getElementById("optionsButtonDiscard");

/**
 * @type {HTMLDivElement}
 */
const todosSection = document.getElementById("todosSection");

/**
 * @type {HTMLTableElement}
 */
const todosTable = document.getElementById("todosTable");

/**
 * @type {HTMLTableSectionElement}
 */
const todosTableBody = document.getElementById("todosTableBody");

/**
 * @type {HTMLDivElement}
 */
const doneTodosSection = document.getElementById("doneTodosSection");

/**
 * @type {HTMLTableElement}
 */
const doneTodoTable = document.getElementById("doneTodoTable");

/**
 * @type {HTMLTableSectionElement}
 */
const doneTodoTableBody = document.getElementById("doneTodoTableBody");

/**
 * @type {HTMLHeadingElement}
 */
const noTodosSection = document.getElementById("noTodosSection");

/**
 * @type {HTMLDialogElement}
 */
const todoDialog = document.getElementById("todoDialog");

/**
 * @type {HTMLDivElement}
 */
const todoContextMenu = document.getElementById("todoContextMenu");

/**
 * @type {HTMLButtonElement}
 */
const todoButtonAdd = document.getElementById("todoButtonAdd");

/**
 * @type {HTMLButtonElement}
 */
const todoButtonEdit = document.getElementById("todoButtonEdit");

/**
 * @type {HTMLButtonElement}
 */
const todoButtonDelete = document.getElementById("todoButtonDelete");

/**
 * @type {HTMLButtonElement}
 */
const todoButtonDiscard = document.getElementById("todoButtonDiscard");

/**
 * @type {HTMLFormElement}
 */
const todoForm = document.forms.namedItem("todoForm");

//#endregion HTML Elements

//#region Document Event Listener

document.addEventListener(
  "click",
  (e) => {
    if (todoContextMenu.style.display == "block") {
      hideContextMenu(!todoContextMenu.contains(e.target));
    }
  },
  false
);

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key == "Escape" && todoContextMenu.style.display == "block") {
      hideContextMenu(true);
    }
  },
  false
);

document.addEventListener(
  "contextmenu",
  (e) => {
    if (e.defaultPrevented) {
      return;
    }
    if (todoContextMenu.contains(e.target)) {
      e.preventDefault();
      return;
    }
    if (todoContextMenu.style.display == "block") {
      hideContextMenu(true);
    }
  },
  false
);

//#endregion Document Event Listener

//#region Element Event Listener

optionsButton.addEventListener("click", showOptionsDialog, false);
optionsForm.addEventListener("submit", applyOptionsDialog, false);
optionsButtonDiscard.addEventListener("click", closeOptionsDialog, false);
todoButtonAdd.addEventListener("click", addTodo, false);
todoButtonEdit.addEventListener("click", editTodo, false);
todoButtonDelete.addEventListener("click", deleteTodo, false);
todoButtonDiscard.addEventListener("click", closeTodoDialog, false);
todoForm.addEventListener("submit", saveTodoDialog, false);
todoDialog.addEventListener("close", closeTodoDialog, false);

//#endregion Element Event Listener

/**
 * @type {Options}
 */
let options;

/**
 * @type {Todo[]}
 */
let todos = [];

/**
 * @type {Todo[]}
 */
let doneTodos = [];

/**
 * @type {Todo}
 */
let selectedTodo = null;

/**
 * @type {HTMLTableRowElement}
 */
let selectedRow = null;

loadOptions();
loadTodos();
toggleTodoSectionsVisibility();
