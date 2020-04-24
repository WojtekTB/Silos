var express = require('express');
var fs = require('fs');
var port = process.env.PORT || 3000;
var app = express();
var server = app.listen(port);

app.use(express.static('public'));

console.log(`This server is running on port ${port}...`);

var socket = require('socket.io');


var io = socket(server);

var players = [];
var chat = [];

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    fs.writeFile("users.txt", `A user joined at ${new Date()}`);

    socket.on('newPlayer', (data) => {
        console.log(`New player with id: ${data.id}`);
        players.push(data);
        socket.broadcast.emit("newMessage", { newMessage: `USER ${data.id} HAS JOINED THE GAME.`, id: `SYSTEM` });
    });

    socket.on("playerUpdate", (data) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                players[i] = data;
                return;
            }
        }
        // players.push(data);//if didn't find player in list, assume it is a new player
        console.log(`Player with id ${data.id} tried to update but was not found in player list`);
    });

    socket.on("disconnectPlayer", (data) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === data.id) {
                players.splice(i, 1);
                console.log(`User with id ${data.id} has been disconnected from the server and removed from the player list`);
                socket.broadcast.emit("removePlayer", { id: data.id });//tell other players to remove the player that disconnected
                socket.broadcast.emit("newMessage", { newMessage: `USER ${data.id} HAS LEFT THE GAME.`, id: `SYSTEM` });
                return;
            }
        }
        console.log(`User with id ${data.id} tried to disconnect but there was no record of them ever being connected?`);
    });

    socket.on("newMessage", (data) => {
        chat.push({ message: data.newMessage, id: data.id });
        socket.broadcast.emit("newMessage", { newMessage: data.newMessage, id: data.id });
    });

    setInterval(() => {
        socket.broadcast.emit('playerList', { playerList: players });
    }, 60 / 1000);//60 times per second, as in per frame
});

