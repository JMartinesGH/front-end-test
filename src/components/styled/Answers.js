import styled from 'styled-components';

export const AnswerList = styled.ul`
  list-style-type: upper-alpha;
  list-style-position: inside;
  text-align: left;
  padding: 0 10px;
  width: 80%;
  margin: 0 auto;

  &.disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export const Answer = styled.li`
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid var(--grey, #c7c7c7);
  cursor: pointer;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: var(--black, #000);
    z-index: -1;
    transform: scaleX(0%);
    transform-origin: bottom left;
    transition: all 0.3s ease-out;
  }

  &:hover {
    color: var(--white, #fff);
    &:before {
      transform: scaleX(100%);
    }
  }
`;
