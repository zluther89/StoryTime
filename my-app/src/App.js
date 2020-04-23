import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import Form from "./form";

function App() {
  const [story, setStory] = useState("");
  const [animal, setAnimal] = useState("");
  const [incSentence, setIncSent] = useState("");

  useEffect(() => {
    socket.on("story", (data) => {
      setStory(data);
    });

    socket.on("animal", (animal) => setAnimal(animal));

    socket.on("recieveSentence", (sentence) => setIncSent(sentence));
  });

  return (
    <div className="columns">
      <div className="column is-one-fifth"></div>
      <div className="column">
        <div className="section">
          <h1 className="title">Story Time!</h1>
          <h4>Make a story with your friends one sentence at a time</h4>

          <div>{story}</div>
          <div>{incSentence || "Please wait for a sentence"}</div>
          <h2>This is an animal:{animal}</h2>
        </div>
        <div className="section">
          <Form />
        </div>
      </div>
      <div className="column is-one-fifth"></div>
    </div>
  );
}

export default App;
