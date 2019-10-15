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
  const [difficulty, setDifficulty] = useState(1)

  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');

  const PROXY = "https://cors-anywhere.herokuapp.com/";
  const API = "app.linkedin-reach.io/words";

  const reset = () => {
    setWord(words[Math.floor(Math.random()*words.length)]);
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGameState('intro');
  }

  useEffect(() => {
    fetch(PROXY+API+`?difficulty=${difficulty}&minLength=3&maxLength=10`)
      .then(res => res.text())
      .then(words => setWords(words.split(`\n`)))
  }, [words, difficulty]);

  useEffect(() => {
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random()*words.length)]);
    }
  }, [words]);

  const handleClick = e => {
    if (e.target.value === 'easy') {
      setDifficulty(1)
    } else if (e.target.value === 'medium') {
      setDifficulty(4)
    } else {
      setDifficulty(10)
    };
    console.log(difficulty)
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
