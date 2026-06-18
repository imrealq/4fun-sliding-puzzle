import { useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/storage/localStorage';

const ONBOARDING_SEEN_KEY = 'sliding-puzzle:instructions-seen';

export type InstructionStep = 1 | 2 | 3;

export const TOTAL_INSTRUCTION_STEPS = 3;

export function useInstructions() {
  const [step, setStep] = useState<InstructionStep>(1);
  const [isOpen, setIsOpen] = useState(() => getLocalStorageItem(ONBOARDING_SEEN_KEY) !== 'true');

  const open = (): void => setIsOpen(true);

  const close = (): void => {
    setIsOpen(false);
    setStep(1);
    setLocalStorageItem(ONBOARDING_SEEN_KEY, 'true');
  };

  const next = (): void => {
    setStep((current) => (current < TOTAL_INSTRUCTION_STEPS ? ((current + 1) as InstructionStep) : current));
  };

  const previous = (): void => {
    setStep((current) => (current > 1 ? ((current - 1) as InstructionStep) : current));
  };

  const goTo = (target: InstructionStep): void => {
    setStep(target);
  };

  return { isOpen, step, open, close, next, previous, goTo };
}
