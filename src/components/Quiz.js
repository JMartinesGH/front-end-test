import React from 'react';
import { shuffleArray } from '../utils/utils';

export const QuizWrapper = ({ quizzes }) => {
  const [index, setIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const nextQuiz = () => {
    console.log('next quiz');
    if (index < quizzes.length - 1) {
      setIndex((index) => index + 1);
    } else {
      console.log('maxed out on quizzes');
      setFinished(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setFinished(false);
  };

  if (quizzes[index] !== undefined && !finished) {
    return <Quiz quiz={quizzes[index]} nextQuiz={nextQuiz} />;
  } else if (finished) {
    console.log('no more quizzes');
    return (
      <>
        <p>No more quizzes</p>
        <button onClick={reset}>Try again?</button>
      </>
    );
  }
};

const Quiz = ({ quiz, nextQuiz }) => {
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState([
    ...quiz.questions[0].incorrectAnswers,
    quiz.questions[0].correctAnswer,
  ]);
  const [correct, setCorrect] = React.useState(null);
  const [numCorrect, setNumCorrect] = React.useState(0);
  const [results, setResults] = React.useState(null);

  React.useEffect(() => {
    if (index === 0 && answers === null) {
      setAnswers((answers) => shuffleArray(answers));
    } else {
      setAnswers([
        ...quiz.questions[index].incorrectAnswers,
        quiz.questions[index].correctAnswer,
      ]);
      setAnswers((answers) => shuffleArray(answers));
    }
  }, [index, quiz]);

  const incrementIndex = () => {
    setCorrect(null);
    setIndex((i) => (i === quiz.questions.length - 1 ? i : i + 1));
  };

  const checkAnswer = (answer) => {
    if (answer == quiz.questions[index].correctAnswer) {
      console.log('correct');
      setCorrect(true);
      setNumCorrect((numCorrect) => numCorrect + 1);
    } else {
      console.warn('incorrect');
      setCorrect(false);
    }
  };

  const showResults = () => {
    setResults(true);
    setCorrect(null);
  };

  if (!results && quiz !== undefined) {
    return (
      <>
        <h1>{quiz.title}</h1>
        <h4>{quiz.questions[index].text}</h4>
        <ul>
          {answers.map((answer, i) => {
            return (
              <li key={i} onClick={() => checkAnswer(answer)}>
                {answer}
              </li>
            );
          })}
        </ul>
        {correct && <div>Correct</div>}
        {!correct && correct !== null && <div>Incorrect</div>}
        <NextButtons
          index={index}
          increment={incrementIndex}
          length={quiz.questions.length - 1}
          results={showResults}
          disabled={correct !== null ? false : true}
        />
      </>
    );
  } else {
    return (
      <>
        <h1>Results: {quiz.title}</h1>
        <h2>
          <strong>{numCorrect}</strong> out of{' '}
          <strong>{quiz.questions.length}</strong>
        </h2>
        <button
          onClick={() => {
            setNumCorrect(0);
            setIndex(0);
            setResults(null);
            nextQuiz();
          }}
        >
          Next Quiz
        </button>
      </>
    );
  }
};

const NextButtons = ({ index, increment, length, results, disabled }) => {
  if (index === length) {
    return (
      <button onClick={results} disabled={disabled}>
        Show Results
      </button>
    );
  } else {
    return (
      <button onClick={increment} disabled={disabled}>
        Next Question
      </button>
    );
  }
};
