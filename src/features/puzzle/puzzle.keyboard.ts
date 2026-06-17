import { handleDesktopArrowKey } from './puzzle.logic';
import type { PuzzleBoard } from './puzzle.types';

export function createKeyboardMoveHandler(
  board: PuzzleBoard,
  setBoard: (board: PuzzleBoard) => void,
): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent): void => {
    if (
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight'
    ) {
      return;
    }

    event.preventDefault();

    const nextBoard = handleDesktopArrowKey(board, event.key);

    if (nextBoard === board) {
      return;
    }

    setBoard(nextBoard);
  };
}
