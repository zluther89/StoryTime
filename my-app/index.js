const app = require("express")();
const bodyParser = require("body-parser").json;
const PORT = process.env.PORT || 1337;
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

app.use(bodyParser());

app.get("/test", (req, res) => {
  res.send("<h1>HEY JEFF</h1>");
});

let i = 0;
let animals = ["dog", "cat", "penguin", "emu", "walrus", "elephant"];
let story = "";

//Socket methods
io.on("connection", (socket) => {
  socket.on("addSentence", (sentence) => {
    story += sentence;
    pushStory();
  });
  socket.on("deleteStory", () => {
    story = "";
    pushStory();
  });
  setInterval(() => testFunc(socket), 2000);
  setInterval(() => pushAnimal(socket), 2000);
  socket.on("disconnect", () => {});
});

const pushStory = () => {
  io.emit("story", story);
};

const pushAnimal = (socket) => {
  i = (i + animals.length - 1) % animals.length;
  let animal = animals[i];
  socket.emit("animal", animal);
};

const testFunc = (socket) => {
  const response = new Date();
  socket.emit("test", response);
};

// app.use(express.statoc(path.join(__dirname, " ../build")));
http.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("Listening on port: ", PORT);
});
