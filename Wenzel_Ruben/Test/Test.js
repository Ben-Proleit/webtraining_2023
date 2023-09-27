class Player{
    constructor(){
        this.x = 600;
        this.y = 300;
        this.speed = 10;
    }
    
    move(x, y){
        this.x += x * this.speed;
        this.y += y * this.speed;
    }
}

let PLAYER = new Player();
let PlayerBulletList = document.getElementById("PlayerBulletList")

function updateDisplay(player){
    let HTMLPlayer = document.getElementById("Player");
    HTMLPlayer.style.left = player.x;
    HTMLPlayer.style.top = player.y;
}


// Input
window.addEventListener("keydown", (event) =>{
    let x = 0, y = 0;
    // Movement
    if(event.key == "d"){x+=1}
    if(event.key == "a"){x-=1}
    if(event.key == "w"){y-=1}
    if(event.key == "s"){y+=1}
    PLAYER.move(x, y);
    updateDisplay(PLAYER);
    // Firing
    if(event.key == " "){
        Fire();
    }

})

function Fire(){
    CreateObject(PLAYER.x, PLAYER.y, "PlayerBulletList");
    
}

function CreateObject(X, Y, Listtype){
    let newObject = document.createElement("div");
    let x = document.createElement("div");
    let y = document.createElement("div");
        x.innerText = X;    
        y.innerText = Y;
    newObject.appendChild(x);
    newObject.appendChild(y);
    document.getElementById(Listtype).appendChild(newObject);
    
}