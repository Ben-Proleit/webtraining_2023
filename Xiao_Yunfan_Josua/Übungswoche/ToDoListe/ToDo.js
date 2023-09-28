var ListID = 0;
var bearbeitet = 0;
var Dad;

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
  if (bearbeitet == "1") {
    let body = document.getElementById(Dad);
    let deathRow = body.getElementsByClassName("toKill").item(0);
    body.removeChild(deathRow);
  } else {
    let deathRow = document.getElementById(id);
    let body = deathRow.parentElement;
    body.removeChild(deathRow);
  }
  bearbeitet = 0;
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
  //vater festlegen & beide möglichen eltern holen
  let cElement = document.getElementById(id);
  console.log(cElement);
  cElement.setAttribute("class", "toKill");
  console.log(cElement);
  let body = cElement.parentElement;
  let idBody = body.getAttribute("id");
  Dad = idBody;

  let ToDoListe = document.getElementById("ToDo");
  let DoneListe = document.getElementById("Done");
  bearbeitet = 1;
  if (idBody == "ToDo") {
    let selectedDiv = ToDoListe.appendChild(document.getElementById(id));
    let targetDiv = DoneListe.appendChild(document.createElement("div"));

    targetDiv.innerHTML = selectedDiv.innerHTML;
    targetDiv.setAttribute("id", id);
    let text = selectedDiv.getElementsByTagName("textarea").item(0).value;
    targetDiv.getElementsByTagName("textarea").item(0).value = text;
  } else if (idBody == "Done") {
    let selectedDiv = DoneListe.appendChild(document.getElementById(id));
    let targetDiv = ToDoListe.appendChild(document.createElement("div"));

    targetDiv.innerHTML = selectedDiv.innerHTML;
    targetDiv.setAttribute("id", id);
    let text = selectedDiv.getElementsByTagName("textarea").item(0).value;
    targetDiv.getElementsByTagName("textarea").item(0).value = text;
  }
  //delete selected div after copying all data
  eintragLöschen(id);
}

function Twerk() {
  let body = document.getElementsByTagName("body").item(0);
  let div = body.appendChild(document.createElement("div"));
  div.setAttribute("id", "Thanos");
  const iframe = div.appendChild(document.createElement("iframe"));
  iframe.setAttribute("src", "iframe.html");
}
function killTwerk() {
  let body = document.getElementsByTagName("body").item(0);
}
document.getElementById("secret").onmousedown = Twerk;
document.getElementById("secret").onmouseup = killTwerk;

// Legacy alter erledigt
// function eintragNichtErledigt(id) {
//   //get selected div-element
//   let ToDoListe = document.getElementById("ToDo");
//   let selectedDiv = ToDoListe.appendChild(document.getElementById(id));

//   //get Done-List and add new div
//   let DoneListe = document.getElementById("Done");
//   let targetDiv = DoneListe.appendChild(document.createElement("div"));

//   //copy data into new created div, also the id and textarea value
//   targetDiv.innerHTML = selectedDiv.innerHTML;
//   targetDiv.setAttribute("id", id);
//   var text = selectedDiv.getElementsByTagName("textarea").item(0).value;
//   targetDiv.getElementsByTagName("textarea").item(0).value = text;
//   //delete selected div after copying all data
//   eintragLöschen(id);
// }
