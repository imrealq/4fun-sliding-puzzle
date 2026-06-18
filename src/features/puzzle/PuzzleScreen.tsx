import { useState } from 'react';
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

export function PuzzleScreen(): JSX.Element {
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

      <section className="flex min-h-0 flex-1 items-center justify-center py-2">
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
    </main>
  );
}
