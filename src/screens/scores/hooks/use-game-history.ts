import { useState, useEffect, useCallback } from 'react';
import { GameHistoryEntry, getGameHistory } from '../../../lib';
import { useAuth } from '../../../contexts/auth-context';

interface UseGameHistoryReturn {
  history: GameHistoryEntry[];
  error: string | null;
  refresh: () => void;
}

export function useGameHistory(): UseGameHistoryReturn {
  const { user } = useAuth();
  const [history, setHistory] = useState<GameHistoryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    try {
      const entries = getGameHistory(user.username);
      setHistory(entries);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load game history');
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    history,
    error,
    refresh,
  };
}
