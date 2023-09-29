let counter = 1;
let game = ['','',''];
game[0] = ['','',''];
game[1] = ['','',''];
game[2] = ['','',''];
var playerNames = [];
var div3Clone = document.getElementById('div3').cloneNode(true);
var div2Clone = document.getElementById('div2').cloneNode(true);

function fillField(id) {

    const newID = id;
    const field = document.getElementById(id);
    const filledField = document.createElement('div');
    field.replaceWith(filledField);
    filledField.id = newID;
    if (counter % 2 == 0) {
        filledField.classList.add('circle');
    }
    else {
        filledField.classList.add('square');
    }

    setGame(id);

    let won = checkWin();

    if (won) {
        console.log('the game was won');
        saveStatistic();
        createBeginNewGame();
    }

    let draw = checkDraw();

    if (draw) {
        console.log('the game ended in a draw');
        createBeginNewGame();
    }

    counter++
    
    if (document.getElementById('generalText') != null) {
        setPlayerBold();
    }

    if (document.getElementById('generalText') == null) {
        noPlayerDisplay();
    }
}

function setGame(id) {
    if (counter % 2 == 0) {
        switch (id) {
            case "fieldA1":
                game[0][0] = "S";
                break;
            case "fieldA2":
                game[0][1] = "S";
                break;
            case "fieldA3":
                game[0][2] = "S";
                break;
            case "fieldB1":
                game[1][0] = "S";
                break;
            case "fieldB2":
                game[1][1] = "S";
                break;
            case "fieldB3":
                game[1][2] = "S";
                break;
            case "fieldC1":
                game[2][0] = "S";
                break;
            case "fieldC2":
                game[2][1] = "S";
                break;
            case "fieldC3":
                game[2][2] = "S";
                break;

            default:
                break;
        }
    }
    else {
        switch (id) {
            case "fieldA1":
                game[0][0] = "C";
                break;
            case "fieldA2":
                game[0][1] = "C";
                break;
            case "fieldA3":
                game[0][2] = "C";
                break;
            case "fieldB1":
                game[1][0] = "C";
                break;
            case "fieldB2":
                game[1][1] = "C";
                break;
            case "fieldB3":
                game[1][2] = "C";
                break;
            case "fieldC1":
                game[2][0] = "C";
                break;
            case "fieldC2":
                game[2][1] = "C";
                break;
            case "fieldC3":
                game[2][2] = "C";
                break;

            default:
                break;
        }
    }
    console.log(game);
    
}

function checkWin() {
    let combs = [
		[[0,0], [0,1], [0,2]],
		[[1,0], [1,1], [1,2]],
		[[2,0], [2,1], [2,2]],
		[[0,0], [1,0], [2,0]],
		[[0,1], [1,1], [2,1]],
		[[0,2], [1,2], [2,2]],
		[[0,0], [1,1], [2,2]],
		[[0,2], [1,1], [2,0]],
	];

    
    for (let comb of combs) {
        if (
            game[comb[0][0]][comb[0][1]] == game[comb[1][0]][comb[1][1]] &&
			game[comb[1][0]][comb[1][1]] == game[comb[2][0]][comb[2][1]] &&
			game[comb[0][0]][comb[0][1]] != ''
            ) {
            console.log('win');
            return true;
        }
    }
    console.log('not yet');
    return false;
}

function saveStatistic() {
    
    if (counter % 2 == 0) {
        console.log('the game was won by circle');
    }
    else {
        console.log('the game was won by square');
    }
}

function enableButton() {
    const btn = document.getElementById('submitBtn');
    btn.disabled = false;
}

function getPlayerNames() {
    let nameOne = document.getElementById('nameOne').value;
    let nameTwo = document.getElementById('nameTwo').value;

    playerNames.push(nameOne);
    playerNames.push(nameTwo);
    console.log(nameOne, nameTwo, playerNames);

    playerDisplay(nameOne, nameTwo);
}

function playerDisplay(nameOne, nameTwo) {
    const divID = "div2";
    const currentDIV = document.getElementById(divID);
    const newDIV = document.createElement('div');
    currentDIV.replaceWith(newDIV);
    newDIV.id = divID;

    let generalText = document.createElement('div');
    generalText.id = 'generalText';
    newDIV.appendChild(generalText);
    generalText.append('Playing:');

    let player1Text = document.createElement('div');
    player1Text.id = 'player1Text';
    newDIV.appendChild(player1Text);
    player1Text.append(nameOne);

    let player2Text = document.createElement('div');
    player2Text.id = 'player2Text';
    newDIV.appendChild(player2Text);
    player2Text.append(nameTwo);

    let bottomText = document.createElement('div');
    bottomText.id = 'bottomText';
    newDIV.appendChild(bottomText);
    bottomText.append('The player in bold is next.');
    bottomText.style.fontStyle = 'italic';


    setPlayerBold();
}

function setPlayerBold(){
    if (counter % 2 == 0) {
        document.getElementById('player1Text').style.fontWeight = 'bold';
        document.getElementById('player2Text').style.fontWeight = 'normal';
    }
    else {
        document.getElementById('player2Text').style.fontWeight = 'bold';
        document.getElementById('player1Text').style.fontWeight = 'normal';
    }
}

function startOver() {
    document.getElementById('div3').replaceWith(div3Clone.cloneNode(true));
    counter = 0;
    if (document.getElementById('generalText') != null) {
        setPlayerBold();
    }
    game = ['','',''];
    game[0] = ['','',''];
    game[1] = ['','',''];
    game[2] = ['','',''];
}

function newPlayers() {
    document.getElementById('div3').replaceWith(div3Clone.cloneNode(true));
    document.getElementById('div2').replaceWith(div2Clone.cloneNode(true));
    counter = 0;
    game = ['','',''];
    game[0] = ['','',''];
    game[1] = ['','',''];
    game[2] = ['','',''];
}

function createBeginNewGame() {
    const divID = "div6";
    const currentDIV = document.getElementById(divID);
    const newDIV = document.createElement('div');
    currentDIV.replaceWith(newDIV);
    newDIV.id = divID;

    let beginNewGameBtn = document.createElement('button');
    beginNewGameBtn.id = 'beginNewGameBtn';
    newDIV.appendChild(beginNewGameBtn);
    beginNewGameBtn.type = 'button';
    beginNewGameBtn.textContent = 'BEGIN NEW GAME'
    beginNewGameBtn.addEventListener('click', newPlayers)
}

function noPlayerDisplay() {
    const divID = "div2";
    const currentDIV = document.getElementById(divID);
    const newDIV = document.createElement('div');
    currentDIV.replaceWith(newDIV);
    newDIV.id = divID;
    newDIV.append('You are playing without names!');
}

function checkDraw() {
    let combs = [
		[0,0],
		[0,1],
		[0,2],
		[1,0],
		[1,1],
		[1,2],
		[2,0],
		[2,1],
        [2,2],
	];
    drawCounter = 0
    for (let comb of combs) {
        if (
            game[comb[0]][comb[1]] != ''
            ) {
            drawCounter++
        }
        if (drawCounter == 9) {
            console.log('draw');
            return true;
        }
    }
    console.log('no draw');
    return false;
}

//TODO: Array mit S und C falschrum
//TODO: Nach dem gewonnenen Spiel kann noch weitergespielt werden