import React from 'react';
import { HighscoreLI } from '../styled/Highscores';

function HighScores() {
  const [highscores, setHighScores] = React.useState([]);

  React.useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/get-high-scores');
        const scores = await res.json();

        setHighScores(scores);
      } catch (error) {
        console.error(error);
      }
    };

    loadHighScores();
  }, []);

  return (
    <div>
      <h1>HighScores</h1>
      <ol>
        {highscores.map((score) => (
          <HighscoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </HighscoreLI>
        ))}
      </ol>
    </div>
  );
}

export default HighScores;
