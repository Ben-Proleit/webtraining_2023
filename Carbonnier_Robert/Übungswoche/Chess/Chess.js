
var turn = 'w'
var field = [['r', 'n', 'b', 'q', 0, 'b', 'n', 'r'],
['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 'k', 0, 0, 0],
[0, 'b', 0, 0, 0, 0, 0, 'R'],
[0, 0, 0, 0, 'K', 0, 0, 0],
['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
['R', 'N', 'B', 'Q', 0, 'B', 'N', 'R']]

// 9_9 is the default value
var markedId = '9_9'
var possibleMovement = []
var lastMove = []

//EnPassant
var enPassant = '9_9'
var hitEnPassant = '9_9'
var possibleEnPassant = '9_9'
var possibleHitEnPassant = '9_9'

createField()

//Rochade White
var kingMovedW = false
var rockLeftMovedW = false
var rockRightMovedW = false

//Rochade Black
var kingMovedB = false
var rockLeftMovedB = false
var rockRightMovedB = false


//Current position of the kings for checktests
var wKingPosition = '5_4'
var bKingPosition = '3_4'


var isTesting = false


//#region Setup

function createField() {
    let base = document.getElementById('base')

    let div
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            div = createSingleField(i + '_' + j)
            if (i % 2 == 0 && j % 2 == 0)
                div.style.backgroundColor = '#ffffff'
            else if (i % 2 != 0 && j % 2 != 0)
                div.style.backgroundColor = '#ffffff'
            else
                div.style.backgroundColor = '#964d22'

            base.appendChild(div)
        }
    }

}

function createButton(number) {
    let button = document.createElement('button')
    button.id = number
    button.style.width = '70px'
    button.style.height = '70px'
    button.className = 'Buttons'
    button.onclick = ButtonClick
    button.style.backgroundColor = 'transparent'
    let row = number[0]
    let col = number[2]
    if (field[row][col] != 0) {
        button.innerText = field[row][col]
    }

    return button
}

function createSingleField(number) {
    let button = createButton(number)
    let div = document.createElement('div')
    div.id = number + '_d'
    div.style.width = '70px'
    div.style.height = '70px'
    div.className = 'div'
    div.appendChild(button)
    return div


}

//#endregion Setup




function ButtonClick(sender) {


    let pos = sender.target.id
    let row = pos[0]
    let column = pos[2]

    //Check if Moving Target
    if (sender.target.id != markedId
        && markedId != '9_9'
        && (possibleMovement.indexOf(document.getElementById(sender.target.id)) != -1)) {
        lastMove?.forEach(element => {
            element.style.backgroundColor = 'transparent'
        })

        lastMove = []
        let destination = document.getElementById(sender.target.id)
        let origin = document.getElementById(markedId)
        lastMove.push(destination)
        lastMove.push(origin)
        destination.innerText = origin.innerText


        //Rochade Possibility


        //EnPassant
        checkEnpassant(destination, sender)

        field[row][column] = field[origin.id[0]][origin.id[2]]

        updateKingPosition(row, column)

        origin.innerText = ''
        field[origin.id[0]][origin.id[2]] = 0

        //TODO Letzen Zug Anzeigen
        //lastMove.forEach(element => element.style.backgroundColor = '#109010')
        switchTarget()
        markedId = '9_9'

        if (turn == 'w')
            turn = 'b'
        else
            turn = 'w'
    }
    //New Target
    else {
        switchTarget()                                                                             //Clear all marked fields (not green)
        //Movement
        if (field[row][column] != 0 && (whiteTurnPiece(row, column) || blackTurnPiece(row, column))) {        //Upper Case letters are white pieces
            document.getElementById(sender.target.id).style.backgroundColor = '#ADD8E6'
            markedId = pos
            predictMovement(document.getElementById(sender.target.id).innerText, column, row, turn)
            colorPossibleMovement()

        }
    }
}

