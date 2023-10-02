import {ToDoGroup, ToDoItem} from "./ToDoItem/ToDoItem.js" 
export {ToDoGroup, ToDoItem}

export var toDoGroups = [];

var id = 1; 

export function RemoveGroup(groupName) {
  toDoGroups = toDoGroups.filter((group) => { return group.name != groupName});
}

export function AddNewToDo(name, details, date, groupName) {
  let group = toDoGroups.find((elem) => {
    return elem.name == groupName;
  });
  if(group == undefined) {
    group = new ToDoGroup(groupName);
    toDoGroups.push(group);
  } 
  group.addToDo(new ToDoItem(id, name, details, date));
  id++;
}
