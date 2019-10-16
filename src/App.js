import React, { useState, useEffect } from 'react';
import Game from './Components/Game';
import Intro from './Components/Intro';
import Lost from './Components/Lost';
import Won from './Components/Won';
import './App.css';

function App() {
  // custom react hook
  function useAsyncState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const setter = x =>
      new Promise(resolve => {
        setValue(x);
        resolve(x);
      });
    return [value, setter];
  }

  // proxy is used to get around CORS error
  const PROXY = "https://cors-anywhere.herokuapp.com/";
  const API = "app.linkedin-reach.io/words";

  // custom react hooks
  const [difficulty, setDifficulty] = useAsyncState('none');
  const [difficultyNum, setDifficultyNum] = useAsyncState(0);

  // normal react hooks
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [guess, setGuess] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [gameState, setGameState] = useState('intro');
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [alert, setAlert] = useState('');

  // set new word whenever words array changes
  useEffect(() => {
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random()*words.length)]);
    }
  }, [words]);

  // set difficulty and start new game
  async function handleClick (e) {
    const newDifficulty = await setDifficulty(e.target.value);
    let newDifficultyNum;
    if (newDifficulty === 'easy') {
      newDifficultyNum = [1, 2, 3][Math.floor(Math.random()*[1, 2, 3].length)]
    } else if (newDifficulty === 'medium') {
      newDifficultyNum = [4, 5, 6, 7][Math.floor(Math.random()*[4, 5, 6, 7].length)]
    } else if (newDifficulty === 'hard') {
      newDifficultyNum = [8, 9, 10][Math.floor(Math.random()*[8, 9, 10].length)]
    };
    await setDifficultyNum(newDifficultyNum);
    newGame(newDifficultyNum);
  };

  const reset = () => {
    setDifficulty('none');
    setDifficultyNum(0);
    setWord(words[Math.floor(Math.random()*words.length)]);
    setGuessesLeft(6);
    setCorrect([]);
    setIncorrect([]);
    setGameState('intro');
  }

  const newGame = (newDifficultyNum) => {
    fetch(PROXY+API+`?difficulty=${newDifficultyNum}&minLength=3&maxLength=10`)
      .then(res => res.text())
      .then(words => setWords(words.split(`\n`)))
      .then(nothing => setGameState('game'));
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
        setGuessesLeft={setGuessesLeft}
        alert={alert}
        setAlert={setAlert} /> : null}
    </div>
  );
}

export default App;
