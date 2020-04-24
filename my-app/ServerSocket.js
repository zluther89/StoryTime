let axios = require("axios");
let i = 0;
let sentenceCount = 0;
let story = "";
let users = {};
let userKeys;
let picture = null;

const setPicture = (io) => {
  axios
    .get(
      "https://api.unsplash.com/photos/random?client_id=HX0FWjTsO1PH1Mv3FPaqHwtfDxaz2ac4aglxl-kY3T4"
    )
    .then((res) => {
      picture = res.data.urls.thumb;
      io.emit("picture", picture);
    });
};

let ticker = 0;
setInterval(() => {
  ticker += 1;
}, 1000);

module.exports.onConnect = (socket, io) => {
  setInterval(() => {
    io.emit("timer", ticker);
  }, 1000);

  const pushStory = () => {
    io.emit("story", story);
  };

  const enableStoryButton = () => {
    if (sentenceCount > 5) {
      io.emit("enableShowStory");
    }
  };

  const emitSentence = (sentence) => {
    i = (i + userKeys.length - 1) % userKeys.length;
    let userKey = userKeys[i];
    users[userKey].emit("recieveSentence", sentence);
  };

  const cleanSentence = (sentence) => {
    if (sentence === "") return;
    while (sentence[sentence.length - 1] === " ") {
      sentence = sentence.slice(0, sentence.length - 1);
    }
    if (
      sentence[sentence.length - 1] !== "." &&
      sentence[sentence.length - 1] !== "?" &&
      sentence[sentence.length - 1] !== "!"
    ) {
      sentence += ".";
    }
    return sentence;
  };

  console.log(socket.id);

  users[socket.id] = socket;

  userKeys = Object.keys(users);

  console.log("users", userKeys);

  socket.on("resetTimer", () => {
    ticker = 0;
  });

  socket.on("start game", () => {
    users[userKeys[0]].emit("recieveSentence", "Please start the story!");
    io.emit("start game");
    setPicture(io);
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
