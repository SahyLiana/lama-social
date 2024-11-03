const express = require("express");
// const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// // const io = require("socket.io")(8900, { cors: {} });

const app = express();
app.use(cors);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {},
});

let users = [];

const addUser = (userId, socketId) => {
  //array.some checks if any of the element satisfy the condition in the callback
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //When connect
  console.log("An user is connected.", socket.id);

  // io.emit("welcome", `hello this is socket server ${socket.id}`);
  io.emit("test", "Welcome message from socket" + socket.id);

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log(`The userId and socket id is`, userId, socket.id);
    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });

  //Remove disconnected user
  socket.on("disconnect", () => {
    console.log("Client disconnected");

    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  //Send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
});

const PORT = 3002;
server.listen(PORT, () => console.log("Server is listening on port 3002"));

// const io = require("socket.io")(3002, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   io.emit("test", "Test welcome");
// });
