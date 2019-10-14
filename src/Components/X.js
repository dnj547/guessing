import React from 'react';

function X (props) {
  if (props.incorrect) {
    return (
      <div className="incorrect">
        {props.incorrect}
      </div>
    )
  } else {
    return (
      <div className="x">
        x
      </div>
    )
  }
}
export default X;
