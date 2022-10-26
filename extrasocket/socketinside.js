function socketfunct(socket) {
  socket.on("message", (message) => {
    console.log(message.message);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected: socket" + socket.id);
  });
}

module.exports = {
  socketfunct: socketfunct,
};
