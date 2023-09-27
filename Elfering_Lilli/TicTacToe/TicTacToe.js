let counter = 1;
let game = ['','',''];
game[0] = ['','',''];
game[1] = ['','',''];
game[2] = ['','',''];

function fillField(id) {
    const field = document.getElementById(id);
    const filledField = document.createElement('div');
    field.replaceWith(filledField);
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
    }
    
    counter++
}

function setGame(id){
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

function checkWin(){
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

//TODO: Array mit S und C falschrum
//TODO: Nach dem gewonnenen Spiel kann noch weitergespielt werden