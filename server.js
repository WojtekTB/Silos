var express = require('express');

var port = 8080;
var app = express();
var server = app.listen(port);

app.use(express.static('public'));

console.log(`This server is running on port ${port}...`);

var socket = require('socket.io');


var io = socket(server);

var players = [];

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('newPlayer', (data) => {
        console.log(`New player with id: ${data.id}`);
        players.push(data);
    });

    socket.on("playerUpdate", (data) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                players[i] = data;
                return;
            }
        }
        players.push(data);//if didn't find player in list, assume it is a new player
        console.log(`Player with id ${data.id} tried to update but was not found in player list`);
    });

    socket.on("disconnectPlayer", (data) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                players.splice(i, 1);
                console.log(`User with id ${data.id} has been disconnected from the server and removed from the player list`);
                socket.broadcast.emit("removePlayer", { id: data.id });//tell other players to remove the player that disconnected
                return;
            }
        }
        console.log(`User with id ${data.id} tried to disconnect but there was no record of them ever being connected?`);
    });

    setInterval(() => {
        socket.broadcast.emit('playerList', { playerList: players });
    }, 1000);//60 times per second, as in per frame

});

