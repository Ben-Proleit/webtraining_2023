var counter = 0
var GameOver = false
var colorPlayer1 = "red"
var colorPlayer2 = "skyblue"
var resultPlayer1 = 0
var resultPlayer2 = 0
var startingPlayer = 1
var currentPlayer = startingPlayer

createButtons()
assignResult()
SetInfoText("Its your turn player 1", colorPlayer1)
SetPlayerColors()

//#region Design
function drawCircle() {
    let circle = document.createElement("div")
    circle.style.border = "2px " + colorPlayer1 + " solid"
    circle.style.background = "transparent"
    circle.style.borderWidth = "8px"
    circle.style.borderRadius = "50%"
    circle.style.width = "60%"
    circle.style.height = "60%"
    circle.style.margin = "10px"
    circle.className = "Player1"
    return circle
}

function drawSquare() {
    let square = document.createElement("div")
    square.style.border = "2px " + colorPlayer2 + " solid"
    square.style.background = "transparent"
    square.style.borderWidth = "8px"
    square.style.width = "60%"
    square.style.height = "60%"
    square.style.margin = "10px"
    square.className = "Player2"

    return square
}

function SetPlayerColors() {
    let res1 = document.getElementById("Result1")
    res1.style.color = colorPlayer1
    let res2 = document.getElementById("Result2")
    res2.style.color = colorPlayer2
}

function createButtons() {
    const fields = document.getElementsByClassName("Field")

    for (let i = 0; i < fields.length; i++) {
        let currentButton
        if (i % 2 == 0)
            currentButton = createButton('#fc7')
        else
            currentButton = createButton('#474747')

        currentButton.id = i
        fields[i].appendChild(currentButton)
    }

}

function createButton(colorBackground) {
    let button = document.createElement("button")
    button.style.backgroundColor = colorBackground
    button.style.padding = "20px"
    button.className = "FieldButton"
    button.onclick = ButtonClick
    return button
}

function DrawSymbol(button) {


    let newElement
    if (counter % 2 == startingPlayer - 1)
        newElement = drawCircle()
    else
        newElement = drawSquare()


    button.appendChild(newElement)
}
//#endregion Design

//#region Gamelogic
function ButtonClick(sender) {
    if (GameOver) return
    let button = document.getElementById(sender.target.id)
    if (button == null || button.children.length != 0)
        return;
    DrawSymbol(button)

    let textcolor = currentPlayer == 1 ? colorPlayer1 : colorPlayer2

    if (checkWin(currentPlayer)) {
        console.log("Player" + currentPlayer + " won! ")
        SetInfoText("Congrats! Player " + currentPlayer + " won! ", textcolor)
        if (currentPlayer == 1)
            resultPlayer1++
        else
            resultPlayer2++

        assignResult()
        GameOver = true
        return
    }


    currentPlayer = (currentPlayer % 2) + 1
    textcolor = currentPlayer == 1 ? colorPlayer1 : colorPlayer2
    SetInfoText("Its your turn player " + currentPlayer, textcolor)

    counter++
    if (counter >= 9) {
        SetInfoText("It's a draw ", "gray")
        GameOver = true
    }

}


function checkWin(playerNumber) {
    playerHistory = document.getElementsByClassName("Player" + playerNumber)

    if (playerHistory.length <= 2)
        return false

    let numberArray = []
    for (let i = 0; i < playerHistory.length; i++) {
        numberArray.push(playerHistory[i].parentNode.id)
    }

    // Column
    for (let i = 0; i <= 2; i++) {
        if (numberArray.includes(i.toString()) && numberArray.includes((i + 3).toString()) && numberArray.includes((i + 6).toString()))
            return true
    }

    //Row   
    for (let i = 0; i <= 6; i += 3) {
        if (numberArray.includes(i.toString()) && numberArray.includes((i + 1).toString()) && numberArray.includes((i + 2).toString()))
            return true
    }

    //Diagonal upper left to lower right
    if (numberArray.includes("0") && numberArray.includes("4") && numberArray.includes("8"))
        return true

    //Diagonal upper right to lower left
    if (numberArray.includes("2") && numberArray.includes("4") && numberArray.includes("6"))
        return true

    return false
}

function SetInfoText(text, color = "green") {
    let wininngText = document.getElementById("InfoText")
    wininngText.innerText = text
    wininngText.style.color = color
}

function resetGameEvent() {
    //Reset Game Elements
    buttons = document.getElementsByClassName("FieldButton")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = ""
    }
    counter = 0
    GameOver = false
    //Change starting Player
    startingPlayer = (startingPlayer % 2) + 1
    currentPlayer = startingPlayer
    let color = currentPlayer == 1 ? colorPlayer1 : colorPlayer2
    SetInfoText("Its your turn player " + currentPlayer, color)
}

function assignResult() {
    let res1 = document.getElementById("Result1")
    res1.innerText = resultPlayer1
    let res2 = document.getElementById("Result2")
    res2.innerText = resultPlayer2
}
//#endregion Gamelogic
