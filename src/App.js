import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const PROXY = "https://cors-anywhere.herokuapp.com/";
  const API = "app.linkedin-reach.io/words";
  const PARAMETERS = "?minLength=3&maxLength=10"
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(6);
  useEffect(() => {
    fetch(PROXY+API+PARAMETERS)
      .then(res => res.text())
      .then(words => setWords(words.split(`\n`)))
  }, [])
  useEffect(() => {
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random()*words.length)])
    }
  }, [words])
  return (
    <div className="App">
      Guesses Remaining: {guessesLeft}
    </div>
  );
}

export default App;
