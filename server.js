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

// start the server
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost${PORT}`);
});
