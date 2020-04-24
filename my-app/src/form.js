import React, { useState, useEffect } from "react";
import { socket } from "./socket";

const Form = (props) => {
  const [sentence, setSentence] = useState("");
  const [incSentence, setIncSent] = useState("");
  const [showStoryButton, setStoryButton] = useState(false);
  const [timer, setTime] = useState(0);

  const startNewStory = () => {
    socket.emit("start game");
    socket.emit("deleteStory");
    resetTimer();
  };

  const postSentence = (type) => {
    if (type === "timeout") {
      socket.emit("addSentence", "");
      setSentence("");
      return;
    }
    socket.emit("addSentence", sentence);
    setSentence("");
  };

  const showStory = () => {
    socket.emit("showStory");
  };

  const clearSentence = () => {
    setIncSent("");
  };

  const resetTimer = () => {
    socket.emit("resetTimer");
  };

  useEffect(() => {
    console.log(timer < 15);
    socket.on("recieveSentence", (sentence) => {
      resetTimer();
      setIncSent(sentence);
    });
    socket.on("clearSentence", clearSentence);
    socket.on("enableShowStory", () => setStoryButton(true));
    socket.on("timer", (time) => {
      setTime(time);
    });
  });

  return (
    <div className="container">
      timer={timer}
      <div className="field">
        <label>{incSentence || "Please wait for a sentence"}</label>
        {incSentence ? (
          <input
            name="sentence"
            value={sentence}
            className="input is-small"
            onChange={(e) => setSentence(e.target.value)}
          ></input>
        ) : (
          <input
            name="sentence"
            value={sentence}
            className="input is-small"
            onChange={(e) => setSentence(e.target.value)}
            disabled
          ></input>
        )}
      </div>
      <div className="field">
        <p class="control">
          <button className="button is-info" onClick={postSentence}>
            Submit Sentence
          </button>
        </p>
      </div>
      <div className="buttons">
        <button className="button is-warning" onClick={startNewStory}>
          Start a new story
        </button>
        {showStoryButton === true ? (
          <button className="button is-success" onClick={showStory}>
            Show Story
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
