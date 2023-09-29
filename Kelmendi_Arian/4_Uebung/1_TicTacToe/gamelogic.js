// Klassen

class TicTacToe {
  constructor() {
    this.currentPlayer = 'X';
    this.board = [
      ["", "", ""], 
      ["", "", ""], 
      ["", "", ""]
    ];
    this.finished = false;
  }

  setPiece(x, y) {
    // Check if move is valid
    if (x < 0 || x >= 3 || y < 0 || y >= 3 || this.board[y][x] !== "" || this.finished)
      return false;

    // Make move
    this.board[y][x] = this.currentPlayer;

    return true;
  }

  nextPlayer() {
    if(this.currentPlayer === 'X')
      this.currentPlayer = 'O';
    else
      this.currentPlayer = 'X';
  }

  resetGame() {
    this.currentPlayer = 'X';
    this.board = [
      ["", "", ""], 
      ["", "", ""], 
      ["", "", ""]
    ];
    this.finished = false;
  }

  checkWin() {
    if (this.#checkWonHorizontal()) {
      this.finished = true;
      return true;
    }
    if (this.#checkWonVertical()) {
      this.finished = true;
      return true;
    }

    if (this.#checkWonDiagonal()) {
      this.finished = true;
      return true;
    }

    return false;
    
  }

  checkDraw() {
    // False if there is a winner
    if(this.checkWin())
      return false;

    // Is board full
    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        if(this.board[y][x] === '')
          return false;
      }
    }
    return true;
  }

  #checkWonHorizontal() {
    let firstPick = null;
    let wonFlag = true;
    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        if(firstPick === null)
          firstPick = this.board[y][x];

        if(firstPick === '' || this.board[y][x] !== firstPick)
          wonFlag = false;
      }

      if(wonFlag) {
        return true;
      }

      // Reset vars
      firstPick = null;
      wonFlag = true;
    }

    // No win found
    return false;
  }

  #checkWonVertical() {
    let firstPick = null;
    let wonFlag = true;
    for(let x = 0; x < 3; x++) {
      for(let y = 0; y < 3; y++) {
        if(firstPick === null)
          firstPick = this.board[y][x];

        if(firstPick === '' || this.board[y][x] !== firstPick)
          wonFlag = false;
      }

      if(wonFlag) {
        return true;
      }

      // Reset vars
      firstPick = null;
      wonFlag = true;
    }

    // No win found
    return false;
  }

  #checkWonDiagonal() {
    // upper left to right down
    if (this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2])
      return true;

    // upper right to left down
    if (this.board[2][0] !== '' && this.board[2][0] === this.board[1][1] && this.board[2][0] === this.board[0][2])
      return true;

    return false;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.timesWon = 0;
    this.timesLost = 0;
    this.timesDraw = 0;
  }

  static createPlayerFromJSON(jsonObject) {
    let player = new Player(jsonObject.name);
    player.timesWon = jsonObject.timesWon;
    player.timesLost = jsonObject.timesLost;
    player.timesDraw = jsonObject.timesDraw;
    return player;
  }

  totalGames() {
    return this.timesDraw + this.timesLost + this.timesWon;
  }
}

