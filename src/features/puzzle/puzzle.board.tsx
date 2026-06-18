import { useRef } from 'react';
import type { PuzzleBoard as PuzzleBoardModel } from './puzzle.types';
import type { PuzzleBoardPreviewProps, PuzzleBoardProps } from './puzzle.board.types';
import { canMoveTile, findEmptyTile } from './puzzle.logic';
import { getTileAtPosition, getTileSliceStyle, sortTilesByPosition } from './puzzle.utils';

type Direction = 'up' | 'down' | 'left' | 'right';

function getSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): Direction | null {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) < 24 && Math.abs(deltaY) < 24) return null;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  }

  return deltaY > 0 ? 'down' : 'up';
}

// Returns true if the tile's swipe direction points toward the empty slot.
function swipeMatchesMove(
  tileRow: number,
  tileColumn: number,
  emptyRow: number,
  emptyColumn: number,
  direction: Direction,
): boolean {
  return (
    (direction === 'up'    && tileRow    === emptyRow + 1) ||
    (direction === 'down'  && tileRow    === emptyRow - 1) ||
    (direction === 'left'  && tileColumn === emptyColumn + 1) ||
    (direction === 'right' && tileColumn === emptyColumn - 1)
  );
}

export function PuzzleBoard({ board, imageSrc, onTileMove }: PuzzleBoardProps): React.ReactElement {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchedTileIdRef = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    const touch = event.touches[0];
    if (!touch) return;

    const tileButton = (event.target as HTMLElement | null)?.closest('button[data-tile-id]');
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchedTileIdRef.current = tileButton ? Number(tileButton.getAttribute('data-tile-id')) : null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
    const start = touchStartRef.current;
    const tileId = touchedTileIdRef.current;
    touchStartRef.current = null;
    touchedTileIdRef.current = null;

    if (!start || !onTileMove || tileId === null) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const direction = getSwipeDirection(start.x, start.y, touch.clientX, touch.clientY);
    if (!direction) return;

    const tile = board.tiles.find((t) => t.id === tileId);
    const emptyTile = findEmptyTile(board);
    if (!tile || tile.isEmpty || !emptyTile || !canMoveTile(board, tile.id)) return;

    if (swipeMatchesMove(tile.position.row, tile.position.column, emptyTile.position.row, emptyTile.position.column, direction)) {
      onTileMove(tile.id);
    }
  };

  const handleTouchCancel = (): void => {
    touchStartRef.current = null;
    touchedTileIdRef.current = null;
  };

  return (
    <div className="mx-auto w-full max-w-[28rem] rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-black/30">
      <div
        className="grid aspect-square w-full gap-1 overflow-hidden rounded-2xl bg-slate-950 p-1"
        style={{ gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        {sortTilesByPosition(board.tiles).map((tile) => {
          const { backgroundSize, backgroundPosition } = getTileSliceStyle(tile, board.size);
          const movable = !tile.isEmpty && onTileMove && canMoveTile(board, tile.id);

          return (
            <button
              key={tile.id}
              type="button"
              data-tile-id={tile.id}
              onClick={() => movable && onTileMove(tile.id)}
              className={[
                'relative aspect-square overflow-hidden rounded-xl border transition duration-200',
                tile.isEmpty
                  ? 'border-dashed border-slate-700 bg-slate-950/80'
                  : 'border-slate-700 bg-slate-900 hover:scale-[0.99] active:scale-[0.98]',
              ].join(' ')}
              aria-label={tile.isEmpty ? 'Empty slot' : `Tile ${tile.id + 1}`}
            >
              {!tile.isEmpty && (
                <div
                  className="absolute inset-0 bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize,
                    backgroundPosition,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PuzzleBoardPreview({ board }: PuzzleBoardPreviewProps): React.ReactElement {
  const tile = getTileAtPosition(board, 0, 0);

  return (
    <div className="sr-only" aria-hidden="true">
      {tile ? tile.id : 'no tile'}
    </div>
  );
}
