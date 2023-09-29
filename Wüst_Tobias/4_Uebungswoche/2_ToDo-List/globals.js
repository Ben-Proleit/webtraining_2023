import {ToDoGroup, ToDoItem} from "./ToDoItem/ToDoItem.js" 
export {ToDoGroup, ToDoItem}

export const toDoGroups = [new ToDoGroup("First Group")];
export const selectedToDo = new ToDoItem(1,'','',new Date());
var id = 1; 

const addEvent = new CustomEvent('todo:add-dialog-save', {
  detail: {},
  bubbles: true,
  cancelable: false,
  composed: false
});

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
