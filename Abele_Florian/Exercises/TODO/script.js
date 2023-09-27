class task {
  constructor(id, completionState, taskText) {
    this.id = id;
    this.completionState = completionState;
    this.taskText = taskText;
  }
}

let tasks = [];
const listItemIdHead = "listItem_";
const taskList = document.getElementsByClassName("taskList")[0];

taskList.appendChild(createListItemFromTask(new task(0, false, "do some styling")));

addEmptyItemIfNeeded();

function createListItemFromTask(task) {
  listItemDiv = document.createElement("div");
  listItemDiv.classList.add("listItem");
  listItemDiv.id = listItemIdHead + task.id;

  listItemCheckbox = document.createElement("input");
  listItemCheckbox.type = "checkbox";
  listItemCheckbox.checked = task.completionState;
  listItemCheckbox.setAttribute("onclick", "checkboxClick(this)");

  listItemText = document.createElement("input");
  listItemText.type = "text";
  listItemText.value = task.taskText;
  listItemText.placeholder = "enter task here";
  listItemText.setAttribute("onkeyup", "textInput(event, this)");

  listItemBtnDelete = document.createElement("button");
  listItemBtnDelete.classList.add("btnDelete");
  listItemBtnDelete.setAttribute("onclick", "btnDeleteClick(this)");

  listItemDiv.appendChild(listItemCheckbox);
  listItemDiv.appendChild(listItemText);
  listItemDiv.appendChild(listItemBtnDelete);

  console.log(task);
  console.log(listItemDiv);
  return listItemDiv;
}

function checkboxClick(checkbox) {
  console.log(checkbox);
  const taskDiv = checkbox.parentElement;
  var textField = Array.from(taskDiv.getElementsByTagName("input")).find((element) => element.type == "text");

  if(textField.value == null || textField.value == ''){
    checkbox.checked = false;
    return;
  }

  const parentId = taskDiv.id.replace(listItemIdHead, "");
  const taskIndex = tasks.findIndex((task) => task.id == parentId);

  var task = tasks[taskIndex];
  task.completionState = !task.completionState;

  if (task.completionState == true) {
    textField.setAttribute("disabled", "disabled");
  } else {
    textField.removeAttribute("disabled");
  }

}

function btnDeleteClick(btn) {
  const taskDiv = btn.parentElement;

  var elementContent = Array.from(taskDiv.getElementsByTagName("input")).find((element) => element.type == "text").value;
  if (elementContent == null || elementContent == "") return;

  const parentId = taskDiv.id.replace(listItemIdHead, "");
  const taskId = tasks.findIndex((task) => task.id == parentId);
  tasks.splice(taskId, 1);

  const taskList = document.getElementsByClassName("taskList")[0];
  taskList.removeChild(taskDiv);
}

function textInput(event, inputTxt) {
  if (event.key != "Enter") {
    return;
  }

  parentId = inputTxt.parentElement.id;
  parentId = parentId.replace(listItemIdHead, "");

  const taskEdt = tasks.find((task) => task.id == parentId);
  taskEdt.taskText = inputTxt.value;

  addEmptyItemIfNeeded();
}

function addEmptyItemIfNeeded() {
  const firstEmpty = tasks.find((task) => task.taskText == "");

  // no need to create new Empty Element -> already exists
  if (firstEmpty != null) return;

  const taskList = document.getElementsByClassName("taskList")[0];
  var newTask = new task(maxTaskId() + 1, false, "");
  tasks.push(newTask);
  var listItem = createListItemFromTask(newTask);
  taskList.appendChild(listItem);
  
  document.querySelector('#' + listItem.id + ' input[type=text]').focus();
}

function maxTaskId() {
  var maxId = -1;
  tasks.forEach((task) => (maxId = maxId > task.id ? maxId : task.id));
  return maxId;
}
