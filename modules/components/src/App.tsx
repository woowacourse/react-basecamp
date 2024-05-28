<<<<<<< HEAD
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Component Modules</h1>
    </>
=======
import React from 'react';
import './App.css';
import { Button } from '@chysis/alert-button';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Button Component Example</h1>
      <Button label='Click me!' onClick={handleClick} />
    </div>
>>>>>>> 8e426340fb6c49e064b03304b7106981b824301e
  );
}

export default App;