function checkEnpassant(destination, sender) {
    if (destination.id == possibleEnPassant.id) {
        enPassant = possibleEnPassant
        hitEnPassant = possibleHitEnPassant
    }
    else if (hitEnPassant != '9_9' && destination.id == hitEnPassant.id && sender.target.innerText.toUpperCase() == 'P') {

        enPassant.innerText = ''
        field[enPassant.id[0]][enPassant.id[2]] = 0
    }
    else {
        enPassant = '9_9'
        hitEnPassant = '9_9'
        possibleEnPassant = '9_9'
        possibleHitEnPassant = '9_9'
    }
}

function updateKingPosition(row, column) {
    if (field[row][column] == 'k') {
        bKingPosition = row + '_' + column
    } else if (field[row][column] == 'K') {
        wKingPosition = row + '_' + column
    }
}


function predictMovement(piece, column, row, color) {
    switch (piece.toLowerCase()) {
        case 'p':                           //Pawn
            pawnMovement(Number(column), Number(row), color)
            break
        case 'k':
            kingMovement(Number(column), Number(row), color)
            break
        case 'r':
            rookMovement(Number(column), Number(row), color)
            break
        case 'b':
            bishopMovement(Number(column), Number(row), color)
            break
        case 'q':
            queenMovement(Number(column), Number(row), color)
            break
        case 'n':
            knightMovement(Number(column), Number(row), color)
            break
    }
}


//#region Helper

//Is the Piece on the Tile White and White's turn
function whiteTurnPiece(row, column) {
    return isWhite(row, column) && turn == 'w'
}

//Is the Piece on the Tile Black and Black's turn
function blackTurnPiece(row, column) {
    return isBlack(row, column) && turn == 'b'
}

//Is the Piece on the Tile Black
function isBlack(row, column) {
    return (field[row][column].toLowerCase() == field[row][column])
}

//Is the Piece on the Tile White
function isWhite(row, column) {
    return field[row][column].toUpperCase() == field[row][column]
}

//Can a Piece of the color take the field (hit a piece on it) 
function takeable(row, column, color) {

    if (field[row][column] != 0) {
        return color == 'w' ? isBlack(row, column) : isWhite(row, column)
    } return false
}

//Is the tile in Bound
function inBound(row, column) {
    if (row > 7 || row < 0)
        return false
    if (column > 7 || column < 0)
        return false
    return true
}

//Colors all tiles in possibleMovement
function colorPossibleMovement() {
    possibleMovement.forEach(tile => {
        if (field[tile.id[0]][tile.id[2]] == 0)
            tile.style.backgroundColor = '#ADD8E6'
        else if (blackTurnPiece(tile.id[0], tile.id[2]) || whiteTurnPiece(tile.id[0], tile.id[2]))
            tile.style.backgroundColor = '#ADD8E6'
        else
            tile.style.backgroundColor = '#FFCCCB'
    })
}


//#endregion Helper

//TODO
function checkRochade() {
    if (turn == 'w') {
        if (kingMovedW == false) {

        }

    }
}

//#region KingCheck

// position of the field and the color that wants to enter it
function isThreatened(row, column, color) {
    let threatened = false
    let tmppossileKingMovement = possibleMovement

    let targetcontent = field[row][column]
    color == 'w' ? field[wKingPosition[0]][wKingPosition[2]] = 0 : field[bKingPosition[0]][bKingPosition[2]] = 0
    color == 'w' ? field[row][column] = 'K' : field[row][column] = 'k'

    field.forEach(fieldrow => {
        for (let i = 0; i < 8 && !threatened; i++) {
            tile = fieldrow[i]
            if (tile == 0)
                continue

            possibleMovement = []
            if (takeable(field.indexOf(fieldrow), i, color))
                checkPosition(i, field.indexOf(fieldrow), color == 'w' ? 'b' : 'w')


            if (possibleMovement.indexOf(document.getElementById(row + '_' + column)) != -1) {
                threatened = true
            }
        }
    })
    if (field[wKingPosition[0]][wKingPosition[2]] == 0) {
    }

    field[wKingPosition[0]][wKingPosition[2]] = 'K'
    field[bKingPosition[0]][bKingPosition[2]] = 'k'
    field[row][column] = targetcontent


    possibleMovement = tmppossileKingMovement
    return threatened



}

