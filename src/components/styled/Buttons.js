import styled from 'styled-components';

export const NextButton = styled.button`
  position: relative;
  padding: 10px;
  outline: none;
  border: none;
  background: var(--black, #000);
  color: var(--white, #fff);
  cursor: pointer;

  &:disabled {
    background: var(--grey, #e7e7e7);
    color: black;
    cursor: not-allowed;
  }
`;
