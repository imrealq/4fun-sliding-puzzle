import { DEFAULT_IMAGE } from '@/constants/images';
import { HeaderControls, Modal } from '@/components';
import { PuzzleBoard } from './puzzle.board';
import { usePuzzleGame } from './usePuzzleGame';

export function PuzzleScreen(): JSX.Element {
  const { board, elapsedTime, handlePlay, isWon, showReference, toggleReference } =
    usePuzzleGame(4);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <section className="w-full max-w-5xl space-y-6">
        <HeaderControls
          elapsedTime={elapsedTime}
          onShuffle={handlePlay}
          onToggleReference={toggleReference}
        />

        <div className="flex justify-center">
          <PuzzleBoard board={board} imageSrc={DEFAULT_IMAGE} />
        </div>

        {showReference ? (
          <Modal onDismiss={toggleReference}>
            <div className="relative z-10 w-full max-w-[22rem] rounded-2xl border border-slate-700 bg-slate-950 p-3 shadow-2xl shadow-black/40">
              <img
                src={DEFAULT_IMAGE}
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
