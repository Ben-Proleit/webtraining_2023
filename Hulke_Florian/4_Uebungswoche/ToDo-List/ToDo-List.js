//#region classes

class Todo {
  /**
   * Creates a Todo
   * @param {string} description - Free text description of the todo
   * @param {boolean} isDone - Represents if the todo is active or done
   */
  constructor(description, isDone) {
    this.description = description;
    this.isDone = isDone;
  }

  invertStatus = () => {
    this.isDone = !this.isDone;
    saveTodos();
  };
}

//#endregion classes

//#region functions

function saveTodos() {
  const todosJson = JSON.stringify(todos);
  localStorage.setItem("todos", todosJson);
}

function loadTodos() {
  JSON.parse(localStorage.getItem("todos"))?.forEach((todo) => {
    todos.push(Object.assign(new Todo(), todo));
  });

  todoTableBody.replaceChildren();

  for (let todo of todos) {
    todoTableBody.appendChild(createTableRow(todo));
  }
}

function addTodo() {
  document.forms["todoForm"]["description"].value = "";
  todoDialog.showModal();
}

function editTodo() {
  document.forms["todoForm"]["description"].value = selectedTodo.description;
  todoDialog.showModal();
}

function deleteTodo() {
  todos.splice(todos.indexOf(selectedTodo), 1);
  todoTableBody.removeChild(selectedRow);
  saveTodos();

  selectedTodo = null;
  selectedRow = null;
}

/**
 *
 * @param {SubmitEvent} e
 */
function saveTodo(e) {
  e.preventDefault();

  const descriptionInput = todoForm.elements.namedItem("description");
  const value = descriptionInput.value;

  // Todo: better handling
  if (isEmptyOrSpaces(value)) {
    descriptionInput.setCustomValidity("Description can't be empty");
    descriptionInput.reportValidity();
    return;
  }

  if (selectedTodo == null && selectedRow == null) {
    const todo = new Todo(value, false);
    const row = createTableRow(todo);

    todoTableBody.appendChild(row);
    todos.push(todo);
  } else {
    const todo = selectedTodo;
    todo.description = value;
    const row = createTableRow(todo);

    todoTableBody.replaceChild(row, selectedRow);
    todos[todos.indexOf(selectedRow)] = todo;
  }

  saveTodos();
  todoDialog.close();
}

function discardTodo() {
  todoDialog.close();
}

/**
 * Creates a table row element for the given todo
 * @param {Todo} todo - the Todo to add to the table
 * @returns {HTMLTableRowElement}
 */
function createTableRow(todo) {
  const row = document.createElement("tr");
  const tdIsDone = document.createElement("td");
  const tdDescription = document.createElement("td");
  const isDoneCheckbox = document.createElement("input");
  const checkboxWrapper = document.createElement("div");

  isDoneCheckbox.setAttribute("type", "checkbox");
  isDoneCheckbox.checked = todo.isDone;
  checkboxWrapper.classList.add("checkbox-wrapper");
  tdIsDone.classList.add("checkbox-column");
  tdDescription.textContent = todo.description;

  row.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();

      if (todoContextMenu.style.display == "block") {
        hideMenu(true);
      }

      row.classList.add("tr-highlighted");

      todoContextMenu.style.display = "block";
      todoContextMenu.style.left = e.pageX + "px";
      todoContextMenu.style.top = e.pageY + "px";

      selectedTodo = todo;
      selectedRow = row;
    },
    false
  );
  isDoneCheckbox.addEventListener("click", todo.invertStatus, false);

  checkboxWrapper.appendChild(isDoneCheckbox);
  tdIsDone.appendChild(checkboxWrapper);
  row.appendChild(tdIsDone);
  row.appendChild(tdDescription);
  return row;
}

function hideMenu(deleteSelected = true) {
  todoContextMenu.style.display = "none";
  Array.from(todoTable.getElementsByClassName("tr-highlighted")).forEach((tr) =>
    tr.classList.remove("tr-highlighted")
  );

  if (deleteSelected) {
    selectedTodo = null;
    selectedRow = null;
  }
}

/**
 * Returns if a string is null, empty or only whitespace
 * @param {String} str string to validate
 * @returns {Boolean}
 */
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

//#endregion functions

//#region HTML Elements

/**
 * @type {HTMLTableElement}
 */
const todoTable = document.getElementById("todoTable");

/**
 * @type {HTMLTableSectionElement}
 */
const todoTableBody = document.getElementById("todoTableBody");

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
const todoButtonSave = document.getElementById("todoButtonSave");

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
      hideMenu(!todoContextMenu.contains(e.target));
    }
  },
  false
);

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key == "Escape" && todoContextMenu.style.display == "block") {
      hideMenu(true);
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
      hideMenu(true);
    }
  },
  false
);

//#endregion Document Event Listener

//#region element event listener

todoButtonAdd.addEventListener("click", addTodo, false);
todoButtonEdit.addEventListener("click", editTodo, false);
todoButtonDelete.addEventListener("click", deleteTodo, false);
todoButtonDiscard.addEventListener("click", discardTodo, false);
todoForm.addEventListener("submit", saveTodo, false);
todoDialog.addEventListener("close", discardTodo, false);

//#endregion element event listener

/**
 * @type {Todo[]}
 */
let todos = [];

/**
 * @type {Todo}
 */
let selectedTodo = null;

/**
 * @type {HTMLTableRowElement}
 */
let selectedRow = null;

loadTodos();
