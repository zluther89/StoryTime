import React, { useState, useEffect, useRef } from "react";
import { socket } from "./socket";

const Form = (props) => {
  const [sentence, setSentence] = useState("");
  const [incSentence, setIncSent] = useState("");
  const [showStoryButton, setStoryButton] = useState(false);
  const [newStoryButton, setNewStoryButton] = useState(true);
  const timerRef = useRef(false);

  const startNewStory = () => {
    socket.emit("start game");
    socket.emit("deleteStory");
  };

  const startTimeout = () => {
    timerRef.current = true;
    setTimeout(() => {
      console.log("in settimeout", timerRef.current);
      if (timerRef.current === true) {
        socket.emit("timeout");
      }
    }, 500000);
  };

  const postSentence = (type) => {
    timerRef.current = false;
    socket.emit("addSentence", sentence);
    setSentence("");
  };

  const showStory = () => {
    socket.emit("showStory");
  };

  const clearSentence = () => {
    setIncSent("");
  };

  useEffect(() => {
    socket.on("recieveSentence", (sentence) => {
      setIncSent(sentence);
      startTimeout();
    });
    socket.on("toggleStoryButton", setNewStoryButton(!newStoryButton));
    socket.on("clearSentence", clearSentence);
    socket.on("enableShowStory", () => setStoryButton(true));
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
            placeholder="You have 15 seconds to add to the story!"
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
        {newStoryButton ? null : (
          <button className="button is-warning" onClick={startNewStory}>
            Start a new story
          </button>
        )}
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
