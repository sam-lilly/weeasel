const path = require('path');
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const socket = require('socket.io')


const passport = require('passport');
const bodyParser = require('body-parser');

const users = require('./routes/api/user');
const drawingBoards = require('./routes/api/drawingBoards');


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}


app.use(passport.initialize());
require('./config/passport')(passport);



mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


app.get("/", (req, res) => res.send("Hiya World"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/drawingBoards", drawingBoards)

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

let people = 0
io.on('connection', (socket) => {
    console.log("User Online")
    people++

    console.log(people)
    io.sockets.emit("broadcast", { description: people + " weeasels connected" })


    socket.on("disconnect", function () {
        people--;
        socket.broadcast.emit("broadcast", { description: people + "clients connected!" })
    })


    socket.on("canvas-data", (data, boardName) => {
        console.log(data)
        console.log(boardName)
        io.sockets.emit(boardName, data, boardName)
    })

    socket.on("message", (data, username, boardId) => {
        console.log(data)
        console.log(boardId)
        console.log(username)
        // going to end up having chat id as well and emitting it
        io.sockets.emit("message", data, username, boardId)
    })
})

// http.listen(port, () => {
//     console.log("Started on :" + port)
// })








