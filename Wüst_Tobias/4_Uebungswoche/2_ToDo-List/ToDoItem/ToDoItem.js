export class ToDoGroup {
  constructor(name) {
    this.name = name;
    this.toDos = [];
  }

  getToDos() {
    return this.toDos;
  }

  getToDo(id) {
    for(let todo of ToDos) {
      if(todo.id == id) {
        return todo;
      }
    }
  }

  addToDo(toDoItem) {
    this.toDos.push(toDoItem);
  }

  removeToDo(id) {
    for(let i = 0; i < this.toDos.length; i++) {
      if(this.toDos[i].id == id) {
        this.toDos.splice(i,1);
        break;
      }
    }
  }
}

export class ToDoItem {
  constructor(id, name, details, date) {
    this.id = id;
    this.name = name; 
    this.details = details;
    this.date = date; 
    this.isDone = false; 
  }

  editName(name) {
    this.name = name;
  }

  editDetails(details) {
    this.details = details;
  }

  editDate(date) {
    this.date = date;
  }

  changeDoneState() {
    this.isDone = !this.isDone;
  }
}