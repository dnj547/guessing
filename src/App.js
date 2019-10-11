import React, { useState, useEffect } from 'react';
import Blank from './Components/Blank';
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
  const blanks = word ? word.split("").map((letter, i) => {
    return <Blank letter={letter} key={i}/>
  }) : null
  return (
    <div className="App">
      Guesses Remaining: {guessesLeft}
      <br/>
      Word: {blanks}
    </div>
  );
}

export default App;
