import React from 'react';

function X (props) {
  return (
    <div className="x">
      {props.incorrect ? props.incorrect : "x"}
    </div>
  )
}
export default X;
