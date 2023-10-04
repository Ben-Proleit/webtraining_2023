let counter = 1;
let game = ['','',''];
game[0] = ['','',''];
game[1] = ['','',''];
game[2] = ['','',''];
let playerNameScore = [];
let playerOne = null;
let playerTwo = null;
var div2Clone = document.getElementById('div2').cloneNode(true);
var div3Clone = document.getElementById('div3').cloneNode(true);
var div4Clone = document.getElementById('div4').cloneNode(true);
var div6Clone = document.getElementById('div6').cloneNode(true);

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
        disableGameField();
    }

    let draw = checkDraw();

    if (draw) {
        console.log('the game ended in a draw');
        createBeginNewGame();
        setResultDisplay('draw');
    }

    counter++
    
    if (document.getElementById('generalText') != null) {
        setPlayerBold();
    }

    if (document.getElementById('generalText') == null) {
        playerOne = null;
        playerTwo = null;
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
        if (playerOne == null && playerTwo == null) {
            console.log('the game was won by circle');
            setResultDisplay('circle');
        } else {
            playerNameScore.forEach(player => {
            if (player.includes(playerOne)) {
                player[1] = player[1] + 1;
            }
            });
            console.log('the game was won by playerone');
            setResultDisplay('playerOne');
        }
        
    }
    else {
        if (playerOne == null && playerTwo == null) {
            console.log('the game was won by square');
            setResultDisplay('square');
        } else {
            playerNameScore.forEach(player => {
                if (player.includes(playerTwo)) {
                    player[1] = player[1] + 1;
                }
            });
            console.log('the game was won by playertwo');
            setResultDisplay('playerTwo');
        }        
    }
    console.log(playerNameScore);
}

function enableButton() {
    const btn = document.getElementById('submitBtn');
    btn.disabled = false;
}

function getPlayerNames() {
    let nameOne = document.getElementById('nameOne').value;
    let nameTwo = document.getElementById('nameTwo').value;

    playerOne = nameOne;
    playerTwo = nameTwo;

    if (!playerNameScore.some(row => row.includes(nameOne))) {
        playerNameScore.push([nameOne, 0]);
    }
    if (!playerNameScore.some(row => row.includes(nameTwo))) {
        playerNameScore.push([nameTwo, 0]);
    }
    console.log(nameOne, nameTwo, playerNameScore);
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
    document.getElementById('div4').replaceWith(div4Clone.cloneNode(true));
    counter = 0;
    game = ['','',''];
    game[0] = ['','',''];
    game[1] = ['','',''];
    game[2] = ['','',''];
}

function restoreDIV6() {
    document.getElementById('div6').replaceWith(div6Clone.cloneNode(true));
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
    beginNewGameBtn.addEventListener('click', restoreDIV6)
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

function disableGameField() {
    let buttons = document.getElementsByClassName('field');

    buttons = Array.prototype.slice.call(buttons);

    buttons.forEach(button => {
        let disabledField = document.createElement('div');
        button.replaceWith(disabledField);
        disabledField.id = button.attributes[1].nodeValue;
        disabledField.classList.add("disabledField");
    });
    
}

function getTop10() {
    playerNameScore.sort(function(a,b) {
        return a[1]-b[1]
    });
    playerNameScore.reverse();
    const topTen = playerNameScore.slice(0,10);
    return topTen;
}

function displayTop10() {
    const newDIV = document.createElement('div');
    newDIV.id = 'newDIV5';
    let div5 = document.getElementById('div5');

    if (div5 == null) {
        div5 = document.getElementById('newDIV5');
    };

    div5.replaceWith(newDIV);

    const headerDIV = document.createElement('div');
    headerDIV.id = 'top10';
    headerDIV.append('TOP 10 PLAYER');
    const newTable = document.createElement('table');
    const headerRow = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.append('Name');
    const header2 = document.createElement('th');
    header2.append('Score');

    const buttonDIV = document.createElement('div');
    buttonDIV.id = 'buttonDiv'
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refreshBtn'
    refreshButton.type = 'button';
    refreshButton.textContent = 'REFRESH';
    refreshButton.addEventListener('click', displayTop10);

    newDIV.appendChild(headerDIV);
    newDIV.appendChild(newTable);
    newTable.appendChild(headerRow);
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    newDIV.appendChild(buttonDIV);
    buttonDIV.appendChild(refreshButton);

    let top10Player = getTop10();

    top10Player.forEach(player => {
        let tableRow = document.createElement('tr');
        newTable.appendChild(tableRow);
        let tableDataName = document.createElement('td');
        tableRow.appendChild(tableDataName);
        tableDataName.append(player[0]);
        let tableDataScore = document.createElement('td');
        tableRow.appendChild(tableDataScore);
        tableDataScore.append(player[1]);
    });

}

function setResultDisplay(result) {
    let div4ID = "div4";
    let currentDIV4 = document.getElementById(div4ID);
    let newDIV4 = document.createElement('div');
    currentDIV4.replaceWith(newDIV4);
    newDIV4.id = div4ID;

    switch (result) {
        case 'draw':

            newDIV4.append('The game ended in a DRAW!');

            break;

        case 'playerOne':

            newDIV4.append(playerOne + ' has won the game. CONGRATULATIONS! Better luck next time, ' + playerTwo + '!');

            break;
    
        case 'playerTwo':

            newDIV4.append(playerTwo + ' has won the game. CONGRATULATIONS! Better luck next time, ' + playerOne + '!');

            break;
        
        case 'circle':
            newDIV4.append('Circle has won the game. CONGRATULATIONS! Better luck next time, Square!');

            break;
        
        case 'square':
            newDIV4.append('Square has won the game. CONGRATULATIONS! Better luck next time, Circle!');
            
            break;
        
        default:
            break;
    }
}