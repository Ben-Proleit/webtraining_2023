var tiles = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

var shapes = ["<p>&#9930;</p>", "<p>&#9929;</p>"];
var turn = 0; // many turns in round
var round = 0; // round = game
var score = [0,0]

document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('specialTile').innerHTML = shapes[turn % shapes.length];
} )


function tileClicked(tile) {
  tile.innerHTML = shapes[turn % shapes.length];

  let tile_id = String(tile.id).slice(-1);
  
  tiles[tile_id] = turn % shapes.length;
  tile.removeAttribute("onclick");
  let boardState = checkBoardState();
  if(boardState != -1){
    gameEnd(boardState);
  }
  turn++;

  //specialTile displays whose turn it is
  let specialTile = document.getElementById('specialTile');
  specialTile.innerHTML = shapes[turn % shapes.length];
}

function gameEnd(winningPlayer){
  score[winningPlayer]++;
  console.debug(score);
  updateScoreDisplay();
  for(let i = 0; i<tiles.length; i++){
    var htmlTile = document.getElementById('tile_'+String(i));
    htmlTile.removeAttribute('onclick');
  }
}


function reset(){
  for(let i = 0; i<tiles.length; i++){
    // reset array
    tiles[i] = -1;

    //reset html
    var htmlTile = document.getElementById('tile_'+String(i));
    htmlTile.innerHTML = '';
    htmlTile.setAttribute('onclick', 'tileClicked(this)');
  }
  round++;
  turn = round;
}



function checkBoardState() {
  if(turn == 8+round){ // stalemate
    return -2;
  }
  
  // console.debug(tiles)

  //horizontal
  if (tiles[0] == tiles[1] && tiles[0] == tiles[2] && tiles[0] !== -1) // row 0
    return tiles[0];
  if (tiles[3] == tiles[4] && tiles[3] == tiles[5] && tiles[3] !== -1) // row 1
    return tiles[3];
  if (tiles[6] == tiles[7] && tiles[6] == tiles[8] && tiles[6] !== -1) // row 2
    return tiles[6];

  //vertical
  if (tiles[0] == tiles[3] && tiles[0] == tiles[6] && tiles[0] !== -1) // col 0
    return tiles[0];
  if (tiles[1] == tiles[4] && tiles[1] == tiles[7] && tiles[1] !== -1) // col 1
    return tiles[1];
  if (tiles[2] == tiles[5] && tiles[2] == tiles[8] && tiles[2] !== -1) // col 2
    return tiles[2];

  //scheps
  if (tiles[0] == tiles[4] && tiles[0] == tiles[8] && tiles[0] !== -1) // top left to bottom right
    return tiles[0];
  if (tiles[2] == tiles[4] && tiles[2] == tiles[6] && tiles[2] !== -1) // top right to bottom left
    return tiles[2];

  return -1; // default value -> no win state
}

function updateScoreDisplay(){
  htmlParagraphScore0 = document.getElementById('score_p0');
  htmlParagraphScore1 = document.getElementById('score_p1');

  htmlInputName0 = document.getElementById('name_p0');
  htmlInputName1 = document.getElementById('name_p1');

  let tmpScore0 = ''
  let tmpScore1 = ''

  if(htmlInputName0.value == ''){
    tmpScore0 = 'Player ⛊: '
  }
  else{
    tmpScore0 = htmlInputName0.value + ' : ';
  }

  if(htmlInputName1.value == ''){
    tmpScore1 = 'Player ⛉:   '
  }
  else{
    tmpScore1 = htmlInputName1.value + ' : ';
  }

  tmpScore0 = tmpScore0 + String(score[0])
  tmpScore1 = tmpScore1 + String(score[1])

  console.debug(tmpScore0)
  console.debug(tmpScore1)

  console.debug(htmlParagraphScore0)

  htmlParagraphScore0.innerText = tmpScore0
  htmlParagraphScore1.innerText = tmpScore1
}