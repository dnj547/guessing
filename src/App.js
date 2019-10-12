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
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [guess, setGuess] = useState('');
  const [gameState, setGameState] = useState('playing')
  useEffect(() => {
    fetch(PROXY+API+PARAMETERS)
      .then(res => res.text())
      .then(words => setWords(words.split(`\n`)))
  }, []);
  useEffect(() => {
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random()*words.length)]);
    }
  }, [words]);
  const blanks = word ? word.split("").map((letter, i) => {
    return <Blank letter={letter} key={i} guessed={correct.includes(letter) ? true : false} />
  }) : null;
  const handleChange = e => {
    setGuess(e.target.value)
  }
  const validGuess = guess => {
    if (guess === "" || !guess.match(/[a-z]/i) || guess.split("").length !== 1) {
      console.log("You must enter a letter")
      return false
    } else if (incorrect.includes(guess) || correct.includes(guess)) {
      console.log("You have already guessed that letter")
      return false
    } else {
      return true
    }
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (validGuess(guess)) {
      if (word.split("").includes(guess)) {
        console.log("correct", guess, word);
        setCorrect([...correct, guess]);
        if (word.split("").every(letter=>[...correct, guess].includes(letter))) {
          setGameState('won')
        }
      } else {
        console.log("incorrect", guess, word);
        setIncorrect([...incorrect, guess]);
        if (guessesLeft > 0) {
          setGuessesLeft(guessesLeft-1);
        } else {
          setGameState('lost')
        }
      }
    }
    setGuess('');
  }
  const reset = () => {
    setWord(words[Math.floor(Math.random()*words.length)]);
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGameState('playing');
  }
  return (
    <div className="App">
      <div className="playing">
        <h1>Guessing</h1>
        <b>{guessesLeft}</b> incorrect guesses left
        <br/>
        <br/>
        Word: {blanks}
        <br/>
        <br/>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={guess}
              name="guess"
              onChange={handleChange}
              style={{ width: "10px" }}/>
          </label>
          <input type="submit" value="Guess" />
        </form>
        <br/>
        <br/>
        {incorrect.length > 0 ? (
          <div>Incorrect Guesses: {incorrect.join(", ")}</div>
        ) : null}
      </div>
      {gameState === 'lost' ? (
        <div className="lost">
          <h2>You lost!</h2>
          <button onClick={reset}>Play Again</button>
        </div>
      ) : null}
      {gameState === 'won' ? (
        <div className="won">
          <h2>You won!</h2>
          <button onClick={reset}>Play Again</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
