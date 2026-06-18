import type { ReactElement } from 'react';
import type { PuzzleDifficulty, PuzzleDifficultyOption } from './puzzle.difficulty';

type PuzzleDifficultySelectorProps = Readonly<{
  value: PuzzleDifficulty;
  options: readonly PuzzleDifficultyOption[];
  onChange: (difficulty: PuzzleDifficulty) => void;
}>;

export function PuzzleDifficultySelector({
  value,
  options,
  onChange,
}: PuzzleDifficultySelectorProps): ReactElement {
  return (
    <div className="mx-auto flex flex-wrap justify-center gap-2">
      {options.map((option) => {
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              isActive
                ? 'bg-sky-500 text-slate-950'
                : 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
