const { setPicture, cleanSentence, sendPic } = require("./helperFuncs");

let i = 0;
let sentenceCount = 0;
let story = "";
let users = {};
let userKeys;

module.exports.onConnect = (socket, io) => {
  //
  const pushStory = () => {
    io.emit("story", story);
    // io.emit("toggleStoryButton"); //CHANGED
  };

  const enableStoryButton = () => {
    if (sentenceCount >= 5) {
      io.emit("enableShowStory");
      // io.emit("toggleStoryButton");
    }
  };

  const emitSentence = (sentence) => {
    i = (i + userKeys.length - 1) % userKeys.length;
    let userKey = userKeys[i];
    users[userKey].emit("recieveSentence", sentence);
    users[userKey].emit("enableSentenceButton");
  };

  //adds users to user object
  users[socket.id] = socket;
  //establishes array of users
  userKeys = Object.keys(users);
  //sends pic to a user on login, if one exists
  sendPic(socket);
  io.emit("userCount", userKeys.length);
  //disable Show Story button
  socket.on("disableShowStoryButton", () => {
    io.emit("disableShowStoryButton");
  });

  //enable new story button
  socket.on("enableNewStory", () => {
    io.emit("enableNewStory");
  });

  //disable new story button
  socket.on("disableNewStory", () => {
    io.emit("disableNewStory");
  });
  //start game
  socket.on("start game", () => {
    users[userKeys[0]].emit("recieveSentence", "Please start the story!");
    users[userKeys[0]].emit("enableSentenceButton");
    io.emit("start game");
    io.emit("toggleStoryButton");
    setPicture(io);
  });

  //user add sentence
  socket.on("addSentence", (sentence) => {
    sentence = cleanSentence(sentence);
    if (sentence !== "") {
      story += sentence + " ";
      sentenceCount += 1;
    }
    socket.emit("clearSentence");
    socket.emit("disableSentenceButton");
    emitSentence(sentence);
    enableStoryButton();
  });

  //show story for all users
  socket.on("showStory", pushStory);

  //timer listener
  socket.on("timeout", () => {
    socket.emit("clearSentence");
    socket.emit("disableSentenceButton");
    emitSentence("Previous user timed out, Please add a sentence");
  });

  //delete story
  socket.on("deleteStory", () => {
    story = "";
    sentenceCount = 0;
    pushStory();
  });

  //user diconnects
  socket.on("disconnect", () => {
    let socketIDIndex = userKeys.indexOf(socket.id);
    delete users[socket.id];
    userKeys = Object.keys(users);
    io.emit("userCount", userKeys.length);
    if (socketIDIndex < i) {
      i -= 1;
    }
  });
};
