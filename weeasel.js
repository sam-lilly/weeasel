const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})



io.on('connection', (socket) => {
    console.log("User Online")



  
    socket.on("canvas-data", (data, boardName) => {
        console.log(data)
       console.log(boardName)
        socket.broadcast.emit(boardName, data, boardName)
    })
})



mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send(" World"));



const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server is running on port ${port}`));


http.listen(port, () => {
    console.log("Started on :" + port)
})



