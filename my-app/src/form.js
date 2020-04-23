import React, { useState, useEffect } from "react";
import { socket } from "./socket";

const Form = (props) => {
  const [sentence, setSentence] = useState("");
  const [storyState, setStoryState] = useState(false);
  const [incSentence, setIncSent] = useState("");
  const [showStoryButton, setStoryButton] = useState(false);

  useEffect(() => {
    socket.on("start game", () => {
      setStoryState(true);
    });
    socket.on("recieveSentence", (sentence) => setIncSent(sentence));
    socket.on("enableShowStory", () => setStoryButton(true));
  });

  const startNewStory = () => {
    socket.emit("start game");
    socket.emit("deleteStory");
  };

  const postSentence = () => {
    socket.emit("addSentence", sentence);
    setSentence("");
  };

  const showStory = () => {
    socket.emit("showStory");
  };

  const startGame = () => {
    socket.emit("start game");
    socket.emit("deleteStory");
  };

  return (
    <div className="container">
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
        {/* <input
          name="sentence"
          value={sentence}
          className="input is-small"
          onChange={(e) => setSentence(e.target.value)}
        ></input> */}
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
      {/* {storyState === false ? (
        <button onClick={startGame}>Start the game</button>
      ) : null} */}
    </div>
  );
};

export default Form;