function afterMovementOwnKingInCheck(destinationRow, destinationColumn, originRow, originColumn, color) {
    if (isTesting) {
        return false
    }

    let tmpPossibleMovement = possibleMovement



    let destinationContent = field[destinationRow][destinationColumn]
    let originContent = field[originRow][originColumn]



    field[destinationRow][destinationColumn] = originContent
    field[originRow][originColumn] = 0
    isTesting = true
    let possible = color == 'w' ? isThreatened(wKingPosition[0], wKingPosition[2], 'w') : isThreatened(bKingPosition[0], bKingPosition[2], 'b')
    if (destinationRow == 5 && destinationColumn == 2)
        console.log('Blaue 5_2' + ' sender: ' + document.getElementById(originRow + '_' + originColumn).innerText + ' possible: ' + possible)


    field[destinationRow][destinationColumn] = destinationContent
    field[originRow][originColumn] = originContent


    possibleMovement = tmpPossibleMovement

    isTesting = false

    return possible

}

//Is the Position reachable for any Opponent Piece on the Board
function checkPosition(column, row, color) {

    switch (field[row][column].toLowerCase()) {
        case 'p':
            checkPawnMovement(Number(column), Number(row), color)
            break
        case 'k':
            checkKingMovement(Number(column), Number(row), color)
            break
        case 'r':
            rookMovement(Number(column), Number(row), color)
            break
        case 'b':
            bishopMovement(Number(column), Number(row), color)
            break
        case 'q':
            queenMovement(Number(column), Number(row), color)
            break
        case 'n':
            knightMovement(Number(column), Number(row), color)
            break
    }
    possibleMovement.forEach(tile => {
        tile.style.backgroundColor = 'transparent'
    })

}

//Special Check for the King
function checkKingMovement(column, row, playercolor) {

    // Top
    ColorRed((row - 1), column, playercolor, row, column)
    ColorRed((row - 1), (column - 1), playercolor, row, column)
    ColorRed((row - 1), (column + 1), playercolor, row, column)
    //Side
    ColorRed(row, (column - 1), playercolor, row, column)
    ColorRed(row, (column + 1), playercolor, row, column)
    //Below
    ColorRed((row + 1), column, playercolor, row, column)
    ColorRed((row + 1), (column - 1), playercolor, row, column)
    ColorRed((row + 1), (column + 1), playercolor, row, column)

}

//Pawns Check only sideways
function checkPawnMovement(column, row, playercolor) {
    //White
    if (playercolor == 'w') {
        ColorRed((row - 1), (column - 1), playercolor, row, column)
        ColorRed((row - 1), (column + 1), playercolor, row, column)
    }
    //Black
    else {
        ColorRed((row + 1), (column - 1), playercolor, row, column)
        ColorRed((row + 1), (column + 1), playercolor, row, column)
    }
}


//#endregion KingCheck


//#region Movement


//Markes reachable tiles for pawn figure
function pawnMovement(column, row, playercolor) {
    //White
    if (playercolor == 'w') {

        if (ColorBlue((row - 1), column, row, column) && row == 6) {
            if (ColorBlue((row - 2), column, row, column)) {
                possibleEnPassant = document.getElementById((row - 2) + '_' + column)
                possibleHitEnPassant = document.getElementById((row - 1) + '_' + column)
            }
        }
        ColorRed((row - 1), (column - 1), playercolor, row, column)
        ColorRed((row - 1), (column + 1), playercolor, row, column)


        if (row == 3) {
            ColorRedEnPassant((row - 1), (column - 1), row, column)
            ColorRedEnPassant((row - 1), (column + 1), row, column)
        }


    }
    //Black
    else {

        if (ColorBlue((row + 1), column, row, column) && row == 1) {
            if (ColorBlue((row + 2), column, row, column)) {
                possibleEnPassant = document.getElementById((row + 2) + '_' + column)
                possibleHitEnPassant = document.getElementById((row + 1) + '_' + column)
            }
        }

        ColorRed((row + 1), (column - 1), playercolor, row, column)
        ColorRed((row + 1), (column + 1), playercolor, row, column)
        if (row == 4) {
            ColorRedEnPassant((row + 1), (column - 1), row, column)
            ColorRedEnPassant((row + 1), (column + 1), row, column)
        }



    }
}

