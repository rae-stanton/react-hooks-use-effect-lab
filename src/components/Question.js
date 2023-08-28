import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    function handleCountdown() {
      setTimeRemaining(prevTime => {
        if (prevTime > 1) {
          setTimeout(handleCountdown, 1000);
          return prevTime - 1;
        } else {
          onAnswered(false);
          return 10;
        }
      });
    }

    const initialTimeout = setTimeout(handleCountdown, 1000);
    return () => {
      clearTimeout(initialTimeout);
    };
  }, [question.id]);  // Only re-run effect if the question changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
