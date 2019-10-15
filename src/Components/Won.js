import React from 'react';

function Lost (props) {
  return (
    <div className="won">
      <h2>You won!</h2>
      <button onClick={props.reset}>Play Again</button>
    </div>
  )
}

export default Lost;
