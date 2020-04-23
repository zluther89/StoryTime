let i = 0;
let sentenceCount = 0;
let story = "";
let users = {};
let userKeys;

module.exports.onConnect = (socket, io) => {
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
    while (sentence[sentence.length - 1] === " ") {
      sentence = sentence.slice(0, sentence.length - 1);
    }
    console.log(sentence[sentence.length - 1] === ".");
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

  socket.on("start game", () => {
    users[userKeys[0]].emit("recieveSentence", "Please start the story!");
    io.emit("start game");
  });

  //user add sentence
  socket.on("addSentence", (sentence) => {
    sentence = cleanSentence(sentence);
    story += sentence + " ";
    socket.emit("recieveSentence", "");
    sentenceCount += 1;
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
    delete users[socket.id];
    userKeys = Object.keys(users);
    console.log("users after logout", Object.keys(users));
  });
};
