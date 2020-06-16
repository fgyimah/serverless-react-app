import React, { useEffect } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';

function GameOver({ history }) {
  const [score] = useScore();

  useEffect(() => {
    if (score === -1) history.push('/');
  }, [score, history]);

  return (
    <div>
      <h1>GameOver</h1>
      <p>{score}</p>
      <StyledLink to="/">Go home</StyledLink>
      <StyledLink to="/game">Play Again?</StyledLink>
    </div>
  );
}

export default GameOver;
