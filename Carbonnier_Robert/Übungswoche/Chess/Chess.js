
var turn = 'w'
var field = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']]


var colorTileLight = '#A3'
var colorTileDark = '#D9D9D9'

var colorRed = '#C4736A'
var colorBlue = '#9AC7D6'



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
document.getElementById('turn').className = 'white'
//Rochade
var possibleRochadeRookL = '9_9'
var possibleRochadeRookR = '9_9'

//Rochade White
var kingMovedW = false
var rookLeftMovedW = false
var rookRightMovedW = false

//Rochade Black
var kingMovedB = false
var rookLeftMovedB = false
var rookRightMovedB = false


//Current position of the kings for checktests
var wKingPosition = '7_4'
var bKingPosition = '0_4'


var wKingCheck = false
var bKingCheck = false

var isTesting = false

//promote
var promotedPawn = '9_9'
var colorPromote = null
var onPromotion = false

//#region Setup

function createField() {
    let base = document.getElementById('base')

    let div
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            div = createSingleField(i + '_' + j)
            if (i % 2 == 0 && j % 2 == 0)
                div.style.backgroundColor = colorTileLight
            else if (i % 2 != 0 && j % 2 != 0)
                div.style.backgroundColor = colorTileLight
            else
                div.style.backgroundColor = colorTileDark

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
        assignImage(field[row][col], button)
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

function assignImage(content, button) {
    switch (content) {
        case 'K':
            button.innerHTML = '&#9812;'
            button.className = 'white'
            break
        case 'P':
            button.innerHTML = '&#9817;'
            button.className = 'white'
            break
        case 'R':
            button.innerHTML = '&#9814;'
            button.className = 'white'
            break
        case 'N':
            button.innerHTML = '&#9816;'
            button.className = 'white'
            break
        case 'Q':
            button.innerHTML = '&#9813;'
            button.className = 'white'
            break
        case 'B':
            button.innerHTML = '&#9815;'
            button.className = 'white'
            break

        case 'k':
            button.innerHTML = '&#9818;'
            button.className = 'black'
            break
        case 'p':
            button.innerHTML = '&#9823;'
            button.className = 'black'
            break
        case 'r':
            button.innerHTML = '&#9820;'
            button.className = 'black'
            break
        case 'n':
            button.innerHTML = '&#9822;'
            button.className = 'black'
            break
        case 'q':
            button.innerHTML = '&#9819;'
            button.className = 'black'
            break
        case 'b':
            button.innerHTML = '&#9821;'
            button.className = 'black'
            break
    }
}

//#endregion Setup




function ButtonClick(sender) {
    if (onPromotion) {
        return
    }
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

        if (destination == possibleRochadeRookL || destination == possibleRochadeRookR) {
            resolveRochade(destination == possibleRochadeRookL ? 'l' : 'r')
        } else {
            destination.innerHTML = origin.innerHTML

            //EnPassant
            checkEnpassant(destination, sender)

            field[row][column] = field[origin.id[0]][origin.id[2]]

            updateKingPosition(row, column)
            origin.className = ''

            turn == 'w' ? destination.className = 'white' : destination.className = 'black'
            origin.innerHTML = ''
            field[origin.id[0]][origin.id[2]] = 0


            if ((turn == 'w' ? destination.id[0] == 0 : destination.id[0] == 7) && field[destination.id[0]][destination.id[2]].toLowerCase() == 'p') {
                colorPromote = turn
                promote(destination.id[0], destination.id[2])
            }

        }
        updateRochade(origin.id[0], origin.id[2])

        //TODO Letzen Zug Anzeigen
        //lastMove.forEach(element => element.style.backgroundColor = '#109010')#

        switchTarget()
        markedId = '9_9'

        turnChange()

        checkCheck()
    }
    //New Target
    else {
        switchTarget()                                                                             //Clear all marked fields (not green)
        //Movement
        if (field[row][column] != 0 && (whiteTurnPiece(row, column) || blackTurnPiece(row, column))) {        //Upper Case letters are white pieces
            document.getElementById(sender.target.id).style.backgroundColor = colorBlue
            markedId = pos
            predictMovement(field[row][column], column, row, turn)
            checkifMovementPossible(row, column)
            if (field[row][column].toLocaleLowerCase() == 'k') {
                rochade()
            }

            colorPossibleMovement()

        }
    }
}

function checkEnpassant(destination, sender) {
    if (destination.id == possibleEnPassant.id) {
        enPassant = possibleEnPassant
        hitEnPassant = possibleHitEnPassant
    }
    else if (hitEnPassant != '9_9' && destination.id == hitEnPassant.id && field[sender.id[0]][sender.id[2]].toUpperCase() == 'P') {

        enPassant.innerHTML = ''
        field[enPassant.id[0]][enPassant.id[2]] = 0
    }
    else {
        enPassant = '9_9'
        hitEnPassant = '9_9'
        possibleEnPassant = '9_9'
        possibleHitEnPassant = '9_9'
    }
}

function checkCheck() {
    wKingCheck = isThreatened(wKingPosition[0], wKingPosition[2], 'w')
    bKingCheck = isThreatened(bKingPosition[0], bKingPosition[2], 'b')
    console.log(wKingCheck)
    if (wKingCheck) {
        document.getElementById(wKingPosition).style.backgroundColor = '#FC0'
    } else {
        document.getElementById(wKingPosition).style.backgroundColor = 'transparent'
    }
    if (bKingCheck) {
        document.getElementById(bKingPosition).style.backgroundColor = '#FC0'
    } else {
        document.getElementById(bKingPosition).style.backgroundColor = 'transparent'
    }
}

