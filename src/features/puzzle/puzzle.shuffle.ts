import type { PuzzleBoard } from './puzzle.types';

export function shuffleBoard(board: PuzzleBoard): PuzzleBoard {
  return {
    ...board,
    tiles: [...board.tiles].reverse(),
  };
}
