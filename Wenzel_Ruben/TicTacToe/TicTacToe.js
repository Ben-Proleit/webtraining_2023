let GameArray = [
    [null, null, null]
  , [null, null, null]
  , [null, null, null]
  ]
let Column;
let Row;
let Player = 1;
let Player1Couter = 0;
let Player2Couter = 0;


function ClickButton(id){
    GetField(id);
    SetField(id);
}

function GetField(id){
    Row = Math.floor(id / 3);
    Column = id%3;
    // console.log(Row + '    ' + Column);
}

function SetField(id){
    //Wrong Imput
    if (GameArray[Row][Column] != null)
        return;

    GameArray[Row][Column] = Player;
    // console.log(GameArray[Row][Column] + '' + Player);
    if(Player == 1){        
        document.getElementById(id).style.backgroundColor =  'green';
    }
    else{
        document.getElementById(id).style.backgroundColor =  'red';
    }
    DebugOutput();
    CheckIfWon();
    SwopPlayer();
}

function CheckIfWon(){
    let WON = false;
    for(let i = 0; i <=2; i++){
        if (GameArray[i][0] == GameArray[i][1] && GameArray[i][0] == GameArray[i][2] && GameArray[i][0] == Player)
            WON = true;
        if (GameArray[0][i] == GameArray[1][i] && GameArray[0][i] == GameArray[2][i] && GameArray[0][i] == Player)
            WON = true;
    }
    if (GameArray[0][0] == GameArray[1][1] && GameArray[0][0] == GameArray[2][2] && GameArray[0][0]  == Player)
        WON = true;
    if (GameArray[0][2] == GameArray[1][1] && GameArray[0][2] == GameArray[2][0] && GameArray[0][2]  == Player)
        WON = true;

    if (WON){
        document.getElementById('Text').innerText = Player + ' has won the Game!';
        if(Player == 1)
            document.getElementById('Player1').innerText += 'I'
        else   
            document.getElementById('Player2').innerText += 'I'

        console.log(Player + ' has won the Game!');
        newGame();
    }
}

function SwopPlayer(){
    if (Player == 1)
        Player = 2;
    else   
        Player = 1;
}

function DebugOutput(){
    for(let x =0 ; x <=2;x++){
        console.log(GameArray[x][0] + ' ' + GameArray[x][1] + ' ' + GameArray[x][2] + ' ');
    }
}

function newGame(){
    for(let x =0 ; x <=2;x++){
        for(let y =0 ; y <=2;y++){
            GameArray[x][y] = null;
        } 
    }
    for(let x =0 ; x <=8;x++){
        document.getElementById(x).style.backgroundColor =  'white'
    }
    

}