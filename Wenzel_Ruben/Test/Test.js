
//#region Classes

// #region Player
class Player{
    constructor(){
        this.x = 600;
        this.y = 300;
        this.speed = 10;
        this.HP = 100;
    }
    
    move(x, y){
        this.x += x * this.speed;
        this.y += y * this.speed;
    }
}
//#endregion Player

//#region Projectile

class Projectile{

    constructor(){
        this.x = PLAYER.x;
        this.y = PLAYER.y;
        this.speed = 10;
        this.listType = '';
    }

    move(y){
        this.y += y * this.speed;
    }
}

//#endregion Projectile

//#endregion Classes


//#region Constants


//#endregion Constants


//#region Variables

let PLAYER = new Player();

//Array of diffrent ElementTypes, with the fitting HTML strings, and the JS-names
const Elements = {
    Player: 'Player',
    Enemy: 'Enemy',
    PlayerBullet: 'PlayerBullet',
    EnemyBullet: 'EnemyBullet'
}

//The list of HTML-Objects of type Player-Bullets
let HTMLPlayerBulletList = document.getElementById(Elements.PlayerBullet + 'List');
//The List of Player-Bullets of the Class Bullet
let PlayerBulletList = [];

//The list of HTML-Objects of type Enemy-Bullets
let HTMLEnemyBulletList = document.getElementById(Elements.EnemyBullet + 'List');
//The List of Enemy-Bullets of the Class Bullet
let EnemyBulletList = [];

//The list of HTML-Objects of type Enemy
let HTMLEnemyList = document.getElementById(Elements.Enemy + 'List');
//The List of Enemy of the Class Bullet
let EnemyList = [];

//#endregion Variables


function Ititial(){
    window.setInterval(Gameloop, 200);
}

function Gameloop(){
    MoveElements();
}

function MoveElements(){
    // if (PlayerBulletList != null){
    //     let counter = 0;
    //     PlayerBulletList.forEach(Bullet => {
    //         let HTMLBullet = HTMLPlayerBulletList[counter];
    //         Bullet.move(HTMLBullet.)
    //     .style
    // });
    // }
}


function updateDisplay(player){
    //Player
    let HTMLPlayer = document.getElementById("Player");
    HTMLPlayer.style.left = player.x;
    HTMLPlayer.style.top = player.y;
}


/// Input
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
    CreateObject(PLAYER.x, PLAYER.y, Elements.PlayerBullet);
    
}

function CreateObject(X, Y, type){
    //Creates new HTML-Object 
    let newObject = document.createElement("div");
    let x = document.createElement("div");
    x.classList.add('x')
    let y = document.createElement("div");
    y.classList.add('y')
        x.innerText = X;    
        y.innerText = Y;
    newObject.appendChild(x);
    newObject.appendChild(y);
    document.getElementById(type + 'List').appendChild(newObject);
    //Creates new Class Element

}

///Start of the game
Ititial();