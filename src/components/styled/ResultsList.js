import styled from 'styled-components';

export const ResultsList = styled.ul`
  list-style-type: decimal;
  list-style-position: inside;
  text-align: left;
  padding: 0 10px;
  width: 80%;
  margin: 0 auto;

  span.incorrect {
    color: red;
    text-decoration: line-through;
  }

  span.correct {
    color: green;
  }
`;
