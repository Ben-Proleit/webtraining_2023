//#region ini
const environment = require("./environments/environment");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: environment.pingInterval,
  pingTimeout: environment.pingTimeout,
});

app.use(express.static(environment.frontendFolder));

const field = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const matches = {};

const backEndPlayers = {};

server.listen(environment.port, () => {
  console.log("Listen on Port: " + environment.port);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + environment.frontendFolder);
});

//#endregion ini

io.on("connection", (socket) => {
  console.log("a user connected");
  // setNewMatch();
  //Setup Lobby
  // io.emit("transmitLobby", matches);

  //TODO: Socket joins a specific lobby
  socket.on("joinLobby", (id) => {
    console.log("User joined lobby " + id);
    if (matches[id].white == undefined) {
      matches[id].white = socket;
    } else if (matches[id].black == undefined) {
      matches[id].black = socket;
    }
    socket.emit("updateMatches", matches);
  });

  //TODO Add matches, can_interact
  socket.on("chessInput", ({ sender, frontEndField }) => {
    for (let id in matches) {
      if (
        matches[id].white == backEndPlayers[socket] ||
        matches[id].black == backEndPlayers[socket]
      ) {
        matches[id].field = frontEndField;
        const field = matches[id].field;
        console.log(sender);
        io.emit("update", sender);
      }
    }
  });

  //Creates new lobby if the socket chooses to
  socket.on("createNewLobby", () => {
    setNewMatch();
    console.log("A new match has been created.");
    io.emit("updateMatches", matches);
  });
});

var matchNum = 0;
function setNewMatch() {
  matches[matchNum] = {
    black: undefined,
    white: undefined,
    field: field,
    gameId: matchNum,
    // };
  };
  matchNum++;
}

console.log("Server Loaded");