function updateKingPosition(row, column) {
    if (field[row][column] == 'k') {
        bKingPosition = row + '_' + column
        kingMovedB = true
    } else if (field[row][column] == 'K') {
        wKingPosition = row + '_' + column
        kingMovedW = true
    }
}

function checkonMate() {
    field.forEach(row => {
        for (let i = 0; i < row.length; i++) {

        }
    })
}
function turnChange() {
    turn = (turn == 'w' ? 'b' : 'w')
    document.getElementById('turn').className = (turn == 'w' ? 'white' : 'black')
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
            tile.style.backgroundColor = colorBlue
        else if (blackTurnPiece(tile.id[0], tile.id[2]) || whiteTurnPiece(tile.id[0], tile.id[2]))
            tile.style.backgroundColor = colorBlue
        else
            tile.style.backgroundColor = colorRed
    })
}


//#endregion Helper


function updateRochade(row, column) {
    if (turn == 'w') {
        if (row == 7 && column == 0)
            rookLeftMovedW = true
        if (row == 7 && column == 7)
            rookRightMovedW = true
    } else {
        if (row == 0 && column == 0)
            rookLeftMovedB = true
        if (row == 0 && column == 7)
            rookRightMovedB = true
    }
}

function promote(row, column) {
    onPromotion = true
    document.getElementById('promote-dialog').style.display = 'flex'
    promotedPawn = document.getElementById(row + '_' + column)
}

function switchPiece(sender) {

    field[promotedPawn.id[0]][promotedPawn.id[2]] = (colorPromote == 'w' ? sender.id.toUpperCase() : sender.id.toLowerCase())
    promotedPawn.innerHTML = sender.innerHTML
    document.getElementById('promote-dialog').style.display = 'none'
    onPromotion = false
    checkCheck()
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

function checkifMovementPossible(rowFrom, columnFrom) {
    if (field[rowFrom][columnFrom].toLocaleLowerCase() == 'k')
        return
    let tmpCheckPossibleMovement = []
    possibleMovement.forEach(target => {
        if (!afterMovementOwnKingInCheck(target.id[0], target.id[2], rowFrom, columnFrom, isWhite(rowFrom, columnFrom) ? 'w' : 'b'))
            tmpCheckPossibleMovement.push(target)
    })
    possibleMovement = tmpCheckPossibleMovement
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

    // if (!kingMovedB && !rookLeftMovedB && 1 == 1)

}

function rochade() {
    if (turn == 'w') {
        if (field[7][0] == 'R' && !kingMovedW && !rookLeftMovedW && field[7][2] == 0 && field[7][3] == 0 && field[7][1] == 0 && !isThreatened(7, 2, 'w') && !isThreatened(7, 3, 'w')) {
            possibleMovement.push(document.getElementById('7_0'))
            possibleRochadeRookL = document.getElementById('7_0')
        }
        if (field[7][7] == 'R' && !kingMovedW && !rookRightMovedW && field[7][5] == 0 && field[7][6] == 0 && !isThreatened(7, 5, 'w') && !isThreatened(7, 6, 'w')) {
            possibleMovement.push(document.getElementById('7_7'))
            possibleRochadeRookR = document.getElementById('7_7')
        }
    } else {
        if (field[0][0] == 'r' && !kingMovedB && !rookLeftMovedB && field[0][2] == 0 && field[0][3] == 0 && field[0][1] == 0 && !isThreatened(0, 2, 'b') && !isThreatened(0, 3, 'b')) {
            possibleMovement.push(document.getElementById('0_0'))
            possibleRochadeRookL = document.getElementById('0_0')
        }
        if (field[0][7] == 'r' && !kingMovedB && !rookRightMovedB && field[0][5] == 0 && field[0][6] == 0 && !isThreatened(0, 5, 'b') && !isThreatened(0, 6, 'b')) {
            possibleMovement.push(document.getElementById('0_7'))
            possibleRochadeRookR = document.getElementById('0_7')
        }
    }
}

function resolveRochade(direction) {
    let row = turn == 'w' ? '7' : '0'
    let rookFrom = document.getElementById(direction == 'l' ? row + '_0' : row + '_7')
    let rookTo = document.getElementById(direction == 'l' ? row + '_3' : row + '_5')
    let kingFrom = document.getElementById(row + '_4')
    let kingTo = document.getElementById(direction == 'l' ? row + '_2' : row + '_6')

    rookTo.innerHTML = rookFrom.innerHTML
    rookTo.className = rookFrom.className
    kingTo.innerHTML = kingFrom.innerHTML
    kingTo.className = kingFrom.className

    rookFrom.innerHTML = ''
    rookFrom.className = ''
    kingFrom.innerHTML = ''
    kingFrom.innerHTML = ''

    field[rookFrom.id[0]][rookFrom.id[2]] = 0
    field[rookTo.id[0]][rookTo.id[2]] = turn == 'w' ? 'R' : 'r'
    field[kingFrom.id[0]][kingFrom.id[2]] = 0
    field[kingTo.id[0]][kingTo.id[2]] = turn == 'w' ? 'K' : 'k'

    updateKingPosition(kingTo.id[0], kingTo.id[2])

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
        if (field[rowTo][columnTo] == 0) {
            let tile = document.getElementById(rowTo + '_' + columnTo)
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
        if (field[rowTo][columnTo] == 0)
            return false
        if (takeable(rowTo, columnTo, color)) {
            let tile = document.getElementById(rowTo + '_' + columnTo)
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

            if (document.getElementById(rowTo + '_' + columnTo).id != hitEnPassant.id) {
                return false
            }
            let tile = document.getElementById(rowTo + '_' + columnTo)
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

