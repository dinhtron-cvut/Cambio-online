const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const GameLogic = require("./game/gameLogic");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Serve static files (e.g., client-side HTML/JS)
app.use(express.static("public"));

// Game instance
const game = new GameLogic(["Player1", "Player2"]);

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  // Send initial game state to the player
  socket.emit("gameState", { players: game.players });

  // Handle player actions
  socket.on("playerAction", (data) => {
    const { action, targetIndex } = data;
    game.playerTurn(action, targetIndex);

    // Broadcast updated game state to all players
    io.emit("gameState", { players: game.players });
  });

  socket.on("disconnect", () => {
    console.log("A player disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
});