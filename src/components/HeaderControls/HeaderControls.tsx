import type { ReactElement } from 'react';
import { Button } from '@/components/Button/Button';
import { IconButton } from '@/components/IconButton/IconButton';

type HeaderControlsProps = Readonly<{
  elapsedTime: string;
  moveCount: number;
  onShuffle: () => void;
  onToggleInstructions: () => void;
  onToggleReference: () => void;
}>;

export function HeaderControls({
  elapsedTime,
  moveCount,
  onShuffle,
  onToggleInstructions,
  onToggleReference,
}: HeaderControlsProps): ReactElement {
  return (
    <header className="text-center">
      <div className="mb-3 text-sm text-slate-300">
        Time: {elapsedTime} · Moves: {moveCount}
      </div>
      <div className="mx-auto flex w-full max-w-[28rem] items-center justify-between gap-3">
        <IconButton icon="❔" onClick={onToggleInstructions} ariaLabel="Show instructions" />
        <Button onClick={onShuffle} variant="primary">
          Replay / Shuffle
        </Button>
        <IconButton icon="👁️" onClick={onToggleReference} ariaLabel="Toggle reference image" />
      </div>
    </header>
  );
}
