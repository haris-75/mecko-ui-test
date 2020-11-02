const http = require('http');
const app = require('./app');
const port = process.env.PORT || 9092;
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server);

io.on("connection", socket => {
    console.log("Connected");
    socket.on("UPDATE_STAGE", (data) => {
        console.log("Came in broadcast emit");
        socket.broadcast.emit("STAGE_UPDATED", {data})
    });
})
server.listen(port);