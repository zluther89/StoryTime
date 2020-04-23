import React, { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {
  const [story, setStory] = useState("");
  const [animal, setAnimal] = useState("");
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    socket.on("story", (data) => {
      console.log("data", data);
      setStory(data);
    });

    socket.on("animal", (animal) => setAnimal(animal));
  });

  const deleteStory = () => {
    socket.emit("deleteStory");
  };

  const postSentence = () => {
    console.log(formRef);
    socket.emit("addSentence", sentence);
    setSentence("");
  };

  const showStory = () => {
    socket.emit("showStory");
  };

  return (
    <div>
      <h1>Story Time!</h1>
      <div>{story}</div>
      <h2>This is an animal:{animal}</h2>
      <div>
        <input
          name="sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        ></input>
        <button onClick={postSentence}>Submit Sentence</button>
        <button onClick={deleteStory}>Start a new story</button>
        <button onClick={showStory}>Show Story</button>
      </div>
    </div>
  );
}

export default App;
