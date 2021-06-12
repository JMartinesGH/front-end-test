import React from 'react';
import { Results } from './Results';
import { shuffleArray } from '../utils/utils';
import { Answer, AnswerList } from './styled/Answers';
import { NextButton } from './styled/Buttons';
import { NextButtons } from './NextButtons';

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
        <NextButton onClick={reset}>Try again?</NextButton>
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
  const [answered, setAnswered] = React.useState(false);
  const [quizStats, setQuizStats] = React.useState([]);

  React.useEffect(() => {
    setQuizStats([]);
  }, []);
  // set the initial state of answers,
  // I understand this is highly unusual
  // but I couldn't think of a better pattern for this
  // still early days with hooks
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

  // incrementIndex
  const incrementIndex = () => {
    setCorrect(null);
    setIndex((i) => (i === quiz.questions.length - 1 ? i : i + 1));
    setAnswered(false);
  };

  //check answer and set up breakdown of questions answered
  const checkAnswer = (answer, question) => {
    setAnswered(true);
    if (answer === quiz.questions[index].correctAnswer) {
      console.log('correct');
      setCorrect(true);
      setNumCorrect((numCorrect) => numCorrect + 1);
      setAnswered(true);
      setQuizStats((quizStats) => [
        ...quizStats,
        [question, answer, 'correct'],
      ]);
    } else {
      console.warn('incorrect');
      setCorrect(false);
      setQuizStats((quizStats) => [
        ...quizStats,
        [question, answer, 'incorrect'],
      ]);
    }
  };

  // switch to results view and rest answered and correct
  const showResults = () => {
    setResults(true);
    setCorrect(null);
    setAnswered(false);
  };

  if (!results && quiz !== undefined) {
    return (
      <>
        <h1>{quiz.title}</h1>
        <h4>{quiz.questions[index].text}</h4>
        <AnswerList className={answered ? `disabled` : ``}>
          {answers.map((answer, i) => {
            return (
              <Answer
                key={i}
                onClick={() => checkAnswer(answer, quiz.questions[index].text)}
              >
                {answer}
              </Answer>
            );
          })}
        </AnswerList>
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
      <Results
        title={quiz.title}
        numCorrect={numCorrect}
        numQuestions={quiz.questions.length}
        onNext={() => {
          setNumCorrect(0);
          setIndex(0);
          setResults(null);
          nextQuiz();
          setQuizStats([]);
        }}
        quizStats={quizStats}
      />
    );
  }
};
