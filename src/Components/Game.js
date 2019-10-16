import React, { useState } from 'react';
import Blank from './Blank';
import Ex from './Ex';
import Alert from './Alert';

function Game (props) {
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [alert, setAlert] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const blanks = props.word ? props.word.split("").map((letter, i) => {
    return <Blank letter={letter} key={'blank' + i} guessed={correct.includes(letter) ? true : false} />
  }) : null;

  const exes = Array.from(Array(6).keys()).map((guess, i) => {
    return <Ex incorrect={incorrect[i]} key={'x' + i}/>
  });

  const handleChangeGuess = e => {
    setGuess(e.target.value)
  };

  const validGuess = guess => {
    if (guess === "" || !guess.match(/[a-z]/i) || guess.split("").length !== 1) {
      setAlert("Enter a letter");
      return false;
    } else if (incorrect.includes(guess) || correct.includes(guess)) {
      setAlert("You have already guessed that letter");
      return false;
    } else {
      setAlert('');
      console.log("valid guess");
      return true;
    }
  };

  const handleSubmitGuess = e => {
    e.preventDefault();
    if (validGuess(guess)) {
      if (props.word.split("").includes(guess)) {
        setCorrect([...correct, guess]);
        if (props.word.split("").every(letter=>[...correct, guess].includes(letter))) {
          setGameOver(true);
          setAlert("You won!");
        }
      } else {
        setIncorrect([...incorrect, guess]);
        let newGuessesLeft = guessesLeft-1
        setGuessesLeft(newGuessesLeft);
        if (newGuessesLeft === 0) {
          setGameOver(true);
          setAlert("You lost!");
        }
      }
    }
    setGuess('');
  };

  const resetGame = () => {
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGameOver(false);
    props.resetApp();
  }

  console.log(guessesLeft)

  return (
    <div>
      <Alert alert={alert}/>
      {blanks}
      {gameOver ? <button onClick={resetGame}>Play Again</button> : null}
      {!gameOver ? (
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
            <button>hint</button>
            <button>end it</button>
          </div>
          {exes}
        </div>
      ) : null}
    </div>
  )
}

export default Game;
