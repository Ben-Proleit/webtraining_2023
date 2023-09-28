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

  totalGames() {
    return this.timesDraw + this.timesLost + this.timesWon;
  }
}

// Global vars
let ticTacToe = new TicTacToe();
let activePlayerX = null;
let activePlayerO = null;
let playerList = [];


// Global function

function startGame() {
  activePlayerX = createOrLoadPlayer(document.getElementById("player-1-input").value);
  activePlayerO = createOrLoadPlayer(document.getElementById("player-2-input").value);
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

  // Set winning text
  document.getElementById("end-screen-text").innerText = "Spieler " + winningPlayer.name + " hat gewonnen! (" 
  + winningPlayer.timesWon + " Siege von " + winningPlayer.totalGames() + " Spielen)";

  updatePlayerCard();

}

function handleDraw() {
  activePlayerX.timesDraw++;
  activePlayerO.timesDraw++;

  // display right div
  document.getElementById("end-screen").style.display = "";

  // Set draw text
  document.getElementById("end-screen-text").innerText = "Es gab ein Unentschieden zwischen " + activePlayerX.name + 
  " und " + activePlayerO.name;

  updatePlayerCard();
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

function resetGame() {
  // Hide end screen
  document.getElementById("end-screen").style.display = "none";
  ticTacToe.resetGame();
  updateDisplay();
}

function registerNewPlayer() {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("register-user-screen").style.display = "";
}