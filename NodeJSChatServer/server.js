// var head = `<!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>MyLoggerServer</title>
//     <style>
//         .btn {
//             background-color: beige;
//             text-align: center;
//             font-size: 32px;
//             border: 2px solid black;
//         }
//     </style>
// </head>
// `;


// var body = ``;




// const express = require('express'),
//     http = require('http'),
//     app = express(),
//     path = require('path'),
//     server = http.createServer(app),
//     io = require('socket.io')().listen(server);


// // var bodyParser = require('body-parser');
// // const { json } = require('express');
// // // create application/json parser
// // var jsonParser = bodyParser.json()

// // // create application/x-www-form-urlencoded parser
// // var urlencodedParser = bodyParser.urlencoded({ extended: false })

// var connectedUsers = {};
// var usersCapturing = {};


// function generateBody() {

//     body += `<body>
//     `;

//     for (const [key, value] of Object.entries(connectedUsers)) {
//         console.log(`${key}: ${value}`);
//         var MessageValue = "startLogging";

//         var UIValue = "Start Logging";

//         if (usersCapturing[key] == true) {
//             MessageValue = "stopCapturing";
//             UIValue = "Stop Capturing";
//         }

//         body += `  

//         <form action="/" method="post">

//         <input type="text" name="userID" id="userID" value="${key}" hidden>
//                 <h1 type="text" myname=${key} value=${MessageValue}  > ${key} </h1>
//             <button  type="submit"  class="btn">${UIValue}</button>
//         </form>
//     `;
//     }

//     body += `</body></html>`;
// }

// app.post("/", (req, res) => {

//     // console.log(req.body.userID);
//     console.log(req.body);

//     // if (req.body.stopCapturing) {
//     //     io.to(connectedUsers[req.body.stopCapturing]).emit('stop_Logging', " Stop Capturing the Logs ");
//     //     usersCapturing[req.body.stopCapturing] = false;
//     //     generateBody();
//     //     res.send(head + body);
//     // } else if (req.body.startLogging) {
//     //     io.to(connectedUsers[req.body.startLogging]).emit('start_Logging', " Start Capturing the Logs ");
//     //     usersCapturing[req.body.startLogging] = true;
//     //     generateBody();
//     //     res.send(head + body);

//     // }

// });

// app.get('/', (req, res) => {

//     generateBody();
//     res.send(head + body);
//     // res.sendFile(path.join(__dirname + "/index.html"));
//     // res.send('Chat Server is running on port 3000')
// });

// var userConnected = false;

// io.on('connection', (socket) => {



//     if (userConnected == false)
//         console.log('user connected')
//     userConnected = true;

//     socket.on('join', function(userNickname) {

//         // if (connectedUsers[userNickname] == null) 
//         {
//             // connectedUsers.push(userNickname);
//             // connectedUsers[userNickname] = socket.id;
//             // usersCapturing[userNickname] = false;
//             // console.log(userNickname + " : has joined the chat ");

//             console.log(connectedUsers + " are joined");
//             // generateBody();
//             // res.send(head + body);

//             socket.broadcast.emit('userjoinedthechat', userNickname + " : has joined the chat ");

//         }
//         // else {
//         //     console.log(userNickname + "already connected");
//         // }

//     });


//     // app.get("/startlogging", (req, res) => {
//     //     res.sendFile(path.join(__dirname + "/stoplogging.html"));

//     //     io.to(connectedUsers["eeb5b26f1c9e27a5"]).emit('start_Logging', " Start Capturing the Logs ");
//     //     // socket.broadcast.emit('start_Logging', " Start Capturing the Logs ");
//     //     // res.send("Application has started capturing the logs");

//     // });
//     // app.get("/stoplogging", (req, res) => {
//     //     res.sendFile(path.join(__dirname + "/index.html"));
//     //     socket.broadcast.emit('stop_Logging', " Stop Capturing the Logs ");
//     //     // res.send("Application has stopped capturing the logs");

//     // });

//     socket.on('messagedetection', (senderNickname, messageContent) => {

//         //log the message in console 

//         console.log(senderNickname + " :" + messageContent)
//             //create a message object 
//         let message = { "message": messageContent, "senderNickname": senderNickname }
//             // send the message to the client side  
//         io.emit('message', message);

//     });


//     socket.on('disconnect', function() {
//         console.log(' user has left ')
//         socket.broadcast.emit("userdisconnect", socket.id + " user has left ")
//         userConnected = false;
//     });



// });




// server.listen(3000, () => {

//     console.log('Node app is running on port 3000');

// });



const express = require('express'),
    http = require('http'),
    app = express(),
    path = require('path'),
    server = http.createServer(app),
    io = require('socket.io')().listen(server);



app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + "/index.html"));
    // res.send('Chat Server is running on port 3000')
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
        res.sendFile(path.join(__dirname + "/stoplogging.html"));
        socket.broadcast.emit('start_Logging', " Start Capturing the Logs ");
        // res.send("Application has started capturing the logs");

    });
    app.get("/stoplogging", (req, res) => {
        res.sendFile(path.join(__dirname + "/index.html"));
        socket.broadcast.emit('stop_Logging', " Stop Capturing the Logs ");
        // res.send("Application has stopped capturing the logs");

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