import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons'

function Blank (props) {
  if (props.guessed) {
    return (
      <div className="letter">
        {props.letter}
      </div>
    )
  } else {
    return (
      <div className="icon">
        <FontAwesomeIcon icon={faGhost} />
      </div>
    )
  }
}
export default Blank;
