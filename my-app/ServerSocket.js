let i = 0;
let animals = ["dog", "cat", "penguin", "emu", "walrus", "elephant"];
let story = "";
let users = {};

module.exports.onConnect = (socket, io) => {
  const pushStory = () => {
    io.emit("story", story);
  };

  const pushAnimal = (socket) => {
    i = (i + animals.length - 1) % animals.length;
    let animal = animals[i];
    socket.emit("animal", animal);
  };

  console.log(socket.id);
  users[socket.id] = socket;
  console.log("users", Object.keys(users));

  //user add sentence
  socket.on("addSentence", (sentence) => {
    story += sentence;
  });

  //show story for all users
  socket.on("showStory", pushStory);

  //delete story
  socket.on("deleteStory", () => {
    story = "";
    pushStory();
  });

  //just for fun
  setInterval(() => pushAnimal(socket), 2000);

  //user diconnects
  socket.on("disconnect", () => {
    delete users[socket.id];
    console.log("users after logout", Object.keys(users));
  });
};
