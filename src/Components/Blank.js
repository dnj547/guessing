import React from 'react';

function Blank (props) {
  if (props.guessed) {
    return `${props.letter} `
  } else {
    return "_ "
  }
}
export default Blank;
