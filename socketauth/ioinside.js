// both web and mobile auth
const users = {};
function iofunc(io) {
  io.use((socket, next) => {
    // if if else
    const session = socket.request.session;
    if (session.authenticated == true) {
      io.sockets.sockets.forEach((socket) => {
        // If given socket id is exist in list of all sockets, kill it
        if (session.userid === users[socket.id]) {
          delete users[socket.id];
          socket.disconnect(true);
        }
      });
      users[socket.id] = session.userid;
      next();
    } else {
      console.log("Invalid user");
      delete users[socket.id];
      socket.disconnect(true);
    }
  });
}

module.exports = {
  iofunc: iofunc,
};
