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
  const [guessedCorrect, setGuessedCorrect] = useState([]);
  const [guessedIncorrect, setGuessedIncorrect] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
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
    return <Blank letter={letter} key={i} guessed={guessedCorrect.includes(letter) ? true : false} />
  }) : null;
  const handleChange = e => {
    setCurrentGuess(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (currentGuess === "" || !currentGuess.match(/[a-z]/i)) {
      console.log("You must enter a letter")
    } else if (guessedIncorrect.includes(currentGuess) || guessedCorrect.includes(currentGuess)) {
      console.log("You have already guessed that letter")
    } else {
      if (word.split("").includes(currentGuess)) {
        console.log("correct", currentGuess, word);
        setGuessedCorrect([...guessedCorrect, currentGuess]);
        if (word.split("").every(letter=>[...guessedCorrect, currentGuess].includes(letter))) {
          setGameState('won')
        }
      } else {
        console.log("incorrect", currentGuess, word);
        setGuessedIncorrect([...guessedIncorrect, currentGuess]);
        if (guessesLeft > 0) {
          setGuessesLeft(guessesLeft-1);
        } else {
          setGameState('lost')
        }
      }
    }
    setCurrentGuess('');
  }
  const reset = () => {
    setWord(words[Math.floor(Math.random()*words.length)]);
    setGuessesLeft(6);
    setGuessedCorrect([]);
    setGuessedIncorrect([]);
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
            Guess:
            <input type="text" value={currentGuess} name="guess" onChange={handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br/>
        <br/>
        Incorrect Guesses: {guessedIncorrect.join(", ")}
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
