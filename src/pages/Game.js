import React, { useState, useEffect, useCallback } from 'react';
import {
  StyledGame,
  StyledTimer,
  StyledScore,
  StyledCharacter,
} from '../styled/Game';
import { Strong } from '../styled/Random';

function Game({ history }) {
  const MAX_SECONDS = 90;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [ms, setMs] = useState(0);
  const [character, setCharacter] = useState('');

  useEffect(() => {
    setRandomCharacter();
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

  const keyupHandler = useCallback(
    (e) => {
      if (e.key === character) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }

      setRandomCharacter();
    },
    [character, score]
  );

  useEffect(() => {
    document.addEventListener('keyup', keyupHandler);

    return () => {
      document.removeEventListener('keyup', keyupHandler);
    };
  }, [keyupHandler]);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    const character = characters[randomInt];
    setCharacter(character);
  };

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
      <StyledCharacter>{character}</StyledCharacter>
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
