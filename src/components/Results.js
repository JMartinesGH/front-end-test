import React from 'react';
import { getMessage } from '../data/messages';
import { NextButton } from './styled/Buttons';
import { ResultsList } from './styled/ResultsList';

export const Results = ({
  title,
  numCorrect,
  numQuestions,
  onNext,
  quizStats,
}) => {
  return (
    <>
      <h1>Results: {title}</h1>
      <h2>
        <strong>{numCorrect}</strong> out of <strong>{numQuestions}</strong>
      </h2>
      <h4>{getMessage()}</h4>
      <ResultsList>
        {quizStats.map((quizStat) => {
          return (
            <li key={quizStat[0]}>
              {quizStat[0]} <span className={quizStat[2]}>{quizStat[1]}</span>
            </li>
          );
        })}
      </ResultsList>
      <NextButton onClick={onNext}>Next Quiz</NextButton>
    </>
  );
};
