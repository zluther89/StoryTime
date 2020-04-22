import React, { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log("test");
    socket.on("test", (data) => {
      console.log("data", data);
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <h1>HELLO</h1>
      {response}
    </div>
  );
}

export default App;
