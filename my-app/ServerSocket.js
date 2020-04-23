let i = 0;
let story = "";
let users = {};
let userKeys;

module.exports.onConnect = (socket, io) => {
  const pushStory = () => {
    io.emit("story", story);
  };

  const emitSentence = (sentence) => {
    i = (i + userKeys.length - 1) % userKeys.length;
    let userKey = userKeys[i];
    users[userKey].emit("recieveSentence", sentence);
  };

  console.log(socket.id);
  users[socket.id] = socket;
  userKeys = Object.keys(users);
  console.log("users", userKeys);

  socket.on("start game", () => {
    users[userKeys[0]].emit("recieveSentence", "Please start the story!");
    io.emit("start game");
  });
  //user add sentence
  socket.on("addSentence", (sentence) => {
    story += sentence;
    socket.emit("recieveSentence", "");
    emitSentence(sentence);
  });

  //show story for all users
  socket.on("showStory", pushStory);

  //delete story
  socket.on("deleteStory", () => {
    story = "";
    pushStory();
  });

  //user diconnects
  socket.on("disconnect", () => {
    delete users[socket.id];
    userKeys = Object.keys(users);
    console.log("users after logout", Object.keys(users));
  });
};
