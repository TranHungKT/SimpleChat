const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, "public")));

const botName = "CharCord Bot";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord"));

    //when a user connect, broadcast message to all client except the user connect
    socket.broadcast.emit(
      "message",
      formatMessage(botName, "A user has joined the chat")
    );
  });

  //Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });

  //Broadcast all client
  // io.emit()

  // Run when a client disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
