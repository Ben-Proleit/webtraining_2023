import { toDoGroups, ToDoItem, ToDoGroup, AddNewToDo, RemoveGroup} from "./globals.js";
import { LoadToDoGroups } from "./AddDialog/adddialog.js";

var selectedToDo = null;
var selectedGroup = null;

function selectToDo(id, group){
  selectedGroup = toDoGroups.find((toDoGroup) => {return toDoGroup.name == group});
  selectedToDo = selectedGroup.getToDo(id);
}

function DisplayToDoItem(toDoItem, group) {
  var xhr=new XMLHttpRequest();
  xhr.open('GET', 'ToDoItem/ToDoItem.html', true);
  xhr.onreadystatechange = () => {
    if(xhr.readyState != 4) return;
    if(xhr.status != 200) return;

    let text =xhr.responseText.replaceAll('{id}', toDoItem.id);
    text = text.replace('{name}', toDoItem.name);
    text = text.replace('{details}', toDoItem.details);
    text = text.replace('{date}', toDoItem.date);

    let elem = document.createElement('div');
    elem.innerHTML = text;
    elem.addEventListener('click',() => {selectToDo(toDoItem.id, group)});

    document.getElementById(group).children.item(0).appendChild(elem);

  };
  xhr.send();
}

function DisplayToDoLists() {
  let main = document.getElementsByTagName('main').item(0);
  main.innerHTML = '';
  for(let toDoGroup of toDoGroups){
    setTimeout(() => {
    var xhr=new XMLHttpRequest();
    xhr.open('GET', 'ToDoItem/ToDoGroup.html', true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState != 4) return;
      if(xhr.status != 200) return;
  
      let text =xhr.responseText.replaceAll('{group}', toDoGroup.name);
      text = text.replaceAll('{name}', toDoGroup.name);
  
  
      document.getElementsByTagName('main').item(0).innerHTML += text;
      toDoGroup.toDos.forEach((todo) => {
        DisplayToDoItem(todo, toDoGroup.name);
      });
    };
    xhr.send();
    }, 100)
  }
}

function AddSave() {
  let name      = document.getElementById('addname').value;
  let details   = document.getElementById('adddetails').value;
  let date      = document.getElementById('adddate').value;
  let groupName = document.getElementById('addgroup').value;

  document.getElementById('addname').value = '';
  document.getElementById('adddetails').value = '';
  document.getElementById('adddate').value = '';
  document.getElementById('addgroup').value = '';

  if(groupName == ''){
    alert('please enter a group');
    return;
  }

  AddNewToDo(name, details, date, groupName);
  let dialog = document.getElementById('edit')
  dialog.classList.remove('show');
  dialog.classList.add('hide');

  DisplayToDoLists()
}

function AddCancel() {
  document.getElementById('addname').value = '';
  document.getElementById('adddetails').value = '';
  document.getElementById('adddate').value = '';
  document.getElementById('addgroup').value = '';

  let dialog = document.getElementById('edit');
  dialog.classList.remove('show');
  dialog.classList.add('hide');

}

function DeleteOk() {
  if(selectedGroup != null && selectedToDo != null) {
    selectedGroup.toDos = selectedGroup.toDos.filter( (todo) => { return todo.id != selectedToDo.id });

    if(selectedGroup.toDos.length == 0) {
      RemoveGroup(selectedGroup.name);
    }

    DisplayToDoLists();
  }

  let dialog = document.getElementById('delete');
  dialog.classList.remove('show');
  dialog.classList.add('hide');
}

function DeleteCancel() {
  let dialog = document.getElementById('delete');
  dialog.classList.remove('show');
  dialog.classList.add('hide');
}

function OpenAddDialog() {
  let dialog = document.getElementById('edit');
  LoadToDoGroups();
  dialog.classList.remove('hide');
  dialog.classList.add('show');
}

function OpenDeleteDialog() {
  if(selectedToDo != null) {
    let dialog = document.getElementById('delete');
    dialog.classList.remove('hide');
    dialog.classList.add('show');
  }
}

function InitializeButtonFunctions() {
  document.getElementById('headeradd').onclick = OpenAddDialog;
  document.getElementById('headerdelete').onclick = OpenDeleteDialog;
  document.getElementById('editsavebutton').onclick = AddSave;
  document.getElementById('editcancelbutton').onclick = AddCancel;
  document.getElementById('deleteokbutton').onclick = DeleteOk;
  document.getElementById('deletecancelbutton').onclick = DeleteCancel;
}

InitializeButtonFunctions();
DisplayToDoLists();

