import React from 'react';
import { useInput } from '@largopie/use-input';
import './App.css';

function App() {
  const { value, onChange } = useInput('');

  return (
    <>
      <h1>Hooks Modules</h1>
      <input type='text' value={value} onChange={onChange} />
      <p>Input value: {value}</p>
    </>
  );
}

export default App;
