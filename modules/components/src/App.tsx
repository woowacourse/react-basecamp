import React from "react";
// import Button from "./lib/Button";
import "./App.css";
import { Button } from "mawi-button";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <h1>Button Component Example</h1>
      {/* <Button label="Click me" onClick={handleClick} /> */}
      <Button label="mawi-button" onClick={handleClick} />
    </div>
  );
}

export default App;