//Markes reachable tiles for king figure
function kingMovement(column, row, color) {
    //Rochade abfragen
    //Schach abfragen
    //Right side
    if (!ColorBlueKing(row + 1, column, color, row, column))
        ColorRedKing(row + 1, column, color, row, column)
    if (!ColorBlueKing(row + 1, column + 1, color, row, column))
        ColorRedKing(row + 1, column + 1, color, row, column)
    if (!ColorBlueKing(row + 1, column - 1, color, row, column))
        ColorRedKing(row + 1, column - 1, color, row, column)
    //Left side
    if (!ColorBlueKing(row - 1, column, color, row, column))
        ColorRedKing(row - 1, column, color, row, column)
    if (!ColorBlueKing(row - 1, column + 1, color, row, column))
        ColorRedKing(row - 1, column + 1, color, row, column)
    if (!ColorBlueKing(row - 1, column - 1, color, row, column))
        ColorRedKing(row - 1, column - 1, color, row, column)
    //Middle
    if (!ColorBlueKing(row, column + 1, color, row, column))
        ColorRedKing(row, column + 1, color, row, column)
    if (!ColorBlueKing(row, column - 1, color, row, column))
        ColorRedKing(row, column - 1, color, row, column)

}

//Markes reachable tiles for rook figure
function rookMovement(column, row, color) {
    let temprow = row
    let tempcolumn = column
    let currentRow = row
    while (ColorBlue(++currentRow, column, row, column));
    ColorRed(currentRow, column, color, row, column)
    currentRow = row
    while (ColorBlue(--currentRow, column, row, column));
    ColorRed(currentRow, column, color, row, column)

    let currentcolumn = column
    while (ColorBlue(row, ++currentcolumn, row, column));
    ColorRed(row, currentcolumn, color, row, column)
    currentcolumn = column
    while (ColorBlue(row, --currentcolumn, row, column));
    ColorRed(row, currentcolumn, color, row, column)
}

//Markes reachable tiles for bishop figure
function bishopMovement(column, row, color) {
    let currentColumn = column
    let currentRow = row
    while (ColorBlue(--currentRow, --currentColumn, row, column));
    ColorRed(currentRow, currentColumn, color, row, column)

    currentColumn = column
    currentRow = row
    while (ColorBlue(--currentRow, ++currentColumn, row, column));
    ColorRed(currentRow, currentColumn, color, row, column)

    currentColumn = column
    currentRow = row
    while (ColorBlue(++currentRow, --currentColumn, row, column));
    ColorRed(currentRow, currentColumn, color, row, column)

    currentColumn = column
    currentRow = row
    while (ColorBlue(++currentRow, ++currentColumn, row, column));
    ColorRed(currentRow, currentColumn, color, row, column)

}

//Markes reachable tiles for queen figure
function queenMovement(column, row, color) {
    bishopMovement(column, row, color)
    rookMovement(column, row, color)
}

//Markes reachable tiles for knight figure
function knightMovement(column, row, color) {

    if (!ColorBlue((row - 2), (column - 1), row, column))
        ColorRed((row - 2), (column - 1), color, row, column)

    if (!ColorBlue((row - 2), (column + 1), row, column))
        ColorRed((row - 2), (column + 1), color, row, column)

    if (!ColorBlue((row + 2), (column + 1), row, column))
        ColorRed((row + 2), (column + 1), color, row, column)

    if (!ColorBlue((row + 2), (column - 1), row, column))
        ColorRed((row + 2), (column - 1), color, row, column)

    if (!ColorBlue((row + 1), (column - 2), row, column))
        ColorRed((row + 1), (column - 2), color, row, column)

    if (!ColorBlue((row - 1), (column - 2), row, column))
        ColorRed((row - 1), (column - 2), color, row, column)

    if (!ColorBlue((row + 1), (column + 2), row, column))
        ColorRed((row + 1), (column + 2), color, row, column)

    if (!ColorBlue((row - 1), (column + 2), row, column))
        ColorRed((row - 1), (column + 2), color, row, column)
}


