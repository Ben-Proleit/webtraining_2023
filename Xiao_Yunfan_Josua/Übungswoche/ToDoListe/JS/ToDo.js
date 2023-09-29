var ListID = 0;
var bearbeitet = 0;
var Dad;
var ToDoArray = [];

function loadEntries() {
  const todosJson = localStorage.getItem("ToDoArray");
  const test = JSON.parse(todosJson);
  localStorage.clear();

  test.forEach((element) => {
    if (element != null && element != "") {
      einträgeHinzufügen();
      textareaBeschreiben(element);
      ToDoArray[ListID - 1] = element;
    }
    const jsonText = JSON.stringify(ToDoArray);
    localStorage.setItem("ToDoArray", jsonText);
  });
}
loadEntries();

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

function textareaBeschreiben(text) {
  let ToDoListe = document.getElementById("ToDo");
  let targetDiv = ToDoListe.appendChild(document.getElementById(ListID - 1));
  targetDiv.getElementsByTagName("textarea").item(0).value = text;
  ToDoArray[ListID - 1] = text;
}

function eintragLöschen(id) {
  //Holt id des Kindes, Holt body, tötet kind
  if (bearbeitet == "1") {
    let body = document.getElementById(Dad);
    let deathRow = body.getElementsByClassName("toKill").item(0);
    body.removeChild(deathRow);
    ToDoArray[id] = "";
    const jsonText = JSON.stringify(ToDoArray);
    localStorage.setItem("ToDoArray", jsonText);
  } else {
    let deathRow = document.getElementById(id);
    let body = deathRow.parentElement;
    body.removeChild(deathRow);
    if (document.getElementById("ToDo") == body) {
      ToDoArray[id] = "";
      const jsonText = JSON.stringify(ToDoArray);
      localStorage.setItem("ToDoArray", jsonText);
    }
  }
  bearbeitet = 0;
}

function eintragBearbeiten(id) {
  //get div, get textarea, guck status
  let workInProgress = document.getElementById(id);
  let ta = workInProgress.getElementsByTagName("textarea").item(0);
  let bool = ta.getAttribute("edit");

  //Check if Element is in ToDo list; only then make it editable
  let parentID = workInProgress.parentElement.id;
  if (parentID == "ToDo") {
    //statuswechsel
    if (bool == "false") {
      ta.setAttribute("readonly", "");
      ta.setAttribute("Edit", "true");

      //in localstorage speichern
      let text = document
        .getElementById("ToDo")
        .appendChild(document.getElementById(id))
        .getElementsByTagName("textarea")
        .item(0).value;
      ToDoArray[id] = text;

      const jsonText = JSON.stringify(ToDoArray);

      localStorage.setItem("ToDoArray", jsonText);
    } else {
      ta.removeAttribute("readonly", "");
      ta.setAttribute("Edit", "false");
    }
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
    targetDiv
      .getElementsByTagName("textarea")
      .item(0)
      .setAttribute("readonly", "");
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
document.getElementById("secret").onmousedown = Twerk;
