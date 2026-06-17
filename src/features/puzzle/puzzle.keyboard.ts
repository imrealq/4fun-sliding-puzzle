import { canMoveTileByArrowKey, moveTile } from './puzzle.logic';
import type { PuzzleBoard } from './puzzle.types';

export function createKeyboardMoveHandler(
  setBoard: (updateBoard: (board: PuzzleBoard) => PuzzleBoard) => void,
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

    const direction = event.key.replace('Arrow', '').toLowerCase() as
      | 'up'
      | 'down'
      | 'left'
      | 'right';
    setBoard((board) => {
      const tileId = canMoveTileByArrowKey(board, direction);

      return tileId === null ? board : moveTile(board, tileId);
    });
  };
}
