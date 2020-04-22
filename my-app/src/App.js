import React, { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {
  const [response, setResponse] = useState("");
  const [animal, setAnimal] = useState("");
  const [sentence, setSentence] = useState("");

  useEffect(() => {
    socket.on("test", (data) => {
      console.log("data", data);
      setResponse(data);
    });

    socket.on("animal", (animal) => setAnimal(animal));
  });

  const postSentence = () => {
    socket.emit("addSentence", sentence);
  };

  return (
    <div>
      <h1>HELLO</h1>
      {response}
      <h2>This is an animal:{animal}</h2>
      <input onChange={(e) => setSentence(e.target.value)}></input>
      <button onClick={postSentence}>Submit Sentence</button>
    </div>
  );
}

export default App;
