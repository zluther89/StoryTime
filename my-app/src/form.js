import React, { useState, useEffect } from "react";
import { socket } from "./socket";

const Form = (props) => {
  const [sentence, setSentence] = useState("");

  const deleteStory = () => {
    socket.emit("deleteStory");
  };

  const postSentence = () => {
    socket.emit("addSentence", sentence);
    setSentence("");
  };

  const showStory = () => {
    socket.emit("showStory");
  };

  return (
    <div>
      {" "}
      <input
        name="sentence"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      ></input>
      <button onClick={postSentence}>Submit Sentence</button>
      <button onClick={deleteStory}>Start a new story</button>
      <button onClick={showStory}>Show Story</button>
    </div>
  );
};

export default Form;
