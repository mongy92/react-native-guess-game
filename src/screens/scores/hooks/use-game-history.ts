import { useState, useEffect, useCallback } from 'react';
import { GameHistoryEntry, getGameHistory } from '../../../lib';
import { useAuth } from '../../../contexts/auth-context';

interface UseGameHistoryReturn {
  history: GameHistoryEntry[];
  isLoading: boolean;
  refresh: () => void;
}

export function useGameHistory(): UseGameHistoryReturn {
  const { user } = useAuth();
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!user) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const entries = getGameHistory(user.username);
      setHistory(entries);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    history,
    isLoading,
    refresh,
  };
}
