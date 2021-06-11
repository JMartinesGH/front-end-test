import React from 'react';
import ReactDOM from 'react-dom';
import { getMoreQuizzes, getQuizzes } from './data/quizzes';
import { QuizWrapper } from './components/Quiz.js';

import './styles.css';

const appReducer = (state, action) => {
  if (action.type === 'success') {
    return {
      ...state,
      quizzes: action.data,
      error: null,
    };
  } else if (action.type === 'error') {
    console.log(action.error.message);
  } else {
    throw new Error(`Unsupported action.type`);
  }
};

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [state, dispatch] = React.useReducer(appReducer, { error: null });
  const fetchedQuizzes = React.useRef([]);

  React.useEffect(() => {
    if (fetchedQuizzes.current) {
      setLoading(true);
      Promise.all([getQuizzes(), getMoreQuizzes()]).then((data) => {
        Array.prototype.push.apply(data[0], data[1]);
        setLoading(false);
        dispatch({ type: 'success', data: data[0] });
      });
    }
  }, []);

  return (
    <div className="app">
      {loading && <p>Loading...</p>}

      {state.error && <p className="error">{state.error}</p>}

      {state.quizzes !== null && state.quizzes !== undefined ? (
        <QuizWrapper quizzes={state.quizzes} />
      ) : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
