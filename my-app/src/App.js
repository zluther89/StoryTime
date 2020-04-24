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
            <h1 className="title">Story Time!</h1>
            <h4>Make a story with your friends one sentence at a time</h4>
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
            <div>{story || "Once upon a time..."}</div>
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
