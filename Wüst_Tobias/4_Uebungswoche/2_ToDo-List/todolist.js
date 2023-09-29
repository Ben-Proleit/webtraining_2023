import { toDoGroups, selectedToDo, ToDoGroup, ToDoItem, AddNewToDo } from "./globals.js";
import { LoadToDoGroups } from "./AddDialog/adddialog.js";

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

    document.getElementById(group).children.item(0).innerHTML += text;
  };
  xhr.send();
}

function DisplayToDoLists() {
  for(let toDoGroup of toDoGroups){
    setTimeout(() => {
      console.log(toDoGroup);
    var elem = document.getElementById(toDoGroup.name);
    if(elem != null){
      elem.remove();
    }
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
  let name =      document.getElementById('addname').value;
  let details =   document.getElementById('adddetails').value;
  let date =      document.getElementById('adddate').value;
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
  console.log(toDoGroups);
  let dialog = document.getElementById('add')
  dialog.classList.remove('show');
  dialog.classList.add('hide');

  DisplayToDoLists()
}

function AddCancel() {
  document.getElementById('addname').value = '';
  document.getElementById('adddetails').value = '';
  document.getElementById('adddate').value = '';
  document.getElementById('addgroup').value = '';

  let dialog = document.getElementById('add')
  dialog.classList.remove('show');
  dialog.classList.add('hide');

}

function OpenAddDialog() {
  let dialog = document.getElementById('add');
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
  document.getElementById('savebutton').onclick = AddSave;
  document.getElementById('cancelbutton').onclick = AddCancel;
}

InitializeButtonFunctions();
DisplayToDoLists();