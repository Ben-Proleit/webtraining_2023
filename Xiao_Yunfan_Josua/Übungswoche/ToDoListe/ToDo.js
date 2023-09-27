var ListID = 0;

function einträgeHinzufügen() {
  // get todo div, add a Textbox div, set div id,
  let ToDoListe = document.getElementById("ToDo");
  const div = ToDoListe.appendChild(document.createElement("div"));
  div.setAttribute("id", ListID);

  //create area and buttons
  const text = div.appendChild(document.createElement("textarea"));
  const edit = div.appendChild(document.createElement("button"));
  const kill = div.appendChild(document.createElement("button"));
  const completed = div.appendChild(document.createElement("button"));

  //set button Classes
  text.setAttribute("edit", "false");
  edit.setAttribute("class", "edit");
  kill.setAttribute("class", "kill");
  completed.setAttribute("class", "completed");

  //set Button Onclick
  edit.setAttribute("onclick", "eintragBearbeiten(" + ListID + ");");
  kill.setAttribute("onclick", "eintragLöschen(" + ListID + ");");
  completed.setAttribute("onclick", "eintragErledigt(" + ListID + ");");

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

function eintragBearbeiten(id) {
  //get div, get textarea, guck status
  let workInProgress = document.getElementById(id);
  let ta = workInProgress.getElementsByTagName("textarea").item(0);
  let bool = ta.getAttribute("edit");
  //statuswechsel
  if (bool == "false") {
    ta.setAttribute("readonly", "");
    ta.setAttribute("Edit", "true");
  } else {
    ta.removeAttribute("readonly", "");
    ta.setAttribute("Edit", "false");
  }
}

function eintragErledigt(id) {
  //get selected div-element
  let ToDoListe = document.getElementById("ToDo");
  const divOld = ToDoListe.appendChild(document.getElementById(id));

  //get Done-List and add new div
  let DoneListe = document.getElementById("Done");
  let divNew = DoneListe.appendChild(document.createElement("div"));

  //copy data into new created div, also the id
  divNew.innerHTML = divOld.innerHTML;
  divNew.setAttribute("id", id);

  //delete selected div after copying all data
  eintragLöschen(id);
}

function eintragNichtErledigt(id) {
  console.log("Test5");
}
