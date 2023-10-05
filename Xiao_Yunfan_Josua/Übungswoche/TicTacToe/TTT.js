var Player = false;
var roundCount = 0;
var newArray = [];
var X = "X";
var O = "O";
var won = false;
var P1 = 0;
var P2 = 0;
var Name1 = "yun fan";
var Name2 = "divad";

//set players name
function setPlayernames() {
  document.getElementById("Name1").innerHTML = Name1;
  document.getElementById("Name2").innerHTML = Name2;
  //change chars
  X = Name1.charAt(0).toUpperCase();
  O = Name2.charAt(0).toUpperCase();
}
setPlayernames();

function startGame() {
  let stoart = document.getElementById("startpage");
  let tic = document.getElementById("playboard");

  stoart.classList.add("hidden");
  tic.removeAttribute("class");
  if (document.getElementById("NamePlayer1").value != "") {
    Name1 = document.getElementById("NamePlayer1").value;
    Name2 = document.getElementById("NamePlayer2").value;
    setPlayernames();
  }
}

function switcher() {
  Player = !Player;
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
  if (roundCount == 9 && won == false) {
    reset();
  }
}
function winCheckVer() {
  let Nr = 1;
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
  let Nr = 1;
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
/**
 * @param {string} win
 */
function CheckCheck(win) {
  if (win == X + X + X) {
    P1++;
    winAusgabe(1);
  } else if (win == O + O + O) {
    P2++;
    winAusgabe(2);
  }
}
//#endregion

//#region afterWin
function winAusgabe(who) {
  let tisch = document.getElementsByTagName("tbody").item(0);
  let newTr = tisch.appendChild(document.createElement("tr"));
  let trOne = newTr.appendChild(document.createElement("td"));
  let trTwo = newTr.appendChild(document.createElement("td"));
  let idk = trOne.appendChild(document.createElement("h2"));
  let reset = trTwo.appendChild(document.createElement("button"));
  reset.appendChild(document.createElement("img"));
  if (who == 1) {
    document.getElementById("sideOne").innerHTML =
      "<h3>" + Name1 + "</h3>" + P1;
  } else if (who == 2) {
    document.getElementById("sideTwo").innerHTML =
      "<h3>" + Name2 + "</h3>" + P2;
  }

  idk.textContent = "Spieler " + who + " hat gewonnen";
  newTr.setAttribute("class", "Winner");
  reset.setAttribute("class", "resett");
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
  if (won == true) {
    let kill = document.getElementsByClassName("Winner").item(0);
    let father = kill.parentElement;
    father.removeChild(kill);
  }
  won = false;
  Player = false;
  roundCount = 0;
}
//#endregion
