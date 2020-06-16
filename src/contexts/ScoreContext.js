import React, { useState, useContext } from 'react';

const ScoreContext = React.createContext();
const useScore = () => useContext(ScoreContext);

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(-1);
  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {children}
    </ScoreContext.Provider>
  );
};

export { useScore, ScoreProvider };
