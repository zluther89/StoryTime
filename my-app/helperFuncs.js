let axios = require("axios");

let picture = null;

module.exports = {
  setPicture: (io) => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?client_id=HX0FWjTsO1PH1Mv3FPaqHwtfDxaz2ac4aglxl-kY3T4"
      )
      .then((res) => {
        picture = res.data.urls.thumb;
        io.emit("picture", picture);
      });
  },

  cleanSentence: (sentence) => {
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
  },
};
