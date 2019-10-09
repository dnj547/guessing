import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const API = "https://cors-anywhere.herokuapp.com/app.linkedin-reach.io/words";
  const [words, setWords] = useState();
  useEffect(() => {
    fetch(API)
      .then(res=>res.text())
      .then(words=>setWords(words))
  });
  console.log(words)
  return (
    <div className="App">
      Guessing
    </div>
  );
}

export default App;
