var ToDoListe = new Array();
var ListID = 0;

function einträgeHinzufügen() {
  ToDoListe = document.getElementById("ToDo");
  console.log(ToDoListe);
  const div = ToDoListe.appendChild(document.createElement("div"));
  div.setAttribute("id", ListID);

  div.appendChild(document.createElement("textarea"));
  const edit = div.appendChild(document.createElement("button"));
  const kill = div.appendChild(document.createElement("button"));
  const completed = div.appendChild(document.createElement("button"));

  edit.setAttribute("class", "edit");
  kill.setAttribute("class", "kill");
  completed.setAttribute("class", "completed");
  ListID++;

  edit.appendChild(document.createElement("img"));
  kill.appendChild(document.createElement("img"));
  completed.appendChild(document.createElement("img"));
}

function eintragLöschen(id) {
  console.log(id);
  //  let deathRow = document.getElementById(id)
  //  try {
  //     ToDoListe.removeChild
  //  }
}
// document.getElementsByClassName("kill").onclick = eintragLöschen(id);

function eintragBearbeiten() {
  console.log("Test3");
}

function eintragErledigt() {
  console.log("Test4");
}

function eintragNichtErledigt() {
  console.log("Test5");
}
