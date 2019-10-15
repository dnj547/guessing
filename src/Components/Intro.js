import React from 'react';

function Intro (props) {
  return (
    <div>
      <button onClick={props.handleClick} value="easy">easy</button>
      <button onClick={props.handleClick} value="medium">medium</button>
      <button onClick={props.handleClick} value="hard">hard</button>
    </div>
  )
}

export default Intro;
