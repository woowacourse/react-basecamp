<<<<<<< HEAD
import React from 'react';
import { useInput } from 'chysis-use-input';
import './App.css';

function App() {
  const { value, onChange } = useInput('');
=======
import React from "react";
import { useInput } from "vwh-test-hooks";
import "./App.css";

function App() {
  const { value, onChange } = useInput("");
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f

  return (
    <div>
      <h1>useInput Example</h1>
<<<<<<< HEAD
      <input type='text' value={value} onChange={onChange} />
=======
      <input type="text" value={value} onChange={onChange} />
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
      <p>Input value: {value}</p>
    </div>
  );
}

export default App;
