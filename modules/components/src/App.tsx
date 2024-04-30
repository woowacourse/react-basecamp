import React from "react";
import { Button } from "chlwlstlf-simple-button";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <h1>Button Component Example</h1>
      <Button
        label="Click me"
        onClick={handleClick}
      />
    </div>
  );
}

export default App;
