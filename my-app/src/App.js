import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import Form from "./form";

function App() {
  const [story, setStory] = useState("");
  const [animal, setAnimal] = useState("");
  // const [sentence, setSentence] = useState("");

  useEffect(() => {
    socket.on("story", (data) => {
      setStory(data);
    });

    socket.on("animal", (animal) => setAnimal(animal));
  });

  // const deleteStory = () => {
  //   socket.emit("deleteStory");
  // };

  // const postSentence = () => {
  //   socket.emit("addSentence", sentence);
  //   setSentence("");
  // };

  // const showStory = () => {
  //   socket.emit("showStory");
  // };

  return (
    <div>
      <div>
        <h1>Story Time!</h1>
        <h4>Make a story with your friends one sentence at a time</h4>
      </div>
      <div>{story}</div>
      <h2>This is an animal:{animal}</h2>
      <div>
        <Form />
      </div>
    </div>
  );
}

export default App;
