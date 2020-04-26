import React, { useState, useEffect, useRef } from "react";
import { socket } from "./socket";

let timer;

const Form = (props) => {
  const [sentence, setSentence] = useState("");
  const [incSentence, setIncSent] = useState("");
  const [showStoryButton, setStoryButton] = useState(false);
  const [newStoryButton, setNewStoryButton] = useState(true);
  const [sentenceButton, setSentenceButton] = useState(false);

  const startNewStory = () => {
    socket.emit("disableNewStory");
    socket.emit("start game");
    socket.emit("deleteStory");
  };

  const startTimeout = () => {
    timer = setTimeout(() => {
      socket.emit("timeout");
    }, 30000);
  };

  const postSentence = (type) => {
    clearTimeout(timer);
    socket.emit("addSentence", sentence);
    setSentence("");
  };

  const showStory = () => {
    // socket.emit("start game");
    socket.emit("showStory");
    socket.emit("enableNewStory");
    socket.emit("disableShowStoryButton");
  };

  const clearSentence = () => {
    setIncSent("");
  };

  useEffect(() => {
    socket.on("disableNewStory", () => {
      setNewStoryButton(false);
    });
    socket.on("recieveSentence", (sentence) => {
      setIncSent(sentence);
      startTimeout();
    });
    socket.on("enableNewStory", () => {
      setNewStoryButton(true);
    });
    socket.on("clearSentence", clearSentence);
    socket.on("enableShowStory", () => setStoryButton(true));
    socket.on("disableShowStoryButton", () => setStoryButton(false));
    socket.on("disableSentenceButton", () => setSentenceButton(false));
    socket.on("enableSentenceButton", () => setSentenceButton(true));
  }, []);

  return (
    <div className="container">
      <div className="field">
        <label>{incSentence || "Please wait for a sentence"}</label>
        {incSentence ? (
          <input
            name="sentence"
            value={sentence}
            className="input is-small"
            placeholder="You have 20 seconds to add to the story!"
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
          {sentenceButton ? (
            <button className="button is-info" onClick={postSentence}>
              Submit Sentence
            </button>
          ) : null}
        </p>
      </div>
      <div className="buttons">
        {newStoryButton ? (
          <button className="button is-warning" onClick={startNewStory}>
            Start a new story
          </button>
        ) : null}
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
