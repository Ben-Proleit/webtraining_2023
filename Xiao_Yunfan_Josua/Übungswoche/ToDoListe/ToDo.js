var ToDoListe = new Array();

function einträgeHinzufügen() {
  console.log("Test");
  ToDoListe = document.getElementById("ToDo");
  console.log(ToDoListe);
  const div = ToDoListe.appendChild(document.createElement("div"));
  div.appendChild(document.createElement("textarea"));
  div
    .appendChild(document.createElement("button"))
    .setAttribute("class", "edit");
  div
    .appendChild(document.createElement("button"))
    .setAttribute("class", "kill");
  div
    .appendChild(document.createElement("button"))
    .setAttribute("class", "completed");
}

function eintragLöschen() {
  console.log("Test2");
}

function eintragBearbeiten() {
  console.log("Test3");
}

function eintragErledigt() {
  console.log("Test4");
}

function eintragNichtErledigt() {
  console.log("Test5");
}
