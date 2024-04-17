
import './App.css';
import React from 'react';
import Shortener from "./components/Shortener"

export default function App() {
  return (
    <div className="App">
      <h1>Thebify</h1>
      <h2>A url shortener by Timothy Hebert</h2>
      <Shortener/>
    </div>
  );
}


