var ListID = 0;
var bearbeitet = 0;
var Dad;
var ToDoArray = [];
var DoneArray = [];

function loadEntries() {
  //load Local storages and clear them
  const todosJson = localStorage.getItem("ToDoArray");
  const doneJson = localStorage.getItem("DoneArray");
  localStorage.clear();

  //Todo Local storage
  const todos = JSON.parse(todosJson);

  todos.forEach((element) => {
    if (element != null && element != "") {
      einträgeHinzufügen();
      textareaBeschreiben(element);
      ToDoArray[ListID - 1] = element;
    }
    const jsonText = JSON.stringify(ToDoArray);
    localStorage.setItem("ToDoArray", jsonText);
  });

  //Done Local storage
  const dones = JSON.parse(doneJson);

  if (dones != null) {
    dones.forEach((element) => {
      if (element != null && element != "") {
        einträgeHinzufügen();
        textareaBeschreiben(element);
        eintragErledigt(ListID - 1);
        DoneArray[ListID - 1] = element;
      }
      const jsonText = JSON.stringify(DoneArray);
      localStorage.setItem("DoneArray", jsonText);
    });
  }
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
  } else {
    let deathRow = document.getElementById(id);
    let body = deathRow.parentElement;
    body.removeChild(deathRow);
    if (document.getElementById("ToDo") == body) {
      ToDoArray[id] = "";
      const jsonText = JSON.stringify(ToDoArray);
      localStorage.setItem("ToDoArray", jsonText);
    } else {
      DoneArray[id] = "";
      const jsonText = JSON.stringify(DoneArray);
      localStorage.setItem("DoneArray", jsonText);
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
  cElement.setAttribute("class", "toKill");
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

    //delete from ToDo-local storage
    ToDoArray[id] = "";
    let jsonText = JSON.stringify(ToDoArray);
    localStorage.setItem("ToDoArray", jsonText);

    //write into Done-local storage
    DoneArray[id] = text;
    jsonText = JSON.stringify(DoneArray);
    localStorage.setItem("DoneArray", jsonText);
  } else if (idBody == "Done") {
    let selectedDiv = DoneListe.appendChild(document.getElementById(id));
    let targetDiv = ToDoListe.appendChild(document.createElement("div"));

    targetDiv.innerHTML = selectedDiv.innerHTML;
    targetDiv.setAttribute("id", id);
    let text = selectedDiv.getElementsByTagName("textarea").item(0).value;
    targetDiv.getElementsByTagName("textarea").item(0).value = text;
    //write into Done-local storage
    ToDoArray[id] = text;
    let jsonText = JSON.stringify(ToDoArray);
    localStorage.setItem("ToDoArray", jsonText);

    //delete from Done-local storage
    DoneArray[id] = "";
    jsonText = JSON.stringify(DoneArray);
    localStorage.setItem("DoneArray", jsonText);
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
