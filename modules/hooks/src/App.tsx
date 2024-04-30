import React from "react";
import "./App.css";
import { useInput } from 'maru-input-hooks';

function App() {
  const { value, onChange } = useInput("");

  return (
    <>
      <h1>useInput Example</h1>
      <input type="text" value={value} onChange={onChange} />
      <p>Input value: {value}</p>
    </>
  );
}

export default App;
