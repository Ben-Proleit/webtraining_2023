class task {
  constructor(id, completionState, taskText) {
    this.id = id;
    this.completionState = completionState;
    this.taskText = taskText;
  }
}

let tasks = [];

const styles = ['style', 'style_dark' ];
const styleDirectory = './stylisch/';
const styleEnding = '.css';
let currentStyle = localStorage.getItem('currentStyle');

removeCss()
var style = styleDirectory + styles[currentStyle % styles.length] + styleEnding;
addCss(style);

const listItemIdHead = "listItem_";
const taskList = document.getElementsByClassName("taskList")[0];

document.addEventListener('DOMContentLoaded', () => {
  load();
  addEmptyItemIfNeeded();
});

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
  listItemText.classList.add('listItemText')
  listItemText.value = task.taskText;
  listItemText.placeholder = "enter task here";
  listItemText.setAttribute("onkeyup", "inputTextOnKeyUp(event, this)");
  listItemText.setAttribute("onblur", "inputTextOnBlur(this)");
  
  listItemBtnDelete = document.createElement("button");
  listItemBtnDelete.classList.add("btnDelete");
  listItemBtnDelete.setAttribute("onclick", "btnDeleteClick(this)");
    
  if(task.completionState == true){
    listItemText.setAttribute('disabled', 'disabled')
    listItemDiv.setAttribute('completed', 'completed')
  }
  listItemDiv.appendChild(listItemCheckbox);
  listItemDiv.appendChild(listItemText);
  listItemDiv.appendChild(listItemBtnDelete);

  // console.log(task);
  // console.log(listItemDiv);
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
    taskDiv.setAttribute("completed", "completed")
  } else {
    textField.removeAttribute("disabled");
    taskDiv.removeAttribute("completed")
  }
  store();
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

  store();
}

function inputTextOnBlur(inputTxt){
  textInput(inputTxt);
}

function inputTextOnKeyUp(event, inputTxt){
  if(event.key == "Enter")
    textInput(inputTxt);
}

function textInput(inputTxt) {
  parentId = inputTxt.parentElement.id;
  parentId = parentId.replace(listItemIdHead, "");

  const taskEdt = tasks.find((task) => task.id == parentId);
  taskEdt.taskText = inputTxt.value;
  store();
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


function store(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
function load(){
  tasks = JSON.parse(localStorage.getItem('tasks'))
  console.log(tasks)

  taskList.innerHTML = ''

  tasks.forEach((task) => {
    taskList.appendChild(createListItemFromTask(task))
  })

}

function toggleTheme(){
  currentStyle++;
  var styleIdx = currentStyle % styles.length;
  var style = styleDirectory + styles[styleIdx] + styleEnding;
  console.log(style)
  console.log(styleIdx)

  removeCss();
  addCss(style);
  localStorage.setItem('currentStyle', currentStyle % styles.length)
}

function removeCss(){
  let head = document.head;
  var linkElements = Array.from(head.getElementsByTagName('link'));
                          // .find(element => element.type == 'text/css');
  console.debug(linkElements);

  linkElements.forEach(element =>{
    if(element.type == 'text/css')
      head.removeChild(element);
  }) 
}

function addCss(fileName) {
  let head = document.head;
  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;
  head.appendChild(link);
}