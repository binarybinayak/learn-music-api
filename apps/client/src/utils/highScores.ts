/**
 * High scores utility for managing game scores in localStorage.
 * Stores scores under a single "highScores" key with nested structure:
 * {
 *   "MatchThePitch": {
 *     "piano_long": { "easy": 5, "medium": 10 },
 *     "piano_short": { ... }
 *   },
 *   "NameThatNote": { ... }
 * }
 */

export type GameType = "nameThatNote" | "matchThePitch";

interface HighScoreKey {
  game: GameType;
  instrument: string;
  difficulty: string;
}

interface HighScoresStore {
  [game: string]: {
    [instrument: string]: {
      [difficulty: string]: number;
    };
  };
}

const STORAGE_KEY = "highScores";

/**
 * Get the entire high scores object from localStorage.
 */
const getHighScoresStore = (): HighScoresStore => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/**
 * Save the entire high scores object to localStorage.
 */
const saveHighScoresStore = (store: HighScoresStore): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

/**
 * Get the high score for a specific game/instrument/difficulty combination.
 * Returns 0 if no score exists.
 */
export const getHighScore = (key: HighScoreKey): number => {
  const store = getHighScoresStore();
  return store[key.game]?.[key.instrument]?.[key.difficulty] ?? 0;
};

/**
 * Save a high score if it's greater than the current one.
 * Returns the new high score (either updated or existing).
 */
export const saveHighScore = (key: HighScoreKey, score: number): number => {
  const store = getHighScoresStore();

  // Initialize nested structure if needed
  if (!store[key.game]) {
    store[key.game] = {};
  }
  if (!store[key.game][key.instrument]) {
    store[key.game][key.instrument] = {};
  }

  // Only update if new score is higher
  const current = store[key.game][key.instrument][key.difficulty] ?? 0;
  const newScore = Math.max(current, score);

  store[key.game][key.instrument][key.difficulty] = newScore;
  saveHighScoresStore(store);

  return newScore;
};
