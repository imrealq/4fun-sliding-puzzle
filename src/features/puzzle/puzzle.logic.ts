import type { PuzzleBoard } from './puzzle.types';

export function isSolvedBoard(board: PuzzleBoard): boolean {
  return board.length === 0;
}
