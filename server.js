const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// serving the static files from the public folder
app.use(express.static(join(__dirname, "public")));

// serving the index.html
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Listen to connection from client
io.on("connection", (socket) => {
  console.log("A user is Connected");
  //   emit a message to the client
  socket.emit("messageFromServer", "Hello From the tharun's server");
  // Listen a message from the server
  socket.on("messageFromClient", (message) => {
    console.log("Message received from Client", message);
    // Broadcast the message to all the connected clients except the sender
    socket.broadcast.emit("messageFromServer", message);
  });
  // Acknowledgement
  //  send greeting with acknowledgement
  socket.emit("greeting", "Hey there! Welcome to the server", (response) => {
    console.log("The Client has received the message", response);
  });
});

// start the server
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost${PORT}`);
});
