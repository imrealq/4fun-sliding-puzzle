export type GameState = {
  moves: number;
  startedAt: number | null;
  isSolved: boolean;
};

export const initialGameState: GameState = {
  moves: 0,
  startedAt: null,
  isSolved: false,
};
