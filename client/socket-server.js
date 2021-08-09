var express = require('express')();
var server = require('http').Server(express);
var io = require('socket.io')(server, { origins: '*:*' });
const PORT = 9000

const users = {};

io.on('connection', (socket) => {

    socket.on('online', (data) => {
        if (!users[data]) {
            users[socket.id] = data;
            io.sockets.emit("online", users);
        }
    })

    socket.on('disconnect', () => {
        delete users[socket.id];
        io.sockets.emit("online", users);
    });

    socket.on('offline', (data) => {
        delete users[socket.id]
        io.sockets.emit("online", users);
    })

    socket.on('privateMsg', ({ msg, to }) => {
        console.log('sent')
        socket.to(to).emit("privateMsg", { msg, from: socket.id });
    })

});

server.listen(PORT, function () {

    console.log(`Socket-server listening at ${PORT}`);

});