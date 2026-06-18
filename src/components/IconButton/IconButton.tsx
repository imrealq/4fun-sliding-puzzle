import type { ReactElement, ReactNode } from 'react';

type IconButtonProps = Readonly<{
  icon: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}>;

export function IconButton({ icon, onClick, ariaLabel }: IconButtonProps): ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
      aria-label={ariaLabel}
    >
      <span className="text-base">{icon}</span>
    </button>
  );
}
