import type { PuzzleBoard as PuzzleBoardModel } from './puzzle.types';
import type { PuzzleBoardPreviewProps, PuzzleBoardProps } from './puzzle.board.types';
import { getTileAtPosition } from './puzzle.utils';

export function PuzzleBoard({ board, imageSrc }: PuzzleBoardProps): React.ReactElement {
  return (
    <div className="mx-auto w-full max-w-[28rem] rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-black/30">
      <div
        className="grid aspect-square w-full gap-1 overflow-hidden rounded-2xl bg-slate-950 p-1"
        style={{ gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
      >
        {board.tiles.map((tile) => {
          const isEmpty = tile.isEmpty;
          const backgroundSize = `${board.size * 100}% ${board.size * 100}%`;
          const backgroundPosition = `${(tile.correctPosition.column / Math.max(board.size - 1, 1)) * 100}% ${(tile.correctPosition.row / Math.max(board.size - 1, 1)) * 100}%`;

          return (
            <button
              key={tile.id}
              type="button"
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
                  className="absolute inset-0 bg-cover bg-center"
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
