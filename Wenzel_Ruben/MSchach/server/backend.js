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

const matches = {
};

const backEndPlayers = {};
//#endregion ini

server.listen(environment.port, () => {
  console.log("Listen on Port: " + environment.port);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + environment.frontendFolder);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  setNewMatch()

  //Setup Lobby
  io.emit("transmitLobby", matches)

  // backEndPlayers[socket] = { socket };
  // let isMatched = false;
  //   for (let match in matches) {
  //     if (match.white == undefined) {
  //       match.white = backEndPlayers[socket];
  //       isMatched = true;
  //     } else if (match.black == undefined) {
  //       match.black = backEndPlayers[socket];
  //       isMatched = true;
  //     }
  //   }
  //   if (!isMatched) {
  // matches[socket] = {
  //   black: undefined,
  //   white: backEndPlayers[socket],
  //   field: field,
  //   gameId: undefined,
    // };
  // };

  //TODO Add matches, can_interact
  socket.on("click", ({ sender, frontEndField }) => {
    for (let id in matches) {
      if (
        matches[id].white == backEndPlayers[socket] ||
        matches[id].black == backEndPlayers[socket]
      ) {
        matches[id].field = frontEndField;
        const field = matches[id].field;
        console.log(sender);
        io.emit("update", { sender, field });
      }
    }
  });
});

var matchNum = 0;
function setNewMatch(){
  matches[0] = {
  black: 'p1',
  white: undefined,
  field: field,
  gameId: matchNum,
  // };
  };
  matchNum++;
}

console.log("Server Loaded");
