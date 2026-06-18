import { Button, Modal } from '@/components';
import { IMAGE_5X3 } from '@/constants/images';
import type { InstructionStep } from './useInstructions';
import { TOTAL_INSTRUCTION_STEPS } from './useInstructions';

type InstructionModalProps = Readonly<{
  step: InstructionStep;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoTo: (step: InstructionStep) => void;
}>;

function StepBadge({ number }: { number: number }): JSX.Element {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 text-sm font-semibold text-sky-200">
      {number}
    </div>
  );
}

function StepDots({
  current,
  total,
  onGoTo,
}: {
  current: InstructionStep;
  total: number;
  onGoTo: (step: InstructionStep) => void;
}): JSX.Element {
  return (
    <div className="flex justify-center gap-2" aria-label="Instruction progress">
      {Array.from({ length: total }, (_, i) => (i + 1) as InstructionStep).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onGoTo(s)}
          className={`h-2.5 w-2.5 rounded-full transition ${s === current ? 'bg-sky-400' : 'bg-slate-700 hover:bg-slate-500'}`}
          aria-label={`Go to step ${s}`}
        />
      ))}
    </div>
  );
}

function FingerSwipeIllustration(): JSX.Element {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
          <span className="text-5xl" role="img" aria-label="Finger swipe gesture">
            ☝️
          </span>
        </div>
        <div className="flex flex-col text-slate-300">
          <div className="text-sm font-medium text-slate-100">Swipe smoothly</div>
          <div className="text-sm">Use one finger on mobile.</div>
        </div>
      </div>
    </div>
  );
}

function ArrowKeyIllustration(): JSX.Element {
  const arrowKeys = [
    { label: '↑', pos: '1/2', highlight: false },
    { label: '←', pos: '2/1', highlight: false },
    { label: '⬤', pos: '2/2', highlight: true },
    { label: '→', pos: '2/3', highlight: false },
    { label: '↓', pos: '3/2', highlight: false },
  ];

  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <div className="grid grid-cols-3 gap-1 text-slate-300">
        {[null, '↑', null, '←', '⬤', '→', null, '↓', null].map((key, i) => {
          const isHighlight = key === '⬤';
          return key ? (
            <div
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold ${
                isHighlight
                  ? 'border-sky-400 bg-sky-500/15 text-sky-200'
                  : 'border-slate-600 bg-slate-950 text-slate-100'
              }`}
            >
              {key}
            </div>
          ) : (
            <div key={i} />
          );
        })}
      </div>
    </div>
  );
}

function ReferenceIconIllustration(): JSX.Element {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
      <div className="flex items-center gap-3 text-slate-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-2xl">
          👁️
        </div>
        <div className="text-left text-sm text-slate-300">
          Tap this icon to view the reference image and solved result.
        </div>
      </div>
    </div>
  );
}

function SolvedPreview(): JSX.Element {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 p-2">
      <div className="flex items-center justify-center">
        <img
          src={IMAGE_5X3}
          alt="Solved puzzle example"
          className="max-h-[14rem] w-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}

const STEPS: Record<
  InstructionStep,
  { title: string; content: () => JSX.Element }
> = {
  1: {
    title: 'Goal of the game',
    content: () => (
      <>
        <p className="mt-3 text-slate-300">
          Put the tiles back in the correct order to complete the image.
        </p>
        <div className="mt-3">
          <SolvedPreview />
        </div>
      </>
    ),
  },
  2: {
    title: 'Move tiles on mobile or desktop',
    content: () => (
      <div className="mt-3 space-y-4">
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Mobile
          </div>
          <FingerSwipeIllustration />
          <p className="mt-2 text-slate-300">
            Use your index finger to swipe up, down, left, or right.
          </p>
        </div>
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Desktop
          </div>
          <ArrowKeyIllustration />
          <p className="mt-2 text-slate-300">
            Use the arrow keys on your keyboard to move the empty space.
          </p>
        </div>
      </div>
    ),
  },
  3: {
    title: 'View the image guide',
    content: () => (
      <div className="mt-3">
        <ReferenceIconIllustration />
      </div>
    ),
  },
};

export function InstructionModal({
  step,
  onClose,
  onNext,
  onPrevious,
  onGoTo,
}: InstructionModalProps): JSX.Element {
  const isLastStep = step === TOTAL_INSTRUCTION_STEPS;
  const { title, content: StepContent } = STEPS[step];

  return (
    <Modal onDismiss={onClose} zIndexClass="z-30">
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-5 text-left shadow-2xl shadow-black/40">
        <h2 className="text-2xl font-semibold text-slate-100">How to play</h2>
        <p className="mt-2 text-sm text-slate-300">
          Restore the picture by moving tiles into the empty space.
        </p>

        <div className="mt-5 space-y-4 text-sm text-slate-200">
          <div className="flex items-center justify-center gap-3">
            <Button onClick={onPrevious} variant="secondary" ariaLabel="Previous step">
              ←
            </Button>
            <StepDots current={step} total={TOTAL_INSTRUCTION_STEPS} onGoTo={onGoTo} />
            <Button
              onClick={isLastStep ? onClose : onNext}
              variant="secondary"
              ariaLabel={isLastStep ? 'Start playing' : 'Next step'}
            >
              →
            </Button>
          </div>

          <section className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
            <div className="flex items-center gap-3">
              <StepBadge number={step} />
              <h3 className="font-semibold text-slate-100">{title}</h3>
            </div>
            <StepContent />
          </section>
        </div>

        <div className="mt-5 flex gap-3">
          {isLastStep ? (
            <Button onClick={onClose} variant="primary">
              Start playing
            </Button>
          ) : (
            <Button onClick={onNext} variant="primary">
              Next
            </Button>
          )}
          <Button onClick={onClose} variant="secondary">
            Skip
          </Button>
        </div>
      </div>
    </Modal>
  );
}
