function htmlEventHandler() {
    console.log("My HTML Event")
}

function DomEventHandler() {
    console.log("My DOM Event")
}

document.getElementById("DomEventHandler").onclick = DomEventHandler
document.getElementById("DomEventListener").addEventListener('click', DomEventHandler)
