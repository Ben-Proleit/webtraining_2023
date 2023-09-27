
var turn = 0
var gameState = [[0 ,0 ,0],[0, 0, 0],[0, 0, 0]]
var p1_victory = 0
var p2_victory = 0
var checking = false





function ButtonEnventhandler(pos){
    if(!checking){
        let row = pos[0]
        let col = pos[2]
        console.log(pos)
        if(gameState[col][row] == 0){
            let button = document.getElementById(pos)
            if(turn % 2 == 0){
                button.style.backgroundColor = '#3371FF'
                gameState[col][row] = 1
                checkOnVictory(1)
            }else{
                button.style.backgroundColor = '#DC1D1D'
                gameState[col][row] = -1
                checkOnVictory(-1)
            }
            turn++
        }
    }
    
}

function checkOnVictory(player){
    checking = true;
    let vic = false
    if(gameState[1][1] == player){
        if(gameState[0][0] == gameState[2][2] && gameState[0][0] == player){
            vic = true
            document.getElementById('0_0').style.backgroundColor = '#31DC1D'
            document.getElementById('1_1').style.backgroundColor = '#31DC1D'
            document.getElementById('2_2').style.backgroundColor = '#31DC1D'

             setTimeout(()=> {checking = false;
                reset()}, 2000)

        }else if(gameState[0][2] == gameState[2][0] && gameState[0][2] == player){
            vic = true
            document.getElementById('0_2').style.backgroundColor = '#31DC1D'
            document.getElementById('1_1').style.backgroundColor = '#31DC1D'
            document.getElementById('2_0').style.backgroundColor = '#31DC1D'
            
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }else if(gameState[0][1] == gameState[2][1] && gameState[2][1] == player){
            vic = true
            document.getElementById('1_0').style.backgroundColor = '#31DC1D'
            document.getElementById('1_1').style.backgroundColor = '#31DC1D'
            document.getElementById('1_2').style.backgroundColor = '#31DC1D'
            
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }else if(gameState[1][0] == gameState[1][2] && gameState[1][2] == player){
            vic = true
            document.getElementById('0_1').style.backgroundColor = '#31DC1D'
            document.getElementById('1_1').style.backgroundColor = '#31DC1D'
            document.getElementById('2_1').style.backgroundColor = '#31DC1D'
            
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }
    }else {
        if(gameState[0][0] == gameState[0][1] && gameState[0][2] == gameState[0][0] && gameState[0][1] == player){
            vic = true
            document.getElementById('0_0').style.backgroundColor = '#31DC1D'
            document.getElementById('1_0').style.backgroundColor = '#31DC1D'
            document.getElementById('2_0').style.backgroundColor = '#31DC1D'
                 
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }
        else if(gameState[0][0] == gameState[1][0] && gameState[2][0] == gameState[0][0] && gameState[0][0] == player){
            vic = true
            document.getElementById('0_0').style.backgroundColor = '#31DC1D'
            document.getElementById('0_1').style.backgroundColor = '#31DC1D'
            document.getElementById('0_2').style.backgroundColor = '#31DC1D'
            
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }
        else if(gameState[2][2] == gameState[2][1] && gameState[2][2] == gameState[2][0] && gameState[2][0] == player){
            vic = true
            document.getElementById('0_2').style.backgroundColor = '#31DC1D'
            document.getElementById('1_2').style.backgroundColor = '#31DC1D'
            document.getElementById('2_2').style.backgroundColor = '#31DC1D'
            
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }
        else if(gameState[2][2] == gameState[1][2] && gameState[2][2] == gameState[0][2] && gameState[2][2] == player){
            vic = true
            document.getElementById('2_0').style.backgroundColor = '#31DC1D'
            document.getElementById('2_1').style.backgroundColor = '#31DC1D'
            document.getElementById('2_2').style.backgroundColor = '#31DC1D'
            
             setTimeout(()=> {checking = false;
                            reset()}, 2000)
        }
    }
    if(vic){
        if(turn % 2 == 0){
            p1_victory++
            document.getElementById('player_1').innerText = p1_victory
        }else{
            p2_victory++
            document.getElementById('player_2').innerText = p1_victory
        }
    }else{
        checking = false
    }
}

function reset(){
    gameState = [[0 ,0 ,0],[0, 0, 0],[0, 0, 0]]
    var buttons = Array.from(document.getElementsByTagName('button'))
    buttons.forEach( element => element.style.backgroundColor ='#faebd7 ' )
    if(turn % 2 == 0){
        turn = 0
    }else{
        turn = 1
    }
}

