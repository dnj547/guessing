import React, { useState } from 'react';
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

  const blanks = props.word ? props.word.map((letter, i) => {
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

  const winOrLose = (inc, cor, giv) => {
    console.log("win or lose?")
    if (inc && inc.length > 5) {
      console.log("lose")
      setPlayingGame(false);
      setLost(true);
      setGiven(props.word);
      setAlert("You lost!");
    } else if (cor && props.word.every(letter=>[...cor, ...giv].includes(letter))) {
      console.log("won")
      setPlayingGame(false);
      setWon(true);
      setAlert("You won!");
    }
  }

  const validGuess = guess => {
    console.log("validating guess")
    if (guess === "" || !guess.match(/[a-z]/i) || guess.split("").length !== 1) {
      setAlert("Enter a letter");
      return false;
    } else if (incorrect.includes(guess) || correct.includes(guess)) {
      setAlert("You have already guessed that letter");
      return false;
    } else if (given.includes(guess)) {
      setAlert("I gave you that one...");
      return false;
    } else {
      setAlert('');
      return true;
    }
  };

  const handleSubmitGuess = e => {
    console.log("guess submitted")
    e.preventDefault();
    let newCorrect;
    let newIncorrect;
    let newGuessesLeft;
    if (validGuess(guess) && props.word.includes(guess)) {
      newCorrect = [...correct, guess]
      setCorrect(newCorrect);
      winOrLose(newIncorrect, newCorrect, given);
      console.log("correct", newCorrect);
      console.log("incorrect", newIncorrect);
    } else if (validGuess(guess) && !props.word.includes(guess)) {
      newIncorrect = [...incorrect, guess]
      setIncorrect(newIncorrect);
      newGuessesLeft = guessesLeft-1
      setGuessesLeft(newGuessesLeft);
      winOrLose(newIncorrect, newCorrect, given);
      console.log("correct", newCorrect);
      console.log("incorrect", newIncorrect);
    }
    setGuess('');
  };

  const hint = () => {
    console.log("giving hint")
    if (hintsLeft > 0) {
      let filteredLetters = props.word.filter(l => !correct.includes(l)).filter(l => !given.includes(l));
      let randomLetter = filteredLetters[Math.floor(Math.random()*filteredLetters.length)];
      let newGiven = [...given, randomLetter]
      setGiven(newGiven);
      setHintsLeft(hintsLeft-1);
      winOrLose(incorrect, correct, newGiven);
      console.log(incorrect, correct, newGiven)
    } else {
      setAlert("No hints left");
    };
  }

  const giveUp = () => {
    console.log("giving up")
    setAlert("You gave up!");
    setGiven(props.word);
    setPlayingGame(false);
    setLost(true);
  }

  const resetGame = () => {
    console.log("resetting game")
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGiven([]);
    setPlayingGame(true);
    setWon(false);
    setLost(false);
    props.resetApp();
  };

  console.log(props.word)

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
