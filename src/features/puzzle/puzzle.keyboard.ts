import { getArrowKeyTileId, moveTile } from './puzzle.logic';
import type { PuzzleBoard } from './puzzle.types';

const ARROW_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

export function createKeyboardMoveHandler(
  setBoard: (updateBoard: (board: PuzzleBoard) => PuzzleBoard) => void,
): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent): void => {
    if (!ARROW_KEYS.has(event.key)) {
      return;
    }

    event.preventDefault();

    const direction = event.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';

    setBoard((board) => {
      const tileId = getArrowKeyTileId(board, direction);
      return tileId === null ? board : moveTile(board, tileId);
    });
  };
}
