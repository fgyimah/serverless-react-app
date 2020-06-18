import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';

function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');

  useEffect(() => {
    if (score === -1) history.push('/');
  }, [score, history]);

  useEffect(() => {
    const saveScore = async () => {
      try {
        const res = await fetch('/.netlify/functions/save-high-score', {
          method: 'POST',
          body: JSON.stringify({ score, name: 'Abena' }),
        });
        const data = await res.json();
        if (data.id) {
          setScoreMessage('Congrats you are among the top 10 highscores');
        } else {
          setScoreMessage('Ooops.. unable to get a better score, try again');
        }
      } catch (error) {
        console.error(error);
      }
    };

    saveScore();
  }, [score]);

  return (
    <div>
      <h1>GameOver</h1>
      <h2>{scoreMessage}</h2>
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again?</StyledLink>
      </div>
    </div>
  );
}

export default GameOver;
