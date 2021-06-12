import React from 'react';
import { NextButton } from './styled/Buttons';

export const NextButtons = ({
  index,
  increment,
  length,
  results,
  disabled,
}) => {
  if (index === length) {
    return (
      <NextButton onClick={results} disabled={disabled}>
        Show Results
      </NextButton>
    );
  } else {
    return (
      <NextButton onClick={increment} disabled={disabled}>
        Next Question
      </NextButton>
    );
  }
};