//#endregion Movement


//#region  Colors

//Checks if tile is empty -> Colors it blue
function ColorBlue(rowTo, columnTo, rowFrom, columnFrom) {
    if (inBound(rowTo, columnTo)) {
        if (field[rowTo][columnTo] == 0
            && !afterMovementOwnKingInCheck(rowTo, columnTo, rowFrom, columnFrom, isWhite(rowFrom, columnFrom) ? 'w' : 'b')) {
            if (rowTo == 5 && columnTo == 2)
                console.log('Blaue 5_2' + ' sender: ' + document.getElementById(rowFrom + '_' + columnFrom).innerText)
            let tile = document.getElementById(rowTo + '_' + columnTo)
            tile.style.backgroundColor = '#ADD8E6'
            possibleMovement.push(tile)
            return true
        }

    }

    return false
}

//Special king check if threatened after movement
function ColorBlueKing(rowTo, columnTo, color, rowFrom, columnFrom) {
    if (inBound(rowTo, columnTo) && !isThreatened(rowTo, columnTo, color)) {
        if (field[rowTo][columnTo] == 0) {
            let tile = document.getElementById(rowTo + '_' + columnTo)
            tile.style.backgroundColor = '#ADD8E6'
            possibleMovement.push(tile)
            return true
        }
        return false
    }
    return false
}

//Checks if tile is not empty and if it is a piece of the opponent -> Color it red
function ColorRed(rowTo, columnTo, color, rowFrom, columnFrom) {
    if (inBound(rowTo, columnTo)) {
        if (field[rowTo][columnTo] == 0 && !afterMovementOwnKingInCheck(rowTo, columnTo, rowFrom, columnFrom, color))
            return false
        if (takeable(rowTo, columnTo, color)) {
            let tile = document.getElementById(rowTo + '_' + columnTo)
            tile.style.backgroundColor = '#FFCCCB'
            possibleMovement.push(tile)
            return true
        }
    }
    return false
}

//Special king check if threatened after movement 
function ColorRedKing(rowTo, columnTo, color, rowFrom, columnFrom) {
    if (inBound(rowTo, columnTo)) {
        if (field[rowTo][columnTo] == 0)
            return false
        if (takeable(rowTo, columnTo, color) && !isThreatened(rowTo, columnTo, color)) {
            let tile = document.getElementById(rowTo + '_' + columnTo)
            tile.style.backgroundColor = '#FFCCCB'
            possibleMovement.push(tile)
            return true
        }
    }
    return false
}

//Special enpassant check for pawns
function ColorRedEnPassant(rowTo, columnTo, rowFrom, columnFrom) {
    if (inBound(rowTo, columnTo)) {
        if (enPassant != '9_9') {

            if (document.getElementById(rowTo + '_' + columnTo).id != hitEnPassant.id
                && !afterMovementOwnKingInCheck(rowTo, columnTo, rowFrom, columnFrom, isWhite(rowFrom, columnFrom) ? 'w' : 'b')) {
                return false
            }
            let tile = document.getElementById(rowTo + '_' + columnTo)
            tile.style.backgroundColor = '#FFCCCB'
            possibleMovement.push(tile)
            return true

        }
    }

    return false
}


//#endregion Colors




//When the active tile changes
function switchTarget() {
    if (markedId != '9_9')
        document.getElementById(markedId).style.backgroundColor = 'transparent'
    possibleMovement.forEach(element => {
        document.getElementById(element.id).style.backgroundColor = 'transparent'
    })
    possibleMovement = []

}

