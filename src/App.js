import React, { useState, useEffect } from 'react';
import Game from './Components/Game';
import Intro from './Components/Intro';
import Lost from './Components/Lost';
import Won from './Components/Won';
import './App.css';

function App() {
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [guess, setGuess] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [gameState, setGameState] = useState('intro');

  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');

  const PROXY = "https://cors-anywhere.herokuapp.com/";
  const API = "app.linkedin-reach.io/words";
  const PARAMETERS = "?minLength=3&maxLength=10";

  const reset = () => {
    setWord(words[Math.floor(Math.random()*words.length)]);
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGameState('intro');
  }

  useEffect(() => {
    fetch(PROXY+API+PARAMETERS)
      .then(res => res.text())
      .then(words => setWords(words.split(`\n`)))
  }, [words]);

  useEffect(() => {
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random()*words.length)]);
    }
  }, [words]);

  const handleClick = e => {
    console.log(e.target.value)
  }

  return (
    <div className="App">
      <h1>Ghoul Be Gone</h1>
      {gameState === 'intro' ? <Intro handleClick={handleClick} /> : null}
      {gameState === 'lost' ? <Lost reset={reset} /> : null}
      {gameState === 'won' ? <Won reset={reset} /> : null}
      {gameState === 'game' ? <Game
        setGameState={setGameState}
        word={word}
        setWord={setWord}
        guess={guess}
        setGuess={setGuess}
        incorrect={incorrect}
        setIncorrect={setIncorrect}
        correct={correct}
        setCorrect={setIncorrect}
        guessesLeft={guessesLeft}
        setGuessesLeft={setGuessesLeft} /> : null}
    </div>
  );
}

export default App;
