<<<<<<< HEAD
import React from 'react';
import './App.css';
import { Button } from '@chysis/alert-button';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
=======
import React from "react";
import { Button } from "vwh-test-button";
import "./App.css";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  };

  return (
    <div>
      <h1>Button Component Example</h1>
<<<<<<< HEAD
      <Button label='Click me!' onClick={handleClick} />
=======
      <Button label="Click me" onClick={handleClick} />
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
    </div>
  );
}

export default App;
