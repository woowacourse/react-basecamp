import React from 'react';
import './App.css';
import { Button } from '@largopie/button';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <h1>Component Modules</h1>
      <Button label='Click me' onClick={handleClick} />
    </>
  );
}

export default App;
