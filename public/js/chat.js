// Instance of Socket
const socket = io();
// Select elements
const sendButton = document.querySelector(".send-button");
const messageArea = document.querySelector("#messageArea");
const messageInput = document.querySelector("#messageInput");

// Add Message
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = message;
  messageArea.appendChild(messageDiv);
  messageArea.scrollTop = messageArea.scrollHeight;
}

// Display server messages
socket.on("messageFromServer", (message) => {
  //   console.log(message);
  addMessage(message, "server");
});

// send Message to the server
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("messageFromClient", message);
    addMessage(message, "client");
    messageInput.value = "";
  }
}

sendButton.addEventListener("click", sendMessage);
