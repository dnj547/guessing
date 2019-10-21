import React, { useState, useEffect } from 'react';
import Game from './Components/Game';
import Intro from './Components/Intro';
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
  const [introScreen, setIntroScreen] = useState(true);
  const [gameScreen, setGameScreen] = useState(false);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState([]);

  // set new word whenever words array changes
  useEffect(() => {
    if (words.length > 0) {
      console.log("setting word")
      setWord(words[Math.floor(Math.random()*words.length)].split(""));
    }
  }, [words]);

  // set difficulty and start new game
  async function handleClick (e) {
    console.log("handling click")
    const newDifficulty = await setDifficulty(e.target.value);
    let newDifficultyNum;
    if (newDifficulty === 'easy') {
      newDifficultyNum = [1, 2][Math.floor(Math.random()*[1, 2].length)]
    } else if (newDifficulty === 'medium') {
      newDifficultyNum = [3, 4, 5, 6, 7][Math.floor(Math.random()*[3, 4, 5, 6, 7].length)]
    } else if (newDifficulty === 'hard') {
      newDifficultyNum = [8, 9, 10][Math.floor(Math.random()*[8, 9, 10].length)]
    };
    await setDifficultyNum(newDifficultyNum);
    console.log(newDifficulty, newDifficultyNum)
    newGame(newDifficultyNum);
  };

  const resetApp = () => {
    setDifficulty('none');
    setDifficultyNum(0);
    setWord(words[Math.floor(Math.random()*words.length)].split(""));
    setGameScreen(false);
    setIntroScreen(true);
  }

  const newGame = (newDifficultyNum) => {
    console.log("starting new game")
    setIntroScreen(false);
    setGameScreen(true);
    fetch(PROXY+API+`?difficulty=${newDifficultyNum}&minLength=3&maxLength=10`)
      .then(res => res.text())
      .then(words => setWords(words.split(`\n`)))
      .then(n => console.log("done fetching and setting words"))
  }

  return (
    <div className="App">
      <h1>Ghoul Be Gone</h1>
      {introScreen ? <Intro handleClick={handleClick} /> : null}
      {gameScreen ? <Game
        word={word}
        setWord={setWord}
        resetApp={resetApp} /> : null}
    </div>
  );
}

export default App;
