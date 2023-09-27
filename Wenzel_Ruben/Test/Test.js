
//#region Classes

// #region Player
class Player{
    constructor(){
        this.x = 800;
        this.y = 800;
        this.maxHP = 30;
        this.HP = this.maxHP;
    }
    
    move(x, y){
        this.x += x * PlayerSpeed;
        this.y += y * PlayerSpeed;
    }
}
//#endregion Player

//#endregion Classes


//#region Constants

const PlayerBulletSpeed = 5;

const PlayerSpeed = 4;

const EnemySpeed = 2;

//#endregion Constants


//#region Variables

let PLAYER = new Player();

//Array of diffrent ElementTypes, with the fitting HTML strings, and the JS-names

//All Element Types
const Elements = {
    Player: 'Player',
    Enemy: 'Enemy',
    PlayerBullet: 'PlayerBullet',
    EnemyBullet: 'EnemyBullet'
}

//Currently pressed Buttons
var map = {}; // You could also use an array

//The list of HTML-Objects of type Player-Bullets
let HTMLPlayerBulletList = document.getElementById(Elements.PlayerBullet + 'List').children;

//The list of HTML-Objects of type Enemy-Bullets
let HTMLEnemyBulletList = document.getElementById(Elements.EnemyBullet + 'List').children;

//The List of Enemy-Bullets of the Class Bullet
let EnemyBulletList = [];

//The list of HTML-Objects of type Enemy
let HTMLEnemyList = document.getElementById(Elements.Enemy + 'List').children;

//The List of Enemy of the Class Bullet
let EnemyList = [];

//Set to proof, if the player can shoot
let CanPlayerShoot = true;

//The current Round
let RoundCounter = 0;

//Checks of a round is going on
let IsRoundOver = true;

//How far the enemy drop before straving
let MaxEnemyMoveDistance = 20
let EnemyMoveDistance = MaxEnemyMoveDistance;


//How wide the enemys strave before droping
let EnemyStrave = false;
let EnemyDirection = false;

//#endregion Variables


//#region Events

///Get pressed keys
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map['E'+ e.keyCode] = e.type == 'keydown';
}

//#endregion Events


//#region Functions

//#region GameFunctions

///Onready-Funciton
function _ready(){
    window.setInterval(Process, 10);
}

///Gameloop
function Process(){
    if(IsRoundOver){StartNextRound();}
    MovePlayer();
    MoveEnemys();    //TODO
    MovePlayerBullets();
    MoveEnemyBullets();  //TODO
    UpdateUI();
}

//#endregion GameFunctions

//#region General Functions

///Creates an new object
function CreateObject(X, Y, type, ElementType){
    let newObject = document.createElement("div");
    newObject.classList.add(ElementType);
    document.getElementById(type + 'List').appendChild(newObject);
    newObject.style.top = Number(Y) - 20;
    newObject.style.left = Number(X) + 9;

}

function UpdateUI(){
    document.getElementById('Life').innerText = 'I'.repeat(PLAYER.HP);
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

//#endregion General Functions


//#region Player

/// Hnadles inputs of the player-movement
function MovePlayer(){
    // console.log(map);    
    let x = 0, y = 0;
    // Movement
    if(map.E68){x+=1}
    if(map.E65){x-=1}
    if(map.E87){y-=1}
    if(map.E83){y+=1}
    PLAYER.move(x, y);
    updatePlayerPorision(PLAYER);
    // Firing
    if(map.E32){
        Fire();
        // console.log(CanPlayerShoot);
    }
}

///Updates the position of the player
function updatePlayerPorision(player){
    //Player
    let HTMLPlayer = document.getElementById("Player");
    HTMLPlayer.style.left = player.x;
    HTMLPlayer.style.top = player.y;
}

///Fires Bullet
function Fire(){
    if(!CanPlayerShoot)
        return;
    CreateObject(PLAYER.x, PLAYER.y, Elements.PlayerBullet, 'Projectile');   
    //tests an timer to stop constant fireing 
    CanPlayerShoot = false;
    setTimeout(() => CanPlayerShoot = true, 200);
}

//#region PlayerBullets

///Moves all the HTML-Elements
function MovePlayerBullets(){    
    let counter = 0;
    Array.from(HTMLPlayerBulletList).forEach(Bullet => {
        if (Number((Bullet.style.top).replace('px', '')) < 0)
            Bullet.remove();
        // console.log(Bullet.style.top);
        Bullet.style.top = (Number((Bullet.style.top).replace('px', '')) - 10).toString() + 'px';
        // console.log((Number(Bullet.style.top)));
});
}

//#endregion PlayerBullets

//#endregion Player


//#region Enemy

//Spawns enemys
function SpawnEnemys(){
    for(let enemy = 0; enemy < 20; enemy++){
        CreateObject(getRandomInt(1600), 100, Elements.Enemy, 'Enemy');
    }
}

function MoveEnemys(){
    Array.from(HTMLEnemyList).forEach(enemy => {
        if(!EnemyStrave){
            enemy.style.top = (Number((enemy.style.top).replace('px', '')) + EnemySpeed).toString() + 'px';
            EnemyMoveDistance--;
            if(EnemyMoveDistance <= 0){
                EnemyStrave != EnemyStrave; //Swops movement from sode to down and reverse
                EnemyMoveDistance = MaxEnemyMoveDistance;
            }
        }
        else{
            if(EnemyDirection)  //Reverse strave distance
                enemyspeed = -EnemySpeed;
            enemy.style.left = (Number((enemy.style.left).replace('px', '')) + enemyspeed).toString() + 'px';
            EnemyMoveDistance--;
            if(EnemyMoveDistance <= 0){
                EnemyStrave != EnemyStrave; //Swops movement from sode to down and reverse
                EnemyDirection != EnemyDirection;
                EnemyMoveDistance = MaxEnemyMoveDistance;
            }
        }
        // console.log(Number((enemy.style.top).replace('px', '')));
        if (Number((enemy.style.top).replace('px', '')) > 900)
            enemy.remove();
    });

}

function EnemyDie(){
    
}

//#region EnemyBullets

function MoveEnemyBullets(){

}

//#endregion EnemyBullets

//#endregion Enemy


//#region Round

function StartNextRound(){
    RoundCounter++;
    document.getElementById('RoundCounter').innerText = 'You are in round: ' + RoundCounter;
    IsRoundOver = false;
    SpawnEnemys();
}



//#endregion Round

//#endregion Functions


///Start of the game
_ready();