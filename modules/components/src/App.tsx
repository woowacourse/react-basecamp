import React from "react";
import { Button } from 'react-basecamp-modules';
import "./App.css";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <>
      <h1>Component Modules</h1>
      <Button label="Click me" onClick={handleClick} />
    </>
  );
}

export default App;
