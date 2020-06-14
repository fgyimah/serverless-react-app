import React from 'react';
import { Accent, StyledTitle } from '../styled/Random';
import CTA from '../styled/CTA';

function Home() {
  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing
      </CTA>
    </div>
  );
}

export default Home;
