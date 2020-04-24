const { setPicture, cleanSentence } = require("./helperFuncs");

let i = 0;
let sentenceCount = 0;
let story = "";
let users = {};
let userKeys;

module.exports.onConnect = (socket, io) => {
  //
  const pushStory = () => {
    io.emit("story", story);
  };

  const enableStoryButton = () => {
    if (sentenceCount >= 5) {
      io.emit("enableShowStory");
    }
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
    // setPicture(io);
  });

  //user add sentence
  socket.on("addSentence", (sentence) => {
    sentence = cleanSentence(sentence);
    if (sentence !== "") {
      story += sentence + " ";
      sentenceCount += 1;
    }
    if (sentence === "") {
      sentence = "please enter a sentence";
    }
    socket.emit("clearSentence");
    emitSentence(sentence);
    enableStoryButton();
  });

  //show story for all users
  socket.on("showStory", pushStory);

  //timer listener
  socket.on("timeout", () => {
    console.log("timeout");
    socket.emit("clearSentence");
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
    //need to redefine i on disconnect
    delete users[socket.id];
    userKeys = Object.keys(users);
    console.log("users after logout", Object.keys(users));
  });
};
