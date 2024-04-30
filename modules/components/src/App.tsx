import './App.css';

import Button from './lib/Button';
import React from 'react';
import useInput from './lib/useInput';

function App() {
  const { value, onChange } = useInput('');

  return (
    <>
      <h1>Component Modules</h1>
      <h1>useInput Example</h1>
      <input type='text' value={value} onChange={onChange} />
      <p>Input value: {value}</p>
      <Button label='Click me' onClick={() => {}} />
    </>
  );
}

export default App;
