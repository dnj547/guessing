import React from 'react';
import Blank from './Blank';
import Ex from './Ex';

function Game (props) {

  const blanks = props.word ? props.word.split("").map((letter, i) => {
    return <Blank letter={letter} key={'blank' + i} guessed={props.correct.includes(letter) ? true : false} />
  }) : null;

  const exes = Array.from(Array(6).keys()).map((guess, i) => {
    return <Ex incorrect={props.incorrect[i]} key={'x' + i}/>
  });

  const handleChangeGuess = e => {
    props.setGuess(e.target.value)
  };

  const validGuess = guess => {
    if (guess === "" || !guess.match(/[a-z]/i) || guess.split("").length !== 1) {
      console.log("You must enter a letter")
      return false
    } else if (props.incorrect.includes(guess) || props.correct.includes(guess)) {
      console.log("You have already guessed that letter")
      return false
    } else {
      return true
    }
  };

  const handleSubmitGuess = e => {
    e.preventDefault();
    if (validGuess(props.guess)) {
      if (props.word.split("").includes(props.guess)) {
        console.log("correct", props.guess, props.word);
        props.setCorrect([...props.correct, props.guess]);
        if (props.word.split("").every(letter=>[...props.correct, props.guess].includes(letter))) {
          props.setGameState('won')
        }
      } else {
        console.log("incorrect", props.guess, props.word);
        props.setIncorrect([...props.incorrect, props.guess]);
        if (props.guessesLeft === 1) {
          props.setGameState('lost')
        } else {
          props.setGuessesLeft(props.guessesLeft-1);
        }
      }
    }
    props.setGuess('');
  };

  return (
    <div>
      {blanks}
      <div className="buttons">
        <form onSubmit={handleSubmitGuess}>
          <label>
            <input
              type="text"
              value={props.guess}
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
  )
}

export default Game;
