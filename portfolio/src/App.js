import React from 'react';
import Typer from './components/Typer'
import './App.css';

function App() {
  let msgs = ["cd gamers","rm revolution_instructions.txt","nuke all"];
  return (
  <Typer heading={"Ethan-Desktop:~ efinlay$"} messages={msgs} />
  );
}

export default App;
