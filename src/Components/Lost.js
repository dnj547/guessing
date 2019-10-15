import React from 'react';

function Lost (props) {
  return (
    <div className="lost">
      <h2>You lost!</h2>
      <button onClick={props.reset}>Play Again</button>
    </div>
  )
}

export default Lost;
