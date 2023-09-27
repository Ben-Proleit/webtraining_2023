createButtons()
var counter = 0
var GameOver = false

function createButtons() {
    const fields = document.getElementsByClassName("Field")
    console.log(fields)

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

function ButtonClick(sender) {
    if (GameOver) return

    let button = document.getElementById(sender.target.id)
    if (button == null || button.children.length != 0)
        return;

    let newElement
    if (counter % 2 == 0)
        newElement = drawCircle()
    else
        newElement = drawSquare()


    button.appendChild(newElement)
    //CenterElement(newElement)

    if (checkWin(counter % 2)) {
        console.log("Player" + counter % 2 + " has won! ")
        GameOver = true
    }
    counter++
}

function drawCircle() {
    let circle = document.createElement("div")
    circle.style.border = "2px red solid"
    circle.style.background = "transparent"
    circle.style.borderWidth = "8px"
    circle.style.borderRadius = "50%"
    circle.style.width = "60%"
    circle.style.height = "60%"
    circle.style.margin = "10px"
    circle.className = "Player0"
    return circle
}

function drawSquare() {
    let square = document.createElement("div")
    square.style.border = "2px skyblue solid"
    square.style.background = "transparent"
    square.style.borderWidth = "8px"
    square.style.width = "60%"
    square.style.height = "60%"
    square.style.margin = "10px"
    square.className = "Player1"

    return square
}

function CenterElement(element) {
    // Get references to the parent and child elements
    var parent = element.parentNode
    console.log(parent)

    // Calculate the center position
    var centerX = (parent.clientWidth - element.clientWidth) / 2;
    var centerY = (parent.clientHeight - element.clientHeight) / 2;

    // Set the child's position to be centered
    element.style.left = centerX + "px";
    element.style.top = centerY + "px";
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

function resetGameEvent() {
    buttons = document.getElementsByClassName("FieldButton")

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = ""
    }
    counter = 0
    GameOver = false
}