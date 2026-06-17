export type GameState = {
  moves: number;
  startedAt: number | null;
};

export const initialGameState: GameState = {
  moves: 0,
  startedAt: null,
};
