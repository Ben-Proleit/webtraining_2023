var ListID = 0;

function einträgeHinzufügen() {
  // get todo div, add a Textbox div, set div id,
  let ToDoListe = document.getElementById("ToDo");
  const div = ToDoListe.appendChild(document.createElement("div"));
  div.setAttribute("id", ListID);

  //create area and buttons
  div.appendChild(document.createElement("textarea"));
  const edit = div.appendChild(document.createElement("button"));
  const kill = div.appendChild(document.createElement("button"));
  const completed = div.appendChild(document.createElement("button"));

  //set button attributes
  kill.setAttribute("onclick", "eintragLöschen(" + ListID + ");");
  edit.setAttribute("class", "edit");
  kill.setAttribute("class", "kill");
  completed.setAttribute("class", "completed");

  //set button pictures
  edit.appendChild(document.createElement("img"));
  kill.appendChild(document.createElement("img"));
  completed.appendChild(document.createElement("img"));

  //counter
  ListID++;
}

function eintragLöschen(id) {
  //Holt id des Kindes, Holt body, tötet kind
  let deathRow = document.getElementById(id);
  let body = document.getElementById("ToDo");
  body.removeChild(deathRow);
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
