class Player{
    constructor(){
        this.x = 140;
        this.y = 140;
        this.speed = 10;
    }
    
    move(x, y){
        this.x += x * this.speed;
        this.y += y * this.speed;
    }
}

let PLAYER = new Player();

function updateDisplay(player){
    let HTMLPlayer = document.getElementById("Player");
    HTMLPlayer.style.left = player.x;
    HTMLPlayer.style.top = player.y;
}


window.addEventListener("keydown", (event) =>{
    let x = 0, y = 0;
    if(event.key == "d"){x+=1}
    if(event.key == "a"){x-=1}
    if(event.key == "w"){y-=1}
    if(event.key == "s"){y+=1}
    PLAYER.move(x, y);
    updateDisplay(PLAYER);
})

function GameCycle(){

}