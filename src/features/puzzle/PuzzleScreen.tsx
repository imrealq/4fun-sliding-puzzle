import { useState } from 'react';
import type { ReactElement } from 'react';
import { Button, HeaderControls, Modal } from '@/components';
import { IMAGE_5X3, IMAGE_6X4, IMAGE_7X5 } from '@/constants/images';
import { PuzzleBoard } from './puzzle.board';
import { PuzzleDifficultySelector } from './PuzzleDifficultySelector';
import { usePuzzleGame } from './usePuzzleGame';
import { useInstructions } from './useInstructions';
import { InstructionModal } from './InstructionModal';
import type { PuzzleDifficulty, PuzzleDifficultyOption } from './puzzle.difficulty';

const DIFFICULTY_OPTIONS: readonly PuzzleDifficultyOption[] = [
  { id: 'easy', label: '5 × 3', rows: 5, cols: 3, imageSrc: IMAGE_5X3 },
  { id: 'normal', label: '6 × 4', rows: 6, cols: 4, imageSrc: IMAGE_6X4 },
  { id: 'hard', label: '7 × 5', rows: 7, cols: 5, imageSrc: IMAGE_7X5 },
] as const;

export function PuzzleScreen(): ReactElement {
  const [difficulty, setDifficulty] = useState<PuzzleDifficulty>('normal');
  const selectedOption =
    DIFFICULTY_OPTIONS.find((o) => o.id === difficulty) ?? DIFFICULTY_OPTIONS[1];

  const {
    board,
    elapsedTime,
    handlePlay,
    isWon,
    moveCount,
    moveByTileId,
    showReference,
    toggleReference,
  } = usePuzzleGame(selectedOption.rows, selectedOption.cols);

  const instructions = useInstructions();

  const [showDonate, setShowDonate] = useState(false);

  return (
    <main className="flex h-dvh flex-col bg-slate-950 px-4 pt-4 pb-2 text-slate-100">
      <div className="flex flex-col gap-2">
        <HeaderControls
          elapsedTime={elapsedTime}
          moveCount={moveCount}
          onShuffle={handlePlay}
          onToggleInstructions={instructions.open}
          onToggleReference={toggleReference}
        />
        <PuzzleDifficultySelector
          value={difficulty}
          options={DIFFICULTY_OPTIONS}
          onChange={setDifficulty}
        />
      </div>

      <section className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-2">
        <PuzzleBoard board={board} imageSrc={selectedOption.imageSrc} onTileMove={moveByTileId} />

        {instructions.isOpen && (
          <InstructionModal
            step={instructions.step}
            onClose={instructions.close}
            onNext={instructions.next}
            onPrevious={instructions.previous}
            onGoTo={instructions.goTo}
          />
        )}

        {showReference && (
          <Modal onDismiss={toggleReference}>
            <div className="relative z-10 w-full max-w-[22rem] rounded-3xl border border-slate-700 bg-slate-950 p-3 shadow-2xl shadow-black/40">
              <img
                src={selectedOption.imageSrc}
                alt="Reference image"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </Modal>
        )}

        {isWon && (
          <Modal onDismiss={handlePlay} zIndexClass="z-30">
            <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-950 p-6 text-center shadow-2xl shadow-black/40">
              <h2 className="text-2xl font-semibold text-slate-100">You win</h2>
              <p className="mt-2 text-sm text-slate-300">Completed in {elapsedTime}</p>
              <p className="mt-1 text-sm text-slate-300">Moves: {moveCount}</p>
              <div className="mt-5">
                <Button onClick={handlePlay}>Replay</Button>
              </div>
            </div>
          </Modal>
        )}
      </section>

      <div className="flex justify-center pb-1">
        <button
          type="button"
          onClick={() => setShowDonate(true)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-slate-500 transition hover:text-slate-300"
          aria-label="Donate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-pink-500">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          Donate
        </button>
      </div>

      {showDonate && (
        <Modal onDismiss={() => setShowDonate(false)}>
          <div className="relative z-10 w-full max-w-xs rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-black/40">
            <h2 className="mb-4 text-center text-lg font-semibold text-slate-100">Scan to donate. Thank you!</h2>
            <img
              src="/images/donate-qr.png"
              alt="Donate QR code"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
