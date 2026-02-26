import { useCallback, useState } from 'react';
import { GameConfig } from '../../../constants';

export type Feedback = 'higher' | 'lower' | 'correct' | null;

function generateTarget(): number {
  return (
    Math.floor(Math.random() * GameConfig.MAX_NUMBER) + GameConfig.MIN_NUMBER
  );
}

export interface GameResult {
  guessCount: number;
  targetNumber: number;
}

interface UseGameReturn {
  guessCount: number;
  feedback: Feedback;
  isWon: boolean;
  gameResult: GameResult | null;
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

  const gameResult: GameResult | null = isWon
    ? { guessCount, targetNumber: target }
    : null;

  return { guessCount, feedback, isWon, gameResult, makeGuess, resetGame };
}
