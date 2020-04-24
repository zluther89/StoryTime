import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import Form from "./form";

function App() {
  const [story, setStory] = useState("");
  const [pictureUrl, setPicture] = useState("");

  useEffect(() => {
    socket.on("story", (data) => {
      setStory(data);
    });

    socket.on("picture", (data) => {
      setPicture(data);
    });
  });

  return (
    <div>
      <div className="columns">
        <div className="column is-centered">
          <section className="hero is-primary has-text-centered">
            <h1 className="title is-1">Story Time!</h1>
            <h2 className="subtitle is-2">
              Make a story with your friends one sentence at a time
            </h2>
            <h4 class="subtitle is-4">
              Start a new story and use the random picture for inspiration!
            </h4>
          </section>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-fifth"></div>
        <div className="column">
          <div className="columns">
            <div className="column"></div>
            <div className="column container">
              <img src={pictureUrl} className="is-centered" />
            </div>
            <div className="column"></div>
          </div>
          <div className="section">
            <div>{story || "The Story is being created..."}</div>
          </div>
          <div className="section">
            <Form />
          </div>
        </div>
        <div className="column is-one-fifth"></div>
      </div>
    </div>
  );
}

export default App;
