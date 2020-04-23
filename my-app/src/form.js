import React, { useState, useEffect } from "react";
import { socket } from "./socket";

const Form = (props) => {
  const [sentence, setSentence] = useState("");
  const [storyState, setStoryState] = useState(false);

  useEffect(() => {
    socket.on("start game", () => {
      setStoryState(true);
    });
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
        <label>Please Add your sentence</label>
        <input
          name="sentence"
          value={sentence}
          className="input is-small"
          onChange={(e) => setSentence(e.target.value)}
        ></input>
      </div>
      <div className="field">
        <p class="control">
          <button className="button is-primary" onClick={postSentence}>
            Submit Sentence
          </button>
        </p>
      </div>
      <div className="buttons">
        <button className="button is-primary" onClick={startNewStory}>
          Start a new story
        </button>
        <button className="button is-primary" onClick={showStory}>
          Show Story
        </button>
      </div>
      {/* {storyState === false ? (
        <button onClick={startGame}>Start the game</button>
      ) : null} */}
    </div>
  );
};

export default Form;
