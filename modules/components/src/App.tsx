<<<<<<< HEAD
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Component Modules</h1>
    </>
  );
=======
import React from 'react';
import { Button } from 'darr';
import './App.css';

function App() {
	const handleClick = () => {
		alert('Button clicked!');
	};

	return (
		<div>
			<h1>Button Component Example</h1>
			<Button label="Click me" onClick={handleClick} />
		</div>
	);
>>>>>>> ab2a35c930b5aa341371a697d61ee6315efbabed
}

export default App;
