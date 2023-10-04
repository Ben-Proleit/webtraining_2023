//#region vars

//#region serverini

const express = require('express')
const { stat } = require('fs')
const app = express()
// const { Socket } = require('engine.io')

//Socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {pingInterval: 2000, pingTimeout: 5000})

const port = 3000

//#endregion serverini

const backEndPlayers = {}
const backEndProjectiles = {}
const backEndStaticObjects = {}

let staticObjectsId = 0

let projectileId = 0

//#endregion vars


///GameCicle
setInterval(() =>{    
    updateProjectiles()
    io.emit('updatePlayers', backEndPlayers)
    io.emit('updateProjectiles', backEndProjectiles)
}, 15) 


//#region serverIni

app.use(express.static('public'))

server.listen(port, () => {
    console.log('Listen on Port: ' + port)
})

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/html/index.html')
})

//#endregion serverIni


//#region userIni

//Check if new User connects 
io.on('connection', (socket) =>{
    PLAYERRADIUS = 10
    console.log('a user connected')
    backEndPlayers[socket.id] = {
        x: 500 * Math.random() ,
        y: 500 * Math.random() ,
        color: `hsl(${360 * Math.random()}, 100%, 50%)` ,
        sequenceNumber: 0//set to check all inputs not handled so far
    }

    //socket for single client io for all
    io.emit('updatePlayers', backEndPlayers)

    socket.on('initCanvas', ({width, height, devicePixelRatio}) =>{
        backEndPlayers[socket.id].canvas ={
            width,
            height
        }
        
        backEndPlayers[socket.id].radius = devicePixelRatio * PLAYERRADIUS //Set player heiht


        //TODO may has to be moved after lvl implimentation
        socket.emit('initStaticObjects', backEndStaticObjects)
    })

    socket.on('fire', ({x, y, angle}) =>{
        projectileId++;

        const velocity = {

            x: Math.cos(angle) * 15 ,
            y: Math.sin(angle) * 15
        }

        backEndProjectiles[projectileId] = {
            x,
            y,
            velocity,
            playerId: socket.id
        }
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)
        delete backEndPlayers[socket.id]
        io.emit('updatePlayers', backEndPlayers)
    })

    //Authorative server movement
    socket.on('PlayerInput', ({sequenceNumber, KeyInputMap}) =>{
        if (!backEndPlayers[socket.id])
            return
        backEndPlayers[socket.id].sequenceNumber = sequenceNumber
        //TODO has to be called by the gameCycle
        const speed = 5;
        if(KeyInputMap.E68){backEndPlayers[socket.id].x+=1*speed}
        if(KeyInputMap.E65){backEndPlayers[socket.id].x-=1*speed}
        if(KeyInputMap.E87){backEndPlayers[socket.id].y-=1*speed}
        if(KeyInputMap.E83){backEndPlayers[socket.id].y+=1*speed}
    })
})

//#endregion userIni


//#region projectiles

function updateProjectiles(){
    for( const id in backEndProjectiles){
        if (!backEndProjectiles)
            continue
        updateProjectilePosition(id)
        hitdetection(id)
    }
}

function updateProjectilePosition(id){
    backEndProjectiles[id].x += backEndProjectiles[id].velocity.x
    backEndProjectiles[id].y += backEndProjectiles[id].velocity.y
    
    //TODO: has to be deleted, if it leafes the Arena, or hits not if it lefts the screen
    const PROJECTILERADIUS = 5
    if(backEndProjectiles[id].x -PROJECTILERADIUS >= backEndPlayers[backEndProjectiles[id].playerId]?.canvas?.width ||
        backEndProjectiles[id].x + PROJECTILERADIUS <= 0 ||
        backEndProjectiles[id].y -PROJECTILERADIUS >= backEndPlayers[backEndProjectiles[id].playerId]?.canvas?.height ||
        backEndProjectiles[id].y + PROJECTILERADIUS <= 0){
        if(backEndProjectiles[id])
            delete backEndProjectiles[id]
    }
}

function hitdetection(id){
    for (const playerId in backEndPlayers){
        const backEndPlayer = backEndPlayers[playerId]
        // console.log(backEndProjectiles[id].x)
        const DISTANCE = Math.hypot(
                                backEndProjectiles[id]?.x - backEndPlayer?.x, 
                                backEndProjectiles[id]?.y - backEndPlayer?.y)
        
        //TODO: backEndProjectiles[id].radius has to be added 
        if (DISTANCE <  5 + backEndPlayer.radius && 
            backEndProjectiles[id].playerId !== playerId){
            delete backEndProjectiles[id]
            delete backEndPlayers[playerId]
            console.log(DISTANCE)
            break
        }
    }
}

//#endregion projectiles


//#region staticBody

///Builds all the static objects for the level
function buildMapObjects(){
    createStatcObject({x:100,y:100,width:100,height:100,color:'green',class:'Tank'})
}

///Creates an static object
function createStatcObject(object){
    staticObjectsId++;
    backEndStaticObjects[staticObjectsId] = object//Object.create(Tank, {x:1,y:1,width:1,height:1,color:'green'})
    // backEndStaticObjects[staticObjectsId] = new 
}

///TODO Checks if someting collides with a static object
function collosionDetection(){

}

//#endregion staticBody


//#region ini

console.log('Server Loaded')

buildMapObjects()

//#endregion ini