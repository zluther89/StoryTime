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

io.on("connection", (socket) => onConnect(socket, io));

app.use(express.static(path.join(__dirname, "./build")));

http.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Listening on port: ", PORT);
});
