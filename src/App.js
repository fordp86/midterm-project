import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import GuessingGame from './GuessingGame';

function App() {
  const [guesses, setGuesses] = useState([])
  const [rightAnswer, setRightAnswer] = useState(Math.floor(Math.random() * 100) + 1);

  useEffect(() => {
    if (guesses === null) {
      setGuesses(JSON.parse(localStorage.getItem("guesses") || "[]"))
    } else {
      localStorage.setItem("guesses", JSON.stringify(guesses))
    }
  }, [guesses])

  function handleNewGuess(guess) {
    setGuesses(guesses.concat(guess))
  }

  function saveRightAnswer(rightAnswer){
    setRightAnswer(rightAnswer)
  }

  function resetGame(){
    setGuesses(guesses.filter((guess) => guess.guesses === guesses ))
    window.location.reload(false);
  }

  return (
    <Stack gap={3} className="col-md-10 mx-auto">
      <GuessingGame resetGame={resetGame} createAnswer={saveRightAnswer} onNewGuess={handleNewGuess} luckynumber={rightAnswer} newGuesses={guesses} />
    </Stack>
  );
}

export default App;
