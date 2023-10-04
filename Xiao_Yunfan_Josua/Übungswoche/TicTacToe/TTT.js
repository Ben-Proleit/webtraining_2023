var Player = false;
var roundCount = 0;
var newArray = [];
var X = "X";
var O = "O";
var won = false;
function switcher() {
  Player = !Player;
  console.log(Player);
}

/**
 *
 * @param {Number} id
 */
function insertInput(id) {
  let Button = document.getElementById(id);
  let insert;
  if (Player == false) {
    insert = X;
  } else {
    insert = O;
  }

  if ((newArray[id] == "" || newArray[id] == null) && won == false) {
    newArray[id] = insert;
    Button.textContent = insert;
    roundCount++;
    if (roundCount >= 5) {
      winCheck();
    }
    switcher();
  }
}
//#region WinCheck
function winCheck() {
  winCheckHor();
  winCheckVer();
  winCheckX();
}
function winCheckVer() {
  let Nr = 0;
  do {
    let winString = "";
    winString += newArray[Nr];
    winString += newArray[Nr + 1];
    winString += newArray[Nr + 2];
    CheckCheck(winString);
    Nr = Nr + 3;
  } while (Nr < 10);
}
function winCheckHor() {
  let Nr = 0;
  do {
    let winString = "";
    winString += newArray[Nr];
    winString += newArray[Nr + 3];
    winString += newArray[Nr + 6];
    CheckCheck(winString);
    Nr = Nr + 1;
  } while (Nr < 10);
}
function winCheckX() {
  let winString = "";
  winString += newArray[1];
  winString += newArray[5];
  winString += newArray[9];
  CheckCheck(winString);
  winString = "";
  winString += newArray[3];
  winString += newArray[5];
  winString += newArray[7];
  CheckCheck(winString);
}
//#endregion

/**
 * @param {string} win
 */
function CheckCheck(win) {
  if (win == "XXX") {
    winAusgabe(1);
  } else if (win == "OOO") {
    winAusgabe(2);
  }
}

function winAusgabe(who) {
  let tisch = document.getElementsByTagName("tbody").item(0);
  let newTr = tisch.appendChild(document.createElement("tr"));
  let trOne = newTr.appendChild(document.createElement("td"));
  let trTwo = newTr.appendChild(document.createElement("td"));
  let idk = trOne.appendChild(document.createElement("h2"));
  let reset = trTwo.appendChild(document.createElement("button"));

  idk.textContent = "Spieler " + who + " hat gewonnen";
  newTr.setAttribute("class", "Winner");
  reset.setAttribute("onclick", "reset()");
  won = true;
}

function reset() {
  let Nr = 1;
  do {
    newArray[Nr] = "";
    let Button = document.getElementById(Nr);
    Button.textContent = "";
    Nr++;
  } while (Nr <= 9);
  let kill = document.getElementsByClassName("Winner").item(0);
  let father = kill.parentElement;
  father.removeChild(kill);
  won = false;
  Player = false;
}
