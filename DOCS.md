# About

For my quiz app I kept it relatively simple in terms of components and state.
I'm using React Hooks and Reducers to manage the state and effect change.

# Components

My file structure is pretty straight-forward, with a Components folder holding my components and a internal folder for the "styled" components

## Index.js: App and appReducer

The main App component is a wrapper component that includes the quiz component, loading and error states, and uses the appReducer to set the initial state of the fetched quizzes. Used Promise.all() to get all quizzes at the start

## Quiz.js: QuizWrapper, Quiz, Results

The QuizWrapper component is in control of what quiz is sent to the Quiz component.
Quiz displays each question in succession upon completion. It is also where the answers are shuffled, checked for correctness, and saved in stats. I could have used a reducer in Quiz to manage the state a little better.

## NextButtons.js

These are the buttons to either jump to the next question or view results

## Results.js

The results view that shows number correct out of total questions and the stats for the quiz.

## Styled Components: Answer & AnswerList, NextButtons, ResultsList

I kept related styled-components together, Answer and AnswerList, and more unique components I kept in their own files.

### Answer & AnswerList

These are the styles for each answer in a quiz question and the list that contains them

### Next Buttons

This is my styled button used throughout the app

### ResultsList

ResultsList is used by the Result component to display the selected answers from the quiz

# Utils

The utils folder is where I usually keep any non-ui related functions.
I'm using a pretty straitforward shuffle function to shuffle the answers in the Quiz component

# Add ons

Styled Components: I'm utilizing styled-components for my additional CSS in JS.
I like using Styled Components for the scoped CSS and ability to work with state.
An example of using state can be seen in my [next-portfolio repository](https://github.com/JMartinesGH/next-portfolio/blob/main/components/Nav.js)

# Conclusion and What I'd Do Differently

In conclusion I had fun doing this task and enjoyed the challenge, even when I made it more difficult on myself. In hindsight I would have also implemented Redux to manage a few of the state items like the quizStats so they could be accessed more easily anywhere.
