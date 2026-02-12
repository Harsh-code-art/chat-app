const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
    // credentials: true,
  },
});
const getReciverSocketId = (receverId)=>{
  return userSocketMap[receverId];
}
const userSocketMap = {};
io.on('connection',(socket)=>{
  const userId = socket.handshake.query.userId;
  if(userId !== undefined) userSocketMap[userId] = socket.id;
  io.emit("getonlineusers",Object.keys(userSocketMap))
  socket.on("disconnect",()=>{
    delete userSocketMap[userId],
    io.emit("getOn",Object.keys(userSocketMap))
  })
})

module.exports = {app,io,server,getReciverSocketId}

