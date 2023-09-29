var Player = false;
var roundCount = 0;
var tttArray = [["", "", ""], [("", "", "")], [("", "", "")]];
var X = "X";
var O = "O";

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
  roundCount++;

  if (Player == false) {
    insert = X;
  } else {
    insert = O;
  }

  switch (id) {
    case 1:
      tttArray[0][0] = insert;
      Button.textContent = insert;
      break;
    case 2:
      tttArray[0][1] = insert;
      Button.textContent = insert;
      break;
    case 3:
      tttArray[0][2] = insert;
      Button.textContent = insert;
      break;
    case 4:
      tttArray[1][0] = insert;
      Button.textContent = insert;
      break;
    case 5:
      tttArray[1][1] = insert;
      Button.textContent = insert;
      break;
    case 6:
      tttArray[1][2] = insert;
      Button.textContent = insert;
      break;
    case 7:
      tttArray[2][0] = insert;
      Button.textContent = insert;
      break;
    case 8:
      tttArray[2][1] = insert;
      Button.textContent = insert;
      break;
    case 9:
      tttArray[2][2] = insert;
      Button.textContent = insert;
      break;
  }

  if (roundCount >= 5) {
    winCheck();
  }
  switcher();
}

function winCheck() {
  let Nr = 0;
  let winString = "";
  do {
    winString = "";
    winString += tttArray[Nr][0];
    winString += tttArray[Nr][1];
    winString += tttArray[Nr][2];
    CheckCheck(winString);
    winString = "";
    winString += tttArray[0][Nr];
    winString += tttArray[1][Nr];
    winString += tttArray[2][Nr];
    CheckCheck(winString);
    Nr++;
  } while (Nr < 3);
  winString = "";
  winString += tttArray[0][0];
  winString += tttArray[1][1];
  winString += tttArray[2][2];
  CheckCheck(winString);
  winString = "";
  winString += tttArray[0][2];
  winString += tttArray[1][1];
  winString += tttArray[2][0];
  CheckCheck(winString);
}
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
  let tisch = document.getElementsByTagName("table").item(0);
  let idk = tisch.appendChild(document.createElement("h2"));
  idk.textContent = "Spieler " + who + " hat gewonnen";
}
