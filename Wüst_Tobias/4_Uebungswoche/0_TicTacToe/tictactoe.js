var symbol = 'X';

var player1 = '';
var player2 = '';

var isWon = false; 
var elements = [[],[],[]];

elements[0].push(document.getElementById('f11').children[0]);
elements[0].push(document.getElementById('f12').children[0]);
elements[0].push(document.getElementById('f13').children[0]);
elements[1].push(document.getElementById('f21').children[0]);
elements[1].push(document.getElementById('f22').children[0]);
elements[1].push(document.getElementById('f23').children[0]);
elements[2].push(document.getElementById('f31').children[0]);
elements[2].push(document.getElementById('f32').children[0]);
elements[2].push(document.getElementById('f33').children[0]);

function changeSymbol() {
  if(isWon) {
    return;
  }
  if(symbol == 'X') {
    symbol = 'O';
  }
  else {
    symbol = 'X';
  }
}

function calculateVictory() {
  for(let i = 0; i<3; i++) {
    if(elements[i][0].innerText == elements[i][1].innerText &&
       elements[i][1].innerText == elements[i][2].innerText && 
       elements[i][0].innerText != ''){
        isWon = true;
        return;
    }
    if(elements[0][i].innerText == elements[1][i].innerText &&
      elements[1][i].innerText == elements[2][i].innerText &&
      elements[0][i].innerText != ''){
       isWon = true;
       return;
    }
  }
  if((elements[0][0].innerText == elements[1][1].innerText &&
    elements[1][1].innerText == elements[2][2].innerText &&
    elements[1][1].innerText != '')||
    (elements[0][2].innerText == elements[1][1].innerText &&
    elements[1][1].innerText == elements[2][0].innerText &&
    elements[1][1].innerText != '')) {
      isWon = true; 
      return;
    }
}

function elementFunction(event) {
  event.target.innerText = symbol;
        calculateVictory();
        changeSymbol();
        if(isWon) {
          executeVictory();
        }
}

function startGame() {
  elements.forEach((elementarr) => {
    elementarr.forEach((element) => {
      element.innerText = ''
      element.addEventListener('click', elementFunction, event);
    });
  });
  symbol = 'X';
  isWon = false;
  player1 = document.getElementById('p1').value;
  player2 = document.getElementById('p2').value;
  document.getElementById('victory').innerText = '';
}

function executeVictory() {
  elements.forEach((elementarr) => {
    elementarr.forEach((element) => {
      element.removeEventListener('click', elementFunction);
    });
  });

  if(symbol == 'X') {
    document.getElementById('victory').innerText = player1 + ' hat diese Runde gewonnen';
  }
  else {
    document.getElementById('victory').innerText = player2 + ' hat diese Runde gewonnen';
  }
}

