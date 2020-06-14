import React from 'react';
import {
  StyledGame,
  StyledTimer,
  StyledScore,
  StyledCharacter,
} from '../styled/Game';
import { Strong } from '../styled/Random';

function Game() {
  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>0</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: <Strong>00: 000</Strong>
      </StyledTimer>
    </StyledGame>
  );
}

export default Game;
