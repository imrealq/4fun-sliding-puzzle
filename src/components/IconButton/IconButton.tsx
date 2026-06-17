import type { ReactNode } from 'react';

type IconButtonProps = Readonly<{
  icon: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}>;

export function IconButton({ icon, onClick, ariaLabel }: IconButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-slate-700 bg-slate-900 p-3 text-slate-200 transition hover:bg-slate-800"
      aria-label={ariaLabel}
    >
      <span className="text-base">{icon}</span>
    </button>
  );
}
