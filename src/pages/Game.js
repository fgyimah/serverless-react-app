import React, { useState, useEffect } from 'react';
import {
  StyledGame,
  StyledTimer,
  StyledScore,
  StyledCharacter,
} from '../styled/Game';
import { Strong } from '../styled/Random';

function Game({ history }) {
  const MAX_SECONDS = 5;
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (seconds <= -1) {
      history.push('/gameOver');
    }
  }, [seconds, history]);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const interval = (endTime.getTime() - startTime.getTime()).toString();
    const formattedMsString = ('00000' + interval).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMsString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMsString.substring(formattedMsString.length - 3));

    setSeconds(updatedSeconds.toString().padStart(2, 0));
    setMs(updatedMs.toString().padStart(3, 0));
  };

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}

export default Game;
