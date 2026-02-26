import { open, type DB } from '@op-engineering/op-sqlite';

const DB_NAME = 'guessGame.db';

let db: DB | null = null;

export function initDatabase(): void {
  db = open({ name: DB_NAME });

  db.executeSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      lowestGuesses INTEGER
    )
  `);

  db.executeSync(`
    CREATE TABLE IF NOT EXISTS game_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      guessCount INTEGER NOT NULL,
      targetNumber INTEGER NOT NULL,
      playedAt TEXT NOT NULL
    )
  `);
}

export function createUser(username: string, passwordHash: string): boolean {
  if (!db) throw new Error('Database not initialized');
  try {
    db.executeSync('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [
      username,
      passwordHash,
    ]);
    return true;
  } catch {
    return false;
  }
}

export function findUser(
  username: string,
): { username: string; passwordHash: string } | null {
  if (!db) throw new Error('Database not initialized');
  const result = db.executeSync(
    'SELECT username, passwordHash FROM users WHERE username = ?',
    [username],
  );
  if (result.rows && result.rows.length > 0) {
    return result.rows[0] as { username: string; passwordHash: string };
  }
  return null;
}

export function getLowestGuesses(username: string): number | null {
  if (!db) throw new Error('Database not initialized');
  const result = db.executeSync(
    'SELECT lowestGuesses FROM users WHERE username = ?',
    [username],
  );
  if (result.rows && result.rows.length > 0) {
    return (result.rows[0] as { lowestGuesses: number | null }).lowestGuesses;
  }
  return null;
}

export function updateLowestGuesses(username: string, count: number): void {
  if (!db) throw new Error('Database not initialized');
  db.executeSync(
    'UPDATE users SET lowestGuesses = ? WHERE username = ? AND (lowestGuesses IS NULL OR lowestGuesses > ?)',
    [count, username, count],
  );
}

export interface GameHistoryEntry {
  id: number;
  username: string;
  guessCount: number;
  targetNumber: number;
  playedAt: string;
}

export function addGameHistory(
  username: string,
  guessCount: number,
  targetNumber: number,
): void {
  if (!db) throw new Error('Database not initialized');
  const playedAt = new Date().toISOString();
  db.executeSync(
    'INSERT INTO game_history (username, guessCount, targetNumber, playedAt) VALUES (?, ?, ?, ?)',
    [username, guessCount, targetNumber, playedAt],
  );
}

export function getGameHistory(username: string): GameHistoryEntry[] {
  if (!db) throw new Error('Database not initialized');
  const result = db.executeSync(
    'SELECT * FROM game_history WHERE username = ? ORDER BY playedAt DESC LIMIT 50',
    [username],
  );
  return (result.rows ?? []) as unknown as GameHistoryEntry[];
}
