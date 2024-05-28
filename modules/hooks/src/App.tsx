<<<<<<< HEAD
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Hooks Modules</h1>
    </>
=======
import React from 'react';
import { useInput } from 'chysis-use-input';
import './App.css';

function App() {
  const { value, onChange } = useInput('');

  return (
    <div>
      <h1>useInput Example</h1>
      <input type='text' value={value} onChange={onChange} />
      <p>Input value: {value}</p>
    </div>
>>>>>>> 8e426340fb6c49e064b03304b7106981b824301e
  );
}

export default App;