class SaveUtil {
  static #playerKey = "playerList"
  static Save(playerList) {
    localStorage.setItem(SaveUtil.#playerKey, JSON.stringify(playerList));
  }

  static Load() {
    let jsonList = JSON.parse(localStorage.getItem(SaveUtil.#playerKey));
    let newPlayerList = []
    // Return empty list if jsonList is empty
    if(jsonList === null)
      return newPlayerList;
    Array.from(jsonList).forEach((jsonObject) => {
      if(jsonObject.name !== undefined && 
        jsonObject.timesLost !== undefined && 
        jsonObject.timesDraw !== undefined && 
        jsonObject.timesWon !== undefined
        ) {
        newPlayerList.push(Player.createPlayerFromJSON(jsonObject));
      }
    });

    return newPlayerList;
  }
}

// Global vars
let ticTacToe = new TicTacToe();
let activePlayerX = null;
let activePlayerO = null;
let playerList = SaveUtil.Load();


// Global function

function startGame() {
  if(!validateInput())
    return;
  activePlayerX = createOrLoadPlayer(document.getElementById("player-1-input").value);
  activePlayerO = createOrLoadPlayer(document.getElementById("player-2-input").value);

  // Reihenfolge random ändern
  if(Math.random() < 0.5) {
    let temp = activePlayerO;
    activePlayerO = activePlayerX;
    activePlayerX = temp;
  }

  document.getElementById("register-user-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "";
  ticTacToe.resetGame();
  updateDisplay();
  updatePlayerCard();
}

function createOrLoadPlayer(playerName) {
  let player = playerList.find((s) => s.name === playerName);
  if (player === null || player === undefined) {
    player = new Player(playerName);
    playerList.push(player);
  }

  return player;
}

function makeMove(x, y) {
  let success = ticTacToe.setPiece(x, y);
  if (!success)
    return;
  
  // Check for win
  if(ticTacToe.checkWin()) {
    handleWin();
  } else if (ticTacToe.checkDraw()) { // Check draw
    handleDraw();
  }
  // NextPlayer
  ticTacToe.nextPlayer();

  // Display Changes
  updateDisplay();

  // Debug
  console.debug(ticTacToe);

}

function handleWin() {
  let winningPlayer = ticTacToe.currentPlayer === 'X' ? activePlayerX : activePlayerO;
  let losingPlayer = ticTacToe.currentPlayer === 'X' ? activePlayerO : activePlayerX;

  // Set statistics
  winningPlayer.timesWon++;
  losingPlayer.timesLost++;

  // display right div
  document.getElementById("end-screen").style.display = "";
  document.getElementById("game-screen").style.display = "none"

  // Set winning text
  document.getElementById("end-screen-text").innerText = "Spieler " + winningPlayer.name + " hat gewonnen! (" 
  + winningPlayer.timesWon + " Siege von " + winningPlayer.totalGames() + " Spielen)";

  updateDisplay(); // To remove "current player status"
  updatePlayerCard();
  SaveUtil.Save(playerList);

}

function handleDraw() {
  activePlayerX.timesDraw++;
  activePlayerO.timesDraw++;

  // display right div
  document.getElementById("end-screen").style.display = "";
  document.getElementById("game-screen").style.display = "none";

  // Set draw text
  document.getElementById("end-screen-text").innerText = "Es gab ein Unentschieden zwischen " + activePlayerX.name + 
  " und " + activePlayerO.name;

  updatePlayerCard();
  SaveUtil.Save(playerList);
}

function updateDisplay() {
  for(let y = 0; y < 3; y++) {
    for(let x = 0; x < 3; x++) {
      // Get right button
      let currentButton = document.getElementById("game-area").getElementsByTagName("button")[y * 3 + x];

      // Set button
      currentButton.innerText = ticTacToe.board[y][x];
      currentButton.className = (ticTacToe.board[y][x] === "") ?  "" : "token-" + ticTacToe.board[y][x].toLocaleLowerCase();
    }
  }


  // Update current player card
  if(ticTacToe.finished) { // remove all current player card-classes
    Array.from(document.querySelectorAll(".current-player-card")).forEach((pc) => {
      pc.classList.remove("current-player-card")
    });
  }
  else if(ticTacToe.currentPlayer == 'X') {
    document.getElementById("player-card-x").classList.add("current-player-card");
    document.getElementById("player-card-o").classList.remove("current-player-card");
  } else {
    document.getElementById("player-card-o").classList.add("current-player-card");
    document.getElementById("player-card-x").classList.remove("current-player-card");
  }
}

function updatePlayerCard() {
  // Spieler X
  document.getElementById("player-x-name").innerText = activePlayerX.name;
  document.getElementById("player-x-win").innerText = activePlayerX.timesWon;
  document.getElementById("player-x-draw").innerText = activePlayerX.timesDraw;
  document.getElementById("player-x-lose").innerText = activePlayerX.timesLost;

    // Spieler X
    document.getElementById("player-o-name").innerText = activePlayerO.name;
    document.getElementById("player-o-win").innerText = activePlayerO.timesWon;
    document.getElementById("player-o-draw").innerText = activePlayerO.timesDraw;
    document.getElementById("player-o-lose").innerText = activePlayerO.timesLost;
}

function validateInput() {
  if (document.getElementById("player-1-input").value == document.getElementById("player-2-input").value) {
    alert("Spielernamen dürfen nicht gleich sein!");
    return false;
  }

  return true;
}

function resetGame() {
  // Hide end screen
  document.getElementById("end-screen").style.display = "none";
  ticTacToe.resetGame();
  // Spieler vielleicht wechseln
  if(Math.random() < 0.5) {
    let temp = activePlayerO;
    activePlayerO = activePlayerX;
    activePlayerX = temp;
  }
  updateDisplay();
  updatePlayerCard();
}

function registerNewPlayer() {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("register-user-screen").style.display = "";
}