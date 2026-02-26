import { useState, useEffect, useCallback } from 'react';
import {
  getLowestGuesses,
  updateLowestGuesses,
  addGameHistory,
} from '../../../lib';
import { useAuth } from '../../../contexts/auth-context';

interface UseScoreReturn {
  lowestGuesses: number | null;
  isNewRecord: boolean;
  hasSaved: boolean;
  saveGameResult: (guessCount: number, targetNumber: number) => boolean;
  resetForNewGame: () => void;
}

export function useScore(): UseScoreReturn {
  const { user } = useAuth();
  const [lowestGuesses, setLowestGuesses] = useState<number | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // Load lowest score on mount
  useEffect(() => {
    if (user) {
      setLowestGuesses(getLowestGuesses(user.username));
    }
  }, [user]);

  const saveGameResult = useCallback(
    (guessCount: number, targetNumber: number): boolean => {
      if (!user) return false;

      setHasSaved(true);

      // Save game history
      addGameHistory(user.username, guessCount, targetNumber);

      // Check and update lowest score
      const currentLowest = getLowestGuesses(user.username);
      if (currentLowest === null || guessCount < currentLowest) {
        updateLowestGuesses(user.username, guessCount);
        setLowestGuesses(guessCount);
        setIsNewRecord(true);
        return true;
      }
      return false;
    },
    [user],
  );

  const resetForNewGame = useCallback(() => {
    setIsNewRecord(false);
    setHasSaved(false);
  }, []);

  return {
    lowestGuesses,
    isNewRecord,
    hasSaved,
    saveGameResult,
    resetForNewGame,
  };
}
