const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')().listen(server);
app.get('/', (req, res) => {

    res.send('Chat Server is running on port 3000')
});

var userConnected = false;

io.on('connection', (socket) => {

    if (userConnected == false)
        console.log('user connected')
    userConnected = true;

    socket.on('join', function(userNickname) {

        console.log(userNickname + " : has joined the chat ");

        socket.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");
    });


    app.get("/startlogging", (req, res) => {
        socket.broadcast.emit('start_Logging', " Start Capturing the Logs ");
        res.send("Application has started capturing the logs");

    });
    app.get("/stoplogging", (req, res) => {
        socket.broadcast.emit('stop_Logging', " Stop Capturing the Logs ");
        res.send("Application has stopped capturing the logs");

    });

    socket.on('messagedetection', (senderNickname, messageContent) => {

        //log the message in console 

        console.log(senderNickname + " :" + messageContent)
            //create a message object 
        let message = { "message": messageContent, "senderNickname": senderNickname }
            // send the message to the client side  
        io.emit('message', message);

    });


    socket.on('disconnect', function() {
        console.log(' user has left ')
        socket.broadcast.emit("userdisconnect", " user has left ")
        userConnected = false;
    });



});




server.listen(3000, () => {

    console.log('Node app is running on port 3000');

});