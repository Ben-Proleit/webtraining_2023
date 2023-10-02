// #region prefunctions


//#region objects


const frontEndPlayers = {}//All players known to the client

const frontEndProjectiles = {}

KeyInputMap ={E68: false,E65: false,E87: false,E83: false,};

//#endregion objects

//#region constants

const socket = io()

//Create a Playing-area
const canvas = document.getElementById("MainCanvas");
const ctx = canvas.getContext("2d");

//Set Window dimensions
const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = innerWidth * devicePixelRatio
    canvas.height = innerHeight * devicePixelRatio

const frontEndPlayer = frontEndPlayers[socket.id];

//All the Inputs tracked, to be worked on
const playerInputs = []

//#endregion constants


//#region variables

let sequenceNumber = 0

//#endregion variables

//#endregion prefunctions


//#region functions

//#region eventlistener

//Gets the pressed Keys
onkeydown = onkeyup = function(e){
    // if(!frontEndPlayer[socket.id]) return
    e = e || event; // to deal with IE
    KeyInputMap['E'+ e.keyCode] = e.type == 'keydown';
}

//#endregion eventlistener


socket.on('connect', () =>{
    socket.emit('initCanvas', {width: canvas.width, height: canvas.height, devicePixelRatio})
})

//Update projectiles-functiuon
socket.on('updateProjectiles', (backEndProjectiles) => {
    for( const id in backEndProjectiles){
        const backEndProjectile = backEndProjectiles[id]
        // console.log( backEndProjectile)
        
        if (!frontEndProjectiles[id]){
            frontEndProjectiles[id] = new Projectile({
                                            x: backEndProjectile.x, 
                                            y: backEndProjectile.y,
                                            radius: 5, 
                                            color: frontEndPlayers[backEndProjectile.playerId]?.color,
                                            velocity: backEndProjectile.velocity   
                                        })
        }
        else {
            frontEndProjectiles[id].x += backEndProjectiles[id].velocity.x
            frontEndProjectiles[id].y += backEndProjectiles[id].velocity.y
        }
    }

    // deletes projectile if the server doesn't know it
    for( const id in frontEndProjectiles){
        
        if(!backEndProjectiles[id]){  
            delete frontEndProjectiles[id]
        }
    }

})

//Update players-function
socket.on('updatePlayers', (backEndPlayers) => {
    process()
    for( const id in backEndPlayers){
        const backEndPlayer = backEndPlayers[id]

        

        if(!frontEndPlayers[id]){   //adds unknown players
            frontEndPlayers[id] = new Player({
                  x:backEndPlayer.x
                , y:backEndPlayer.y
                , radius:10
                , color: backEndPlayer.color
                , username:('User: '+id)
                , sequenceNumber: backEndPlayer.sequenceNumber
            })
        }
        else {  //Known players

            frontEndPlayers[id].target = {
                x: backEndPlayer.x ,
                y: backEndPlayer.y
            }

            if (id === socket.id){  //Handle the client player
                // frontEndPlayers[id].sequenceNumber = backEndPlayers[id].sequenceNumber

                //Server reconciliation: Handle leftover inputs of the player
                const lastBackendInputIndex = playerInputs.findIndex(input =>{
                    return backEndPlayers[id].sequenceNumber === input.sequenceNumber
                })

                if(lastBackendInputIndex >= 0)
                    playerInputs.splice(0, lastBackendInputIndex + 1)
                    playerInputs.forEach(input => { //Predict all the 'so far' unhandled movenemts on the clientside
                        clientSidePrediction(input.KeyInputMap)
                    })
            }
        }
    }
    
    // deletes player if the server doesn't know it
    for( const id in frontEndPlayers){
        
        if(!backEndPlayers[id]){  
            delete frontEndPlayers[id]
        }
    }
    
    animate()
})

function process(){
    sequenceNumber++
    playerInputs.push({sequenceNumber, KeyInputMap})
    socket.emit('PlayerInput', {sequenceNumber, KeyInputMap} )
    clientSidePrediction(KeyInputMap)
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(const id in frontEndPlayers){   //Players
        const frontEndPlayer = frontEndPlayers[id]
        
        if(frontEndPlayer.target){
            //Linear interpolation
            frontEndPlayers[id].x += (frontEndPlayers[id].target.x - frontEndPlayers[id].x) * 0.5
            frontEndPlayers[id].y += (frontEndPlayers[id].target.y - frontEndPlayers[id].y) * 0.5
        }
        frontEndPlayer.draw()
    }
    for(const id in frontEndProjectiles){   //Projectiles
        const frontEndProjectile = frontEndProjectiles[id]
        frontEndProjectile.draw()
    }
}

function clientSidePrediction(keyInputs){
    const speed = 5;
        if(keyInputs.E68){frontEndPlayers[socket.id].target.x+=1*speed}
        if(keyInputs.E65){frontEndPlayers[socket.id].target.x-=1*speed}
        if(keyInputs.E87){frontEndPlayers[socket.id].target.y-=1*speed}
        if(keyInputs.E83){frontEndPlayers[socket.id].target.y+=1*speed}
        animate()
}

//#endregion functions