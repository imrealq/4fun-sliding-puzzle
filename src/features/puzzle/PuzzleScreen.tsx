import { useMemo, useState } from 'react';
import { HeaderControls, Modal } from '@/components';
import { IMAGE_3X3, IMAGE_4X4, IMAGE_5X5 } from '@/constants/images';
import { PuzzleBoard } from './puzzle.board';
import { PuzzleDifficultySelector } from './PuzzleDifficultySelector';
import { usePuzzleGame } from './usePuzzleGame';
import type { PuzzleDifficulty, PuzzleDifficultyOption } from './puzzle.difficulty';

const DIFFICULTY_OPTIONS: readonly PuzzleDifficultyOption[] = [
  { id: 'easy', label: '3 × 3', boardSize: 3, imageSrc: IMAGE_3X3 },
  { id: 'normal', label: '4 × 4', boardSize: 4, imageSrc: IMAGE_4X4 },
  { id: 'hard', label: '5 × 5', boardSize: 5, imageSrc: IMAGE_5X5 },
] as const;

export function PuzzleScreen(): JSX.Element {
  const [difficulty, setDifficulty] = useState<PuzzleDifficulty>('hard');
  const selectedOption = useMemo(
    () => DIFFICULTY_OPTIONS.find((option) => option.id === difficulty) ?? DIFFICULTY_OPTIONS[2],
    [difficulty],
  );
  const { board, elapsedTime, handlePlay, isWon, moveCount, showReference, toggleReference } =
    usePuzzleGame(selectedOption.boardSize);

  const handleDifficultyChange = (nextDifficulty: PuzzleDifficulty): void => {
    setDifficulty(nextDifficulty);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <section className="w-full max-w-5xl space-y-6">
        <HeaderControls
          elapsedTime={elapsedTime}
          moveCount={moveCount}
          onShuffle={handlePlay}
          onToggleReference={toggleReference}
        />

        <PuzzleDifficultySelector
          value={difficulty}
          options={DIFFICULTY_OPTIONS}
          onChange={handleDifficultyChange}
        />

        <div className="flex justify-center">
          <PuzzleBoard board={board} imageSrc={selectedOption.imageSrc} />
        </div>

        {showReference ? (
          <Modal onDismiss={toggleReference}>
            <div className="relative z-10 w-full max-w-[22rem] rounded-2xl border border-slate-700 bg-slate-950 p-3 shadow-2xl shadow-black/40">
              <img
                src={selectedOption.imageSrc}
                alt="Default puzzle source"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </Modal>
        ) : null}

        {isWon ? (
          <Modal onDismiss={handlePlay} zIndexClass="z-30">
            <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-950 p-6 text-center shadow-2xl shadow-black/40">
              <h2 className="text-2xl font-semibold text-slate-100">You win</h2>
              <p className="mt-2 text-sm text-slate-300">Completed in {elapsedTime}</p>
              <p className="mt-1 text-sm text-slate-300">Moves: {moveCount}</p>
              <button
                type="button"
                onClick={handlePlay}
                className="mt-5 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Replay
              </button>
            </div>
          </Modal>
        ) : null}
      </section>
    </main>
  );
}
