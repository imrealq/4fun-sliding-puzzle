import { Button } from '@/components/Button/Button';
import { IconButton } from '@/components/IconButton/IconButton';

type HeaderControlsProps = Readonly<{
  elapsedTime: string;
  moveCount: number;
  onShuffle: () => void;
  onToggleReference: () => void;
}>;

export function HeaderControls({
  elapsedTime,
  moveCount,
  onShuffle,
  onToggleReference,
}: HeaderControlsProps): JSX.Element {
  return (
    <header className="text-center">
      <div className="mb-3 text-sm text-slate-300">
        Time: {elapsedTime} · Moves: {moveCount}
      </div>
      <div className="mx-auto flex w-full max-w-[28rem] items-center justify-between gap-3">
        <div className="w-10" />
        <Button onClick={onShuffle} variant="primary">
          Replay / Shuffle
        </Button>
        <IconButton icon="👁️" onClick={onToggleReference} ariaLabel="Toggle reference image" />
      </div>
    </header>
  );
}
