import { useRef } from 'react';
import type { PuzzleBoard as PuzzleBoardModel } from './puzzle.types';
import type { PuzzleBoardPreviewProps, PuzzleBoardProps } from './puzzle.board.types';
import { canMoveTile } from './puzzle.logic';
import { getTileAtPosition, getTileSliceStyle, sortTilesByPosition } from './puzzle.utils';

function getSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
): 'up' | 'down' | 'left' | 'right' | null {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) < 24 && Math.abs(deltaY) < 24) {
    return null;
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  }

  return deltaY > 0 ? 'down' : 'up';
}

export function PuzzleBoard({ board, imageSrc, onTileMove }: PuzzleBoardProps): React.ReactElement {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchedTileIdRef = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    const touch = event.touches[0];
    const target = event.target as HTMLElement | null;
    const tileButton = target?.closest('button[data-tile-id]');

    if (!touch) {
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchedTileIdRef.current = tileButton ? Number(tileButton.getAttribute('data-tile-id')) : null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (!touchStartRef.current || !onTileMove || touchedTileIdRef.current === null) {
      return;
    }

    const touch = event.changedTouches[0];

    if (!touch) {
      return;
    }

    const direction = getSwipeDirection(
      touchStartRef.current.x,
      touchStartRef.current.y,
      touch.clientX,
      touch.clientY,
    );

    touchStartRef.current = null;
    const tileId = touchedTileIdRef.current;
    touchedTileIdRef.current = null;

    if (!direction) {
      return;
    }

    const tile = board.tiles.find((candidate) => candidate.id === tileId);

    if (!tile || tile.isEmpty || !canMoveTile(board, tile.id)) {
      return;
    }

    const emptyTile = board.tiles.find((candidate) => candidate.isEmpty);

    if (!emptyTile) {
      return;
    }

    const shouldMoveTile =
      (direction === 'up' && tile.position.row === emptyTile.position.row + 1) ||
      (direction === 'down' && tile.position.row === emptyTile.position.row - 1) ||
      (direction === 'left' && tile.position.column === emptyTile.position.column + 1) ||
      (direction === 'right' && tile.position.column === emptyTile.position.column - 1);

    if (!shouldMoveTile) {
      return;
    }

    onTileMove(tile.id);
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
          const isEmpty = tile.isEmpty;
          const { backgroundSize, backgroundPosition } = getTileSliceStyle(tile, board.size);

          return (
            <button
              key={tile.id}
              type="button"
              data-tile-id={tile.id}
              onClick={() => {
                if (tile.isEmpty || !onTileMove) {
                  return;
                }

                if (canMoveTile(board, tile.id)) {
                  onTileMove(tile.id);
                }
              }}
              className={[
                'relative aspect-square overflow-hidden rounded-xl border transition duration-200',
                isEmpty
                  ? 'border-dashed border-slate-700 bg-slate-950/80'
                  : 'border-slate-700 bg-slate-900 hover:scale-[0.99] active:scale-[0.98]',
              ].join(' ')}
              aria-label={isEmpty ? 'Empty slot' : `Tile ${tile.id + 1}`}
            >
              {!isEmpty ? (
                <div
                  className="absolute inset-0 bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize,
                    backgroundPosition,
                  }}
                />
              ) : null}
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
