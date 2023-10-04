import { toDoGroups } from "../globals.js";

export function LoadToDoGroups() {
  let options = document.getElementById('groupnames');
  options.innerHTML = '';
  for(let group of toDoGroups) {
    let option =  document.createElement('option');
    option.innerText = group.name;
    options.appendChild(option)
  }
}
