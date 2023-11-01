import Chat from "../../client/src/components/chat/Chat";

const app = require("express")();
const server = require("http").createServer(app);
const client = require("socket.io")(server);

client.on("connection", function (socket) {
  const chat = db.collection("chats");
  const sendStatus = function (s) {
    socket.emit("status", s);
  };

  socket.on("input", function (data) {
    let name = data.name;
    let message = data.message;
    if (name === "" || message === "") {
      sendStatus("Please enter name and message");
    } else {
      chat.insert({ name: name, message: message }, function () {
        Chat.find();
        client.broadcast.emit("output", [data]);
        sendStatus({
          message: "Message sent",
          clear: true,
        });
      });
    }
  });
  socket.on("clear", function () {
    socket.emit("Cleared");
  });
});
