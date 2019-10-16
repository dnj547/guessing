import React, { useState, useEffect } from 'react';
import Blank from './Blank';
import Ex from './Ex';
import Alert from './Alert';

function Game (props) {
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [given, setGiven] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [alert, setAlert] = useState('');
  const [playingGame, setPlayingGame] = useState(true);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const blanks = props.word ? props.word.split("").map((letter, i) => {
    return <Blank
      letter={letter}
      key={'blank' + i}
      guessed={correct.includes(letter) || given.includes(letter) ? true : false} />
  }) : null;

  const exes = Array.from(Array(6).keys()).map((guess, i) => {
    return <Ex incorrect={incorrect[i]} key={'x' + i}/>
  });

  const handleChangeGuess = e => {
    setGuess(e.target.value.toLowerCase());
  };

  const winOrLose = (newIncorrect, newCorrect) => {
    if (newIncorrect && newIncorrect.length > 5) {
      setPlayingGame(false);
      setLost(true);
      setGiven(props.word.split(""));
      setAlert("You lost!");
    } else if (newCorrect && props.word.split("").every(letter=>[...newCorrect, ...given].includes(letter))) {
      setPlayingGame(false);
      setWon(true);
      setAlert("You won!");
    }
  }

  const validGuess = guess => {
    if (guess === "" || !guess.match(/[a-z]/i) || guess.split("").length !== 1) {
      setAlert("Enter a letter");
      return false;
    } else if (incorrect.includes(guess) || correct.includes(guess)) {
      setAlert("You have already guessed that letter");
      return false;
    } else {
      setAlert('');
      return true;
    }
  };

  const handleSubmitGuess = e => {
    e.preventDefault();
    let newCorrect;
    let newIncorrect;
    let newGuessesLeft;
    if (validGuess(guess)) {
      if (props.word.split("").includes(guess)) {
        newCorrect = [...correct, guess]
        setCorrect(newCorrect);
      } else {
        newIncorrect = [...incorrect, guess]
        setIncorrect(newIncorrect);
        newGuessesLeft = guessesLeft-1
        setGuessesLeft(newGuessesLeft);
      }
    }
    setGuess('');
    winOrLose(newIncorrect, newCorrect);
  };

  const hint = () => {
    if (hintsLeft > 0) {
      let letters = props.word.split("");
      let filteredLetters;
      let randomLetter;
      if (correct.length > 0) {
        if (given.length > 0) {
          filteredLetters = letters.filter(letter => !correct.includes(letter) && !given.includes(letter));
        } else {
          filteredLetters = letters.filter(letter => !correct.includes(letter));
        }
        randomLetter = filteredLetters[Math.floor(Math.random()*filteredLetters.length)];
      } else if (given.length > 0) {
        filteredLetters = letters.filter(letter => !given.includes(letter));
      } else {
        randomLetter = letters[Math.floor(Math.random()*letters.length)];
      }
      setGiven([...given, randomLetter]);
      setHintsLeft(hintsLeft-1);
    } else {
      setAlert("No hints left");
    };
  }

  const giveUp = () => {
    setAlert("You gave up!");
    setGiven(props.word.split(""));
    setPlayingGame(false);
    setLost(true);
  }

  const resetGame = () => {
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGiven([]);
    setPlayingGame(true);
    setWon(false);
    setLost(false);
    props.resetApp();
  };

  return (
    <div>
      <Alert alert={alert}/>
      {blanks}
      {won || lost ? <button onClick={resetGame}>Play Again</button> : null}
      {playingGame ? (
        <div>
          <div className="buttons">
            <form onSubmit={handleSubmitGuess}>
              <label>
                <input
                  type="text"
                  value={guess}
                  name="guess"
                  onChange={handleChangeGuess}/>
              </label>
              <input type="submit" value="guess" />
            </form>
            {hintsLeft > 0 ? (
              <button onClick={hint}>hint</button>
            ) : (
              <button onClick={hint} className="no-hint">hint</button>
            )}
            <button onClick={giveUp}>give up</button>
          </div>
          {exes}
        </div>
      ) : null}
    </div>
  )
}

export default Game;
