const app = require("express")();
const express = require("express");
const bodyParser = require("body-parser").json;
const PORT = process.env.PORT || 1337;
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const { onConnect } = require("./ServerSocket");

app.use(bodyParser());

app.get("/test", (req, res) => {
  res.send("<h1>HEY JEFF</h1>");
});

// let i = 0;
// let animals = ["dog", "cat", "penguin", "emu", "walrus", "elephant"];
// let story = "";
// let users = {};

io.on("connection", (socket) => onConnect(socket, io));

//Socket methods
// io.on("connection", (socket) => {
//   //login user
//   console.log(socket.id);
//   users[socket.id] = socket;
//   console.log("users", Object.keys(users));

//   //user add sentence
//   socket.on("addSentence", (sentence) => {
//     story += sentence;
//   });

//   //show story for all users
//   socket.on("showStory", pushStory);

//   //delete story
//   socket.on("deleteStory", () => {
//     story = "";
//     pushStory();
//   });

//   //just for fun
//   setInterval(() => pushAnimal(socket), 2000);
//   socket.on("disconnect", () => {
//     delete users[socket.id];
//     console.log("users after logout", Object.keys(users));
//   });
// });

// const pushStory = () => {
//   io.emit("story", story);
// };

// const pushAnimal = (socket) => {
//   i = (i + animals.length - 1) % animals.length;
//   let animal = animals[i];
//   socket.emit("animal", animal);
// };

app.use(express.static(path.join(__dirname, "./build")));

http.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Listening on port: ", PORT);
});
