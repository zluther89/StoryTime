const app = require("express")();
const bodyParser = require("body-parser").json;
const PORT = process.env.PORT || 1337;
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("<h1>HEY JEFF,</h1>");
});

io.on("connection", (socket) => {
  console.log("NEW USER BITCH");
  testFunc(socket);
  socket.on("disconnect", () => {
    console.log("someone done left");
  });
});

// app.use(express.statoc(path.join(__dirname, " ../build")));

const testFunc = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("test", response);
};

http.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Listening on port: ", PORT);
});
