import { useCallback, useState } from 'react';

export type Feedback = 'higher' | 'lower' | 'correct' | null;

const MIN_NUMBER = 1;
const MAX_NUMBER = 43;

function generateTarget(): number {
  return Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
}

interface UseGameReturn {
  target: number;
  guessCount: number;
  feedback: Feedback;
  isWon: boolean;
  makeGuess: (guess: number) => void;
  resetGame: () => void;
}

export function useGame(): UseGameReturn {
  const [target, setTarget] = useState(generateTarget);
  const [guessCount, setGuessCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isWon, setIsWon] = useState(false);

  const makeGuess = useCallback(
    (guess: number) => {
      if (isWon) return;

      setGuessCount(prev => prev + 1);

      if (guess < target) {
        setFeedback('higher');
      } else if (guess > target) {
        setFeedback('lower');
      } else {
        setFeedback('correct');
        setIsWon(true);
      }
    },
    [target, isWon],
  );

  const resetGame = useCallback(() => {
    setTarget(generateTarget());
    setGuessCount(0);
    setFeedback(null);
    setIsWon(false);
  }, []);

  return { target, guessCount, feedback, isWon, makeGuess, resetGame };
}
